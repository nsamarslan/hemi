#!/usr/bin/env python3
"""Gateway PC audio server — serves your own Hemi-Sync recordings to the Gateway app over the
local network, so the app can play the real tracks instead of synthesising the binaural bed.
Nothing is copied into the app; the audio streams straight from this PC over Wi-Fi.

Usage:
    python3 tools/pc-server.py --audio "/path/to/Hemi-Sync" [--app ../www] [--port 8700]

Then, on your phone (same Wi-Fi), open http://<this-pc-ip>:8700/ — the app itself is served from
--app (default: ../www next to this script, i.e. gateway/www) and the audio plays from /play/... .
The app can also run from anywhere else: Settings → Audio source → "Play from the PC", then enter
this address. (If the app page is on https, browsers block plain-http fetches — open the app from
the PC address instead.)

Endpoints:
    GET /ping                  -> {"ok": true, "tracks": N, "app": true/false, "audioRoot": ..., "features": [...]}
    GET /index.json            -> {"files": [{"path": "Wave I Discovery/01 Orientation.flac", ...}]}
    GET /rescan                -> re-scan the audio folder, returns the new track count
    GET /play/<path>?mode=raw  -> serve the file (Range requests supported — iOS-safe)
        ?mode=wav              -> transcode to WAV first (FLAC needs ffmpeg, or `pip install soundfile`)
    GET /                      -> the app itself (when --app is available), else a small info page

Small state kept on this PC (under --data, default ~/.gateway-pc) so every phone/tablet sees the same:
    GET  /matches.json         -> {"matches": {"w1-intro-10": "Wave I Discovery/02 ....flac", ...}}
    POST /matches              <- {"id": "w1-intro-10", "path": "..."}  (path null removes the override)
                               <- {"matches": {...}}  replaces the whole map
    GET  /positions.json       -> {"positions": {"<file path>": {"pos": sec, "dur": sec, "at": ms}}}
    POST /positions            <- {"path": "...", "pos": sec, "dur": sec}  (pos 0 or "done": true clears)
    GET  /backups.json         -> {"backups": [{"device": ..., "at": ..., "size": ...}]}
    GET  /backup[?device=...]  -> the newest (or that device's) app backup: {"device", "at", "backup": {...}}
    POST /backup               <- {"device": "phone", "backup": {app backup JSON}}

Only .flac/.wav/.mp3/.ogg/.m4a/.aac/.opus files under --audio are served; every other path is
refused. Standard library only. Transcoded WAVs are cached in the system temp dir. There is no
authentication: run it only on a network you trust (your home Wi-Fi) — backups contain your journal.
"""
import argparse
import hashlib
import json
import mimetypes
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse, parse_qs

VERSION = "0.3"
FEATURES = ["matches", "positions", "backup"]
MAX_BODY = 64 * 1024 * 1024          # a backup with a long journal is a few MB at most
MAX_POSITIONS = 1000
AUDIO_EXTS = {".flac", ".wav", ".mp3", ".ogg", ".m4a", ".aac", ".opus"}
CONTENT_TYPES = {
    ".flac": "audio/flac", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".ogg": "audio/ogg",
    ".m4a": "audio/mp4", ".aac": "audio/aac", ".opus": "audio/ogg",
}
STATIC_TYPES = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml",
    ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2",
}

_scan_lock = threading.Lock()
_scan = {"files": [], "count": 0}


def scan_audio(root):
    files = []
    for dirpath, _dirnames, filenames in os.walk(root):
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            if ext not in AUDIO_EXTS:
                continue
            full = os.path.join(dirpath, name)
            try:
                rel = os.path.relpath(full, root).replace(os.sep, "/")
                files.append({"path": rel, "size": os.path.getsize(full)})
            except OSError:
                continue
    files.sort(key=lambda f: f["path"].lower())
    return files


def rescan(root):
    with _scan_lock:
        _scan["files"] = scan_audio(root)
        _scan["count"] = len(_scan["files"])
        return _scan["count"]


def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))  # no packets sent; just picks the outbound interface
        return s.getsockname()[0]
    except Exception:
        try:
            return socket.gethostbyname(socket.gethostname())
        except Exception:
            return "127.0.0.1"
    finally:
        s.close()


def transcode_to_wav(src):
    """FLAC (or anything else) -> 44.1 kHz 16-bit stereo WAV, cached in the temp dir."""
    st = os.stat(src)
    key = hashlib.sha1(os.path.abspath(src).encode()).hexdigest()[:16]
    cache_dir = os.path.join(tempfile.gettempdir(), "gateway-pc-cache")
    cache = os.path.join(cache_dir, f"{key}.{int(st.st_mtime)}.{st.st_size}.wav")
    if os.path.exists(cache):
        return cache
    os.makedirs(cache_dir, exist_ok=True)
    tmp = f"{cache}.{os.getpid()}.{threading.get_ident()}.part"
    try:
        ffmpeg = shutil.which("ffmpeg")
        if ffmpeg:
            r = subprocess.run(
                [ffmpeg, "-nostdin", "-loglevel", "error", "-y", "-i", src,
                 "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2", tmp],
                capture_output=True)
            if r.returncode == 0 and os.path.exists(tmp) and os.path.getsize(tmp) > 44:
                os.replace(tmp, cache)
                return cache
        import soundfile as sf  # pip install soundfile (bundles libsndfile)
        data, sr = sf.read(src, dtype="int16", always_2d=True)
        sf.write(tmp, data, sr, format="WAV", subtype="PCM_16")
        os.replace(tmp, cache)
        return cache
    except Exception as e:
        try:
            if os.path.exists(tmp):
                os.remove(tmp)
        except OSError:
            pass
        raise RuntimeError(
            f"transcode failed for {os.path.basename(src)}: {e} "
            "(install ffmpeg, or: pip install soundfile)")


class BodyError(Exception):
    def __init__(self, code, msg):
        super().__init__(msg)
        self.code = code


def now_ms():
    import time
    return int(time.time() * 1000)


def valid_session_id(sid):
    return isinstance(sid, str) and 0 < len(sid) <= 120 and re.match(r"^[\w.:-]+$", sid) is not None


def device_slug(name):
    slug = re.sub(r"[^A-Za-z0-9._-]+", "-", str(name or "")).strip("-.")[:40]
    return slug or "device"


class State:
    """Tiny JSON files under --data: manual session→file matches, resume positions, app backups.
    Writes are atomic (tmp + replace) and serialised with a lock; reads tolerate a missing/broken file."""

    def __init__(self, root):
        self.root = root
        self.lock = threading.Lock()

    def _path(self, *parts):
        return os.path.join(self.root, *parts)

    def _read(self, name, default):
        try:
            with open(self._path(name), encoding="utf-8") as f:
                data = json.load(f)
            return data if isinstance(data, type(default)) else default
        except (OSError, ValueError):
            return default

    def _write(self, name, obj):
        full = self._path(name)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        tmp = f"{full}.{os.getpid()}.tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(obj, f, ensure_ascii=False, indent=1)
        os.replace(tmp, full)

    # --- manual matches: session id -> relative audio path ---
    def matches(self):
        return self._read("matches.json", {})

    def set_match(self, sid, path):
        with self.lock:
            m = self.matches()
            if path:
                m[sid] = path
            else:
                m.pop(sid, None)
            self._write("matches.json", m)
            return m

    def replace_matches(self, m):
        with self.lock:
            self._write("matches.json", m)
            return m

    # --- resume positions: file path -> {pos, dur, at} ---
    def positions(self):
        return self._read("positions.json", {})

    def set_position(self, path, pos, dur, done=False):
        with self.lock:
            p = self.positions()
            if done or pos <= 0:
                p.pop(path, None)
            else:
                p[path] = {"pos": round(float(pos), 1), "dur": round(float(dur or 0), 1), "at": now_ms()}
            if len(p) > MAX_POSITIONS:                       # keep the newest
                keep = sorted(p.items(), key=lambda kv: kv[1].get("at", 0), reverse=True)[:MAX_POSITIONS]
                p = dict(keep)
            self._write("positions.json", p)
            return len(p)

    # --- app backups: one file per device ---
    def backups(self):
        out = []
        d = self._path("backups")
        try:
            names = os.listdir(d)
        except OSError:
            return out
        for n in sorted(names):
            if not n.endswith(".json"):
                continue
            try:
                full = os.path.join(d, n)
                with open(full, encoding="utf-8") as f:
                    rec = json.load(f)
                b = rec.get("backup") or {}
                out.append({"device": rec.get("device") or n[:-5], "at": rec.get("at"), "ts": rec.get("ts", 0),
                            "size": os.path.getsize(full), "journal": len(b.get("journal") or []),
                            "log": len(b.get("log") or []), "format": b.get("format")})
            except (OSError, ValueError, AttributeError):
                continue
        out.sort(key=lambda r: r.get("ts") or 0, reverse=True)
        return out

    def put_backup(self, device, backup):
        import datetime
        slug = device_slug(device)
        rec = {"device": str(device or slug)[:60], "slug": slug, "ts": now_ms(),
               "at": datetime.datetime.now().astimezone().isoformat(timespec="seconds"), "backup": backup}
        with self.lock:
            self._write(os.path.join("backups", slug + ".json"), rec)
        full = self._path("backups", slug + ".json")
        return {"device": rec["device"], "at": rec["at"], "ts": rec["ts"], "size": os.path.getsize(full)}

    def get_backup(self, device=None):
        if device:
            rec = self._read(os.path.join("backups", device_slug(device) + ".json"), {})
            return rec if rec.get("backup") else None
        lst = self.backups()
        if not lst:
            return None
        rec = self._read(os.path.join("backups", device_slug(lst[0]["device"]) + ".json"), {})
        return rec if rec.get("backup") else None


def parse_range(header, size):
    """Parse 'Range: bytes=a-b' -> (start, end) inclusive, 'invalid', or None."""
    m = re.match(r"^bytes=(\d*)-(\d*)$", (header or "").strip())
    if not m or (m.group(1) == "" and m.group(2) == ""):
        return None
    a, b = m.group(1), m.group(2)
    if a == "":
        n = int(b)
        if n <= 0:
            return "invalid"
        return (max(0, size - n), size - 1)
    start = int(a)
    end = int(b) if b else size - 1
    if start >= size or end < start:
        return "invalid"
    return (start, min(end, size - 1))


class Handler(BaseHTTPRequestHandler):
    server_version = f"GatewayPC/{VERSION}"
    protocol_version = "HTTP/1.1"

    # ---------- helpers ----------
    def log_message(self, fmt, *args):
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), fmt % args))

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Range, Content-Type")

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _text(self, text, code=200, ctype="text/plain; charset=utf-8"):
        body = text.encode()
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _error(self, code, msg):
        self._text(msg + "\n", code=code)

    def _send_file(self, path, ctype, transcode=False):
        try:
            if transcode:
                path = transcode_to_wav(path)
                ctype = "audio/wav"
            size = os.path.getsize(path)
            rng = parse_range(self.headers.get("Range"), size)
            if rng == "invalid":
                self.send_response(416)
                self._cors()
                self.send_header("Content-Range", f"bytes */{size}")
                self.send_header("Content-Length", "0")
                self.end_headers()
                return
            start, end = rng if rng else (0, size - 1)
            length = end - start + 1
            self.send_response(206 if rng else 200)
            self._cors()
            self.send_header("Content-Type", ctype)
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", str(length))
            if rng:
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.end_headers()
            if self.command == "HEAD":
                return
            with open(path, "rb") as f:
                f.seek(start)
                remaining = length
                while remaining > 0:
                    chunk = f.read(min(1 << 16, remaining))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    remaining -= len(chunk)
        except RuntimeError as e:
            self._error(500, str(e))
        except OSError:
            self._error(404, "not found")

    def _safe_audio_path(self, rel, quoted=True):
        root = os.path.realpath(self.server.audio_root)
        if not isinstance(rel, str):
            return None
        if quoted:
            rel = unquote(rel)
        if rel.startswith("/") or ".." in rel.split("/") or re.match(r"^[A-Za-z]:", rel):
            return None
        full = os.path.realpath(os.path.join(root, rel))
        if full != root and not full.startswith(root + os.sep):
            return None
        if os.path.splitext(full)[1].lower() not in AUDIO_EXTS:
            return None
        if not os.path.isfile(full):
            return None
        return full

    def _serve_app(self, rel):
        www = self.server.app_root
        if not www:
            self._text(INFO_PAGE % {"ip": lan_ip(), "port": self.server.server_address[1]}, ctype="text/html; charset=utf-8")
            return
        if rel in ("", "/"):
            rel = "/index.html"
        rel = rel.lstrip("/")
        if ".." in rel.split("/"):
            self._error(403, "forbidden")
            return
        full = os.path.realpath(os.path.join(www, rel))
        if not (full == www or full.startswith(www + os.sep)) or not os.path.isfile(full):
            # SPA-ish fallback: unknown paths get the app shell
            full = os.path.join(www, "index.html")
            if not os.path.isfile(full):
                self._error(404, "not found")
                return
        ext = os.path.splitext(full)[1].lower()
        ctype = STATIC_TYPES.get(ext) or mimetypes.guess_type(full)[0] or "application/octet-stream"
        self._send_file(full, ctype)

    # ---------- routes ----------
    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        try:
            self._route()
        except BrokenPipeError:
            pass
        except Exception as e:  # never let one request kill the server
            try:
                self._error(500, f"server error: {e}")
            except Exception:
                pass

    def do_POST(self):
        try:
            self._route_post()
        except BodyError as e:
            self.close_connection = True
            try:
                self._json({"ok": False, "error": str(e)}, code=e.code)
            except Exception:
                pass
        except BrokenPipeError:
            pass
        except Exception as e:
            try:
                self._error(500, f"server error: {e}")
            except Exception:
                pass

    def _read_json(self):
        try:
            n = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            raise BodyError(411, "bad Content-Length")
        if n < 0:
            raise BodyError(411, "bad Content-Length")
        if n > MAX_BODY:
            raise BodyError(413, "body too large")
        raw = self.rfile.read(n) if n else b""
        try:
            data = json.loads(raw.decode("utf-8") or "null")
        except (ValueError, UnicodeDecodeError):
            raise BodyError(400, "invalid JSON")
        if not isinstance(data, dict):
            raise BodyError(400, "JSON object expected")
        return data

    def _route_post(self):
        path = urlparse(self.path).path
        st = self.server.state
        if path == "/matches":
            body = self._read_json()
            if isinstance(body.get("matches"), dict):             # whole-map replace (sync from a device)
                clean, skipped = {}, []
                for sid, rel in body["matches"].items():
                    if valid_session_id(sid) and self._safe_audio_path(rel, quoted=False):
                        clean[sid] = rel
                    else:
                        skipped.append(sid)
                return self._json({"ok": True, "matches": st.replace_matches(clean), "skipped": skipped})
            sid, rel = body.get("id"), body.get("path")
            if not valid_session_id(sid):
                raise BodyError(400, "bad session id")
            if rel:
                if not self._safe_audio_path(rel, quoted=False):
                    rescan(self.server.audio_root)
                if not self._safe_audio_path(rel, quoted=False):
                    raise BodyError(404, "no such audio file")
            return self._json({"ok": True, "matches": st.set_match(sid, rel or None)})
        if path == "/positions":
            body = self._read_json()
            rel = body.get("path")
            if not isinstance(rel, str) or not rel or len(rel) > 1000:
                raise BodyError(400, "bad path")
            try:
                pos = float(body.get("pos") or 0)
                dur = float(body.get("dur") or 0)
            except (TypeError, ValueError):
                raise BodyError(400, "bad position")
            n = st.set_position(rel, pos, dur, done=bool(body.get("done")))
            return self._json({"ok": True, "count": n})
        if path == "/backup":
            body = self._read_json()
            backup = body.get("backup")
            if not isinstance(backup, dict) or not isinstance(backup.get("format"), str):
                raise BodyError(400, "not an app backup")
            info = st.put_backup(body.get("device") or "device", backup)
            info.update({"ok": True, "backups": st.backups()})
            return self._json(info)
        return self._error(404, "no such endpoint")

    def _route(self):
        u = urlparse(self.path)
        path = u.path
        q = parse_qs(u.query)
        st = self.server.state
        if path == "/ping":
            return self._json({"ok": True, "version": VERSION, "tracks": _scan["count"],
                               "app": bool(self.server.app_root),
                               "audioRoot": os.path.abspath(self.server.audio_root),
                               "features": FEATURES, "matches": len(st.matches()),
                               "backups": len(st.backups()), "data": st.root})
        if path == "/matches.json":
            return self._json({"matches": st.matches()})
        if path == "/positions.json":
            return self._json({"positions": st.positions()})
        if path == "/backups.json":
            return self._json({"backups": st.backups()})
        if path in ("/backup", "/backup.json"):
            rec = st.get_backup(q.get("device", [None])[0])
            if not rec:
                return self._json({"ok": False, "error": "no backup yet"}, code=404)
            return self._json({"ok": True, "device": rec.get("device"), "at": rec.get("at"), "ts": rec.get("ts"), "backup": rec["backup"]})
        if path == "/index.json":
            return self._json({"files": _scan["files"], "count": _scan["count"],
                               "audioRoot": os.path.abspath(self.server.audio_root)})
        if path == "/rescan":
            return self._json({"count": rescan(self.server.audio_root)})
        if path.startswith("/play/"):
            rel = path[len("/play/"):]
            full = self._safe_audio_path(rel)
            if not full:
                # maybe the file appeared after the last scan: rescan once and retry
                rescan(self.server.audio_root)
                full = self._safe_audio_path(rel)
            if not full:
                return self._error(404, "no such audio file")
            ext = os.path.splitext(full)[1].lower()
            transcode = q.get("mode", ["raw"])[0] == "wav" and ext != ".wav"
            return self._send_file(full, CONTENT_TYPES.get(ext, "application/octet-stream"), transcode)
        if self.server.app_root or path in ("/", "/index.html"):
            return self._serve_app(path)
        return self._serve_app(path)


INFO_PAGE = """<!doctype html><meta charset="utf-8"><title>Gateway PC audio server</title>
<body style="font:16px/1.6 system-ui;max-width:40rem;margin:3rem auto;padding:0 1rem">
<h1>Gateway PC audio server</h1>
<p>This PC serves your Hemi-Sync recordings to the Gateway app over the local network.</p>
<ul>
<li><a href="/ping">/ping</a> — server status</li>
<li><a href="/index.json">/index.json</a> — track index</li>
<li><code>/play/&lt;file&gt;?mode=raw|wav</code> — play a track</li>
<li><a href="/matches.json">/matches.json</a>, <a href="/positions.json">/positions.json</a>, <a href="/backups.json">/backups.json</a> — state shared between your devices (manual matches, resume positions, app backups)</li>
</ul>
<p>Open the app itself from <code>--app</code> (default: <code>gateway/www</code>) — e.g.
<code>http://%(ip)s:%(port)s/</code> on your phone.</p>
</body>"""


def main():
    ap = argparse.ArgumentParser(description="Gateway PC audio server (local network)")
    ap.add_argument("--audio", required=True, help="folder with your Hemi-Sync FLAC/WAV/MP3 files")
    ap.add_argument("--app", default=None, help="serve the app from this folder (default: ../www next to this script, if it exists)")
    ap.add_argument("--host", default="0.0.0.0")
    ap.add_argument("--port", type=int, default=8700)
    ap.add_argument("--data", default=None, help="folder for shared state: manual matches, resume positions, app backups (default: ~/.gateway-pc)")
    args = ap.parse_args()

    audio_root = os.path.realpath(os.path.expanduser(args.audio))
    if not os.path.isdir(audio_root):
        sys.exit(f"audio folder not found: {audio_root}")

    app_root = None
    if args.app is None:
        cand = os.path.realpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "www"))
        if os.path.isfile(os.path.join(cand, "index.html")):
            app_root = cand
    elif args.app.lower() in ("none", "off", "no"):
        app_root = None
    else:
        app_root = os.path.realpath(os.path.expanduser(args.app))
        if not os.path.isfile(os.path.join(app_root, "index.html")):
            sys.exit(f"app folder has no index.html: {app_root}")

    data_root = os.path.realpath(os.path.expanduser(args.data or os.path.join("~", ".gateway-pc")))
    try:
        os.makedirs(data_root, exist_ok=True)
    except OSError as e:
        sys.exit(f"cannot create data folder {data_root}: {e}")

    count = rescan(audio_root)
    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    httpd.audio_root = audio_root
    httpd.app_root = app_root
    httpd.state = State(data_root)
    port = httpd.server_address[1]
    ip = lan_ip()

    print("=" * 64)
    print(f"Gateway PC audio server v{VERSION}")
    print(f"  app:    http://{ip}:{port}/            (the Gateway app)" if app_root else "  app:    (not served — pass --app)")
    print(f"  audio:  {audio_root}  ({count} tracks)")
    print(f"  play:   http://{ip}:{port}/play/<file>?mode=raw|wav")
    print(f"  data:   {data_root}  (matches: {len(httpd.state.matches())}, backups: {len(httpd.state.backups())})")
    print("=" * 64)
    print(f"On your phone (same Wi-Fi), open:  http://{ip}:{port}/")
    print("Or keep using the app elsewhere: Settings → Audio source → Play from the PC,")
    print(f"and enter:  http://{ip}:{port}")
    print("Ctrl+C to stop.")
    print(f"READY port={port}")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nbye.")


if __name__ == "__main__":
    main()
