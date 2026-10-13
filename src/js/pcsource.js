// PC audio source: streams the user's own Hemi-Sync recordings from a small server on the
// local network (tools/pc-server.py) instead of synthesising the binaural bed in the browser.
// Nothing is downloaded into the app — the audio plays straight from the PC over Wi-Fi.
//
// Besides the track index the server (v0.3+) keeps a little shared state so every phone/tablet
// on the Wi-Fi sees the same thing: manual session→file matches, resume positions and app
// backups. Each of those has a local mirror in this device's storage, so an older server (or a
// temporarily unreachable one) degrades gracefully instead of failing.
import { settings, store } from "./store.js";
import { tracks } from "./content.js";
import { findTrack, findAlbum, scoreFile } from "./trackmatch.js";

let indexCache = null, indexAt = 0;
const INDEX_TTL = 60_000;
const DAY = 86_400_000;

export const pcConfigured = () => settings.audioSource === "pc" && !!settings.pcUrl;
const base = () => String(settings.pcUrl || "").replace(/\/+$/, "");

/** fetch with a timeout that also works where AbortSignal.timeout is missing. */
function fetchTimeout(url, ms, init = {}) {
  const ctl = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), ms) : null;
  return fetch(url, ctl ? { ...init, signal: ctl.signal } : init).finally(() => ctl && clearTimeout(timer));
}
const postJson = (path, body, ms = 6000) => fetchTimeout(base() + path, ms, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

/** Server heartbeat: { ok, tracks, app, audioRoot, features? }. Throws when unreachable. */
export async function pcPing() {
  const r = await fetchTimeout(base() + "/ping", 4000);
  if (!r.ok) throw new Error("ping " + r.status);
  return r.json();
}

/** Track index from the PC: { files: [{ path, size }] }. Cached for INDEX_TTL. */
export async function pcIndex(force = false) {
  if (!force && indexCache && Date.now() - indexAt < INDEX_TTL) return indexCache;
  const r = await fetchTimeout(base() + "/index.json", 8000);
  if (!r.ok) throw new Error("index " + r.status);
  indexCache = await r.json();
  indexAt = Date.now();
  return indexCache;
}
/** Ask the PC to re-read its audio folder, then refresh the index. Returns the new file count. */
export async function pcRescan() {
  try { await fetchTimeout(base() + "/rescan", 30000); } catch {}
  const idx = await pcIndex(true);
  return (idx.files || []).length;
}

/** Can this browser decode FLAC natively? (Chrome/Edge/Firefox yes; older Safari no.) */
export function canPlayFlac() {
  const a = document.createElement("audio");
  return ["probably", "maybe"].includes(a.canPlayType("audio/flac")) ||
         ["probably", "maybe"].includes(a.canPlayType("audio/x-flac"));
}

/** Play URL for a served file. FLAC is served raw when the browser can decode it,
 *  otherwise the server transcodes it to WAV on the fly. */
export function playUrlFor(path) {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  const mode = ext === ".flac" && !canPlayFlac() ? "wav" : "raw";
  const enc = path.split("/").map(encodeURIComponent).join("/");
  return `${base()}/play/${enc}?mode=${mode}`;
}
const baseName = path => String(path).split("/").pop();
const niceName = path => baseName(path).replace(/\.[a-z0-9]+$/i, "");
export const trackOf = path => ({ path, url: playUrlFor(path), title: niceName(path) });

// ---------- manual matches (session id → file path) ----------
// The server map is the truth when the server has the endpoint; the local mirror (`pcMatches`)
// covers older servers and offline moments. A match set here always wins over fuzzy matching.
let matchCache = null, matchAt = 0, matchShared = null;   // matchShared: did the server answer last time?
export async function pcMatches(force = false) {
  if (!force && matchCache && Date.now() - matchAt < INDEX_TTL) return matchCache;
  let map = store.get("pcMatches", {});
  matchShared = false;
  try {
    const r = await fetchTimeout(base() + "/matches.json", 4000);
    if (r.ok) {
      const j = await r.json();
      if (j && j.matches && typeof j.matches === "object") { map = j.matches; store.set("pcMatches", map); matchShared = true; }
    }
  } catch {}
  matchCache = map; matchAt = Date.now();
  return map;
}
export const matchesShared = () => matchShared;
/** Set (path) or clear (null) the file for a session. Local first, then the PC; { shared } says whether the PC took it. */
export async function saveMatch(sessionId, path) {
  const local = store.get("pcMatches", {});
  if (path) local[sessionId] = path; else delete local[sessionId];
  store.set("pcMatches", local);
  matchCache = local; matchAt = Date.now();
  try {
    const r = await postJson("/matches", { id: sessionId, path: path || null });
    if (r.ok) {
      const j = await r.json();
      if (j && j.matches) { store.set("pcMatches", j.matches); matchCache = j.matches; }
      matchShared = true;
      return { shared: true };
    }
    return { shared: false, status: r.status };
  } catch { return { shared: false }; }
}
/** Session id manually assigned to a file (reverse lookup), or null. */
export function manualSessionFor(path, map = matchCache || store.get("pcMatches", {})) {
  for (const [id, p] of Object.entries(map || {})) if (p === path) return id;
  return null;
}

/** Find the PC track for a session: { path, url, title, manual } or null (no match / unreachable). */
export async function findTrackFor(sessionId) {
  if (!pcConfigured()) return null;
  const hints = tracks[sessionId];
  try {
    const idx = await pcIndex();
    const files = (idx.files || []).map(f => f.path);
    const manual = (await pcMatches())[sessionId];
    if (manual && files.includes(manual)) return { ...trackOf(manual), manual: true };
    if (!hints || !hints.length) return null;
    const path = findTrack(hints, files);
    if (!path) return null;
    return { ...trackOf(path), title: baseName(path), manual: false };
  } catch {
    return null;
  }
}

/** Reference catalogue: every PC file belonging to a title (album folder or matching basenames).
 *  Returns [{ path, url, title }] — [] when nothing matches, PC not configured or unreachable. */
export async function findTracksForHints(hints) {
  if (!Array.isArray(hints) || !hints.length || !pcConfigured()) return [];
  try {
    const idx = await pcIndex();
    const files = (idx.files || []).map(f => f.path);
    return findAlbum(hints, files).map(trackOf);
  } catch {
    return [];
  }
}

// ---------- library (every folder on the PC) ----------
const natural = (a, b) => String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
/**
 * The whole PC library grouped by folder, with the session each file is (auto- or manually) matched
 * to: { folders: [{ path, name, files: [{ path, name, size, session, manual }] }], total, matched }.
 * Manual matches win; automatic ones come from the same fuzzy matcher the detail pages use.
 */
export async function pcLibrary(force = false) {
  const idx = await pcIndex(force);
  const files = (idx.files || []).slice().sort((a, b) => natural(a.path, b.path));
  const paths = files.map(f => f.path);
  const manual = await pcMatches(force);
  const bySession = {};                                   // session id → path
  for (const [id, hints] of Object.entries(tracks)) { const p = findTrack(hints, paths); if (p) bySession[id] = p; }
  for (const [id, p] of Object.entries(manual)) if (paths.includes(p)) bySession[id] = p;
  const byPath = new Map();                               // path → { session, manual }
  for (const [id, p] of Object.entries(bySession)) {
    const isManual = manual[id] === p;
    if (!byPath.has(p) || isManual) byPath.set(p, { session: id, manual: isManual });
  }
  const folders = new Map();
  for (const f of files) {
    const i = f.path.lastIndexOf("/");
    const dir = i >= 0 ? f.path.slice(0, i) : "";
    if (!folders.has(dir)) folders.set(dir, { path: dir, name: dir ? dir.split("/").pop() : "/", files: [] });
    const m = byPath.get(f.path);
    folders.get(dir).files.push({ path: f.path, name: niceName(f.path), size: f.size || 0, session: m ? m.session : null, manual: !!(m && m.manual) });
  }
  const list = [...folders.values()].sort((a, b) => natural(a.path, b.path));
  return { folders: list, total: files.length, matched: byPath.size, bySession };
}
/** Files ranked for "which file is this session?": manual/auto candidates first, then by fuzzy score, then the rest. */
export function rankFilesFor(sessionId, paths, q = "") {
  const hints = tracks[sessionId] || [];
  const needle = q.trim().toLocaleLowerCase();
  return paths
    .filter(p => !needle || p.toLocaleLowerCase().includes(needle))
    .map(p => ({ path: p, s: hints.length ? scoreFile(hints, p) : -1 }))
    .sort((a, b) => b.s - a.s || natural(a.path, b.path));
}
/** The file after `path` in the same folder (natural order), or null — used to pre-buffer the next part. */
export function nextInFolder(path, paths) {
  const i = path.lastIndexOf("/"), dir = i >= 0 ? path.slice(0, i + 1) : "";
  const sib = paths.filter(p => (p.lastIndexOf("/") >= 0 ? p.slice(0, p.lastIndexOf("/") + 1) : "") === dir).sort(natural);
  const k = sib.indexOf(path);
  return k >= 0 && k + 1 < sib.length ? sib[k + 1] : null;
}

// ---------- resume positions (file path → { pos, dur, at }) ----------
const RESUME_MIN = 60, RESUME_TAIL = 60, RESUME_MAX_AGE = 30 * DAY;
let posSynced = 0;
const localPositions = () => store.get("pos", {});
function putLocal(map) { store.set("pos", map); }
/** Merge the PC's positions into the local map (newest `at` wins). Cheap no-op within a minute. */
export async function pcPositions(force = false) {
  const local = localPositions();
  if (!pcConfigured() || (!force && Date.now() - posSynced < INDEX_TTL)) return local;
  try {
    const r = await fetchTimeout(base() + "/positions.json", 4000);
    if (r.ok) {
      const j = await r.json();
      for (const [p, v] of Object.entries(j.positions || {})) if (v && (!local[p] || (v.at || 0) > (local[p].at || 0))) local[p] = v;
      putLocal(local);
      posSynced = Date.now();
    }
  } catch {}
  return local;
}
/** Remember where a file is; `done` (or pos ≤ 0) forgets it. Local at once, PC best-effort. */
export function savePosition(path, pos, dur, done = false) {
  if (!path) return;
  const map = localPositions();
  if (done || !(pos > 0)) delete map[path];
  else map[path] = { pos: Math.round(pos * 10) / 10, dur: Math.round((dur || 0) * 10) / 10, at: Date.now() };
  const keys = Object.keys(map);
  if (keys.length > 300) for (const k of keys.sort((a, b) => (map[a].at || 0) - (map[b].at || 0)).slice(0, keys.length - 300)) delete map[k];
  putLocal(map);
  if (pcConfigured()) postJson("/positions", { path, pos: done ? 0 : pos, dur: dur || 0, done }, 4000).catch(() => {});
}
/** Seconds to resume a file from, or 0: at least a minute in, more than a minute left, not older than 30 days. */
export function resumePointFor(path, map = localPositions()) {
  const v = map[path];
  if (!v || !(v.pos >= RESUME_MIN) || Date.now() - (v.at || 0) > RESUME_MAX_AGE) return 0;
  if (v.dur && v.pos > v.dur - RESUME_TAIL) return 0;
  return v.pos;
}

// ---------- app backups on the PC ----------
/** Device label used for the PC backup slot: the setting, or a guess from the browser. */
export function deviceName() {
  if (settings.deviceName) return settings.deviceName;
  const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  if (/iPad/i.test(ua)) return "iPad";
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/Android/i.test(ua)) return "Android";
  return "Browser";
}
/** Push an app backup object to the PC. Returns the server's { device, at, size, backups } or throws. */
export async function pcBackupPush(backup, device = deviceName()) {
  const r = await postJson("/backup", { device, backup }, 20000);
  if (!r.ok) throw new Error("backup " + r.status);
  const j = await r.json();
  store.set("pcSync", { ...store.get("pcSync", {}), pushedAt: Date.now(), device });
  return j;
}
/** Newest backup on the PC (or a given device's): { device, at, backup } — null when there is none yet. */
export async function pcBackupPull(device = null) {
  const r = await fetchTimeout(base() + "/backup" + (device ? "?device=" + encodeURIComponent(device) : ""), 20000);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error("backup " + r.status);
  const j = await r.json();
  if (!j || !j.backup) return null;
  store.set("pcSync", { ...store.get("pcSync", {}), pulledAt: Date.now(), from: j.device || "" });
  return j;
}
/** Backups stored on the PC: [{ device, at, size, journal, log }]. [] when unsupported/unreachable. */
export async function pcBackups() {
  try {
    const r = await fetchTimeout(base() + "/backups.json", 6000);
    if (!r.ok) return [];
    return (await r.json()).backups || [];
  } catch { return []; }
}
