// Integration test for tools/pc-server.py: boots it with a temp audio folder and a tiny WAV,
// then checks the HTTP surface the app relies on (ping, index, raw play with Range support,
// path-traversal refusal, transcode error path, app static serving) and the shared-state endpoints
// (manual matches, resume positions, app backups — JSON files under --data).
// Usage: node tools/test-pc-server.mjs
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const WWW = join(root, "www");

let pass = 0, fail = 0;
const ok = (cond, name) => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"} ${name}`); };

// ---------- tiny valid WAV (0.1 s of silence, mono 8 kHz 16-bit) ----------
function tinyWav() {
  const n = 800, buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(8000, 24); buf.writeUInt32LE(16000, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  return buf;
}

const tmp = mkdtempSync(join(process.env.TMPDIR || "/tmp", "gateway-pc-test-"));
const data = mkdtempSync(join(process.env.TMPDIR || "/tmp", "gateway-pc-data-"));
mkdirSync(join(tmp, "Wave I Discovery"), { recursive: true });
writeFileSync(join(tmp, "Wave I Discovery", "01 Orientation.wav"), tinyWav());
writeFileSync(join(tmp, "not-audio.txt"), "hello");
writeFileSync(join(tmp, "fake.flac"), Buffer.from("this is not really flac"));

// ---------- boot the server ----------
const args = ["tools/pc-server.py", "--audio", tmp, "--data", data, "--host", "127.0.0.1", "--port", "0"];
if (existsSync(join(WWW, "index.html"))) args.push("--app", WWW);
const child = spawn("python3", args, { cwd: root });
let port = 0;
const boot = await new Promise(res => {
  let buf = "";
  child.stdout.on("data", d => {
    buf += d;
    const m = buf.match(/READY port=(\d+)/);
    if (m) res(Number(m[1]));
  });
  child.stderr.on("data", () => {});
  setTimeout(() => res(0), 15000);
});
port = boot;
ok(port > 0, `server booted (port ${port})`);
const B = `http://127.0.0.1:${port}`;

try {
  if (port) {
    // ping
    const ping = await fetch(B + "/ping").then(r => r.json());
    ok(ping.ok === true && ping.tracks === 2, `ping ok, 2 tracks indexed (${ping.tracks})`);
    ok(Array.isArray(ping.features) && ["matches", "positions", "backup"].every(f => ping.features.includes(f)) && ping.matches === 0 && ping.backups === 0, "ping advertises the shared-state features");

    // index
    const idx = await fetch(B + "/index.json").then(r => r.json());
    ok(idx.count === 2 && idx.files.some(f => f.path === "Wave I Discovery/01 Orientation.wav"), "index lists the wav, not the txt/flac-fake");

    // raw play: full file
    const rel = encodeURIComponent("Wave I Discovery/01 Orientation.wav");
    const raw = await fetch(`${B}/play/${rel}?mode=raw`);
    const rawBuf = Buffer.from(await raw.arrayBuffer());
    ok(raw.status === 200 && raw.headers.get("content-type") === "audio/wav", "raw play serves audio/wav");
    ok(raw.headers.get("accept-ranges") === "bytes", "Accept-Ranges advertised (iOS requirement)");
    ok(rawBuf.length === 44 + 1600 && rawBuf.slice(0, 4).toString() === "RIFF", "full WAV body served");

    // raw play: Range request -> 206
    const r206 = await fetch(`${B}/play/${rel}?mode=raw`, { headers: { Range: "bytes=0-99" } });
    const b206 = Buffer.from(await r206.arrayBuffer());
    ok(r206.status === 206 && b206.length === 100, "range request returns 206 with 100 bytes");
    ok(r206.headers.get("content-range") === `bytes 0-99/${44 + 1600}`, "Content-Range correct");

    // suffix range
    const rsuf = await fetch(`${B}/play/${rel}?mode=raw`, { headers: { Range: "bytes=-44" } });
    ok(rsuf.status === 206 && (await rsuf.arrayBuffer()).byteLength === 44, "suffix range (last 44 bytes) works");

    // HEAD works
    const head = await fetch(`${B}/play/${rel}?mode=raw`, { method: "HEAD" });
    ok(head.status === 200 && head.headers.get("content-length") === String(44 + 1600), "HEAD returns headers without body");

    // CORS: the packaged app and pages on this host may call the API; other sites may not
    const fromApp = await fetch(B + "/ping", { headers: { Origin: "https://localhost" } });
    ok(fromApp.status === 200 && fromApp.headers.get("access-control-allow-origin") === "https://localhost", "CORS allows the Android app origin (https://localhost)");
    const sameHost = await fetch(B + "/ping", { headers: { Origin: "http://127.0.0.1:8123" } });
    ok(sameHost.status === 200 && sameHost.headers.get("access-control-allow-origin") === "http://127.0.0.1:8123", "CORS allows a page on the same host (another port)");
    const foreign = await fetch(B + "/backups.json", { headers: { Origin: "https://evil.example" } });
    ok(foreign.status === 403 && !foreign.headers.get("access-control-allow-origin"), "a foreign web origin is refused (403, no CORS header)");
    ok(!raw.headers.get("access-control-allow-origin") && raw.status === 200, "requests without an Origin (audio elements, native) still work");

    // traversal and non-audio refused
    const trav = await fetch(B + "/play/" + encodeURIComponent("../fake.flac") + "?mode=raw");
    ok(trav.status === 404, "path traversal refused");
    const txt = await fetch(B + "/play/" + encodeURIComponent("not-audio.txt"));
    ok(txt.status === 404, "non-audio extension refused");
    const missing = await fetch(B + "/play/" + encodeURIComponent("nope.wav"));
    ok(missing.status === 404, "missing file 404");

    // transcode path: fake flac must fail loudly (500) whether or not ffmpeg exists
    const tr = await fetch(`${B}/play/${encodeURIComponent("fake.flac")}?mode=wav`);
    const trBody = await tr.text();
    ok(tr.status === 500 && /transcode failed/.test(trBody), "transcode of a broken file fails with a clear error");

    // ---------- shared state: manual matches ----------
    const post = (path, body, raw) => fetch(B + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: raw ? body : JSON.stringify(body) });
    const WAV = "Wave I Discovery/01 Orientation.wav";
    ok((await fetch(B + "/matches.json").then(r => r.json())).matches && Object.keys((await fetch(B + "/matches.json").then(r => r.json())).matches).length === 0, "matches start empty");
    const m1 = await post("/matches", { id: "w1-orientation", path: WAV });
    const m1j = await m1.json();
    ok(m1.status === 200 && m1j.ok && m1j.matches["w1-orientation"] === WAV, "POST /matches stores a manual session→file match");
    ok((await fetch(B + "/matches.json").then(r => r.json())).matches["w1-orientation"] === WAV, "GET /matches.json returns the stored match");
    ok(existsSync(join(data, "matches.json")), "matches persisted to --data/matches.json");
    ok((await fetch(B + "/ping").then(r => r.json())).matches === 1, "ping counts the manual matches");
    ok((await post("/matches", { id: "w1-orientation", path: "nope.wav" })).status === 404, "match to a missing file is refused (404)");
    ok((await post("/matches", { id: "../x", path: WAV })).status === 400, "bad session id refused (400)");
    ok((await post("/matches", "{not json", true)).status === 400, "invalid JSON body → 400");
    ok((await post("/matches", "[1,2]", true)).status === 400, "non-object JSON body → 400");
    const m2 = await post("/matches", { id: "w1-orientation", path: null }).then(r => r.json());
    ok(m2.ok && !("w1-orientation" in m2.matches), "path null removes the override");
    const bulk = await post("/matches", { matches: { "w1-orientation": WAV, "w1-intro-10": "missing.flac" } }).then(r => r.json());
    ok(bulk.ok && bulk.matches["w1-orientation"] === WAV && !bulk.matches["w1-intro-10"] && bulk.skipped.includes("w1-intro-10"), "bulk replace keeps valid entries and reports skipped ones");

    // ---------- shared state: resume positions ----------
    const p1 = await post("/positions", { path: WAV, pos: 120.44, dur: 2000 }).then(r => r.json());
    ok(p1.ok && p1.count === 1, "POST /positions stores a resume position");
    const pos = (await fetch(B + "/positions.json").then(r => r.json())).positions;
    ok(pos[WAV] && pos[WAV].pos === 120.4 && pos[WAV].dur === 2000 && pos[WAV].at > 0, "GET /positions.json returns pos/dur/at");
    ok((await post("/positions", { path: WAV, pos: 0 }).then(r => r.json())).count === 0, "pos 0 clears the position");
    ok((await post("/positions", { path: "", pos: 5 })).status === 400, "position without a path → 400");

    // ---------- shared state: app backups ----------
    ok((await fetch(B + "/backup")).status === 404, "GET /backup is 404 before any backup");
    const bk = { format: "gateway-backup/1", exportedAt: "2026-10-10T10:00:00Z", journal: [{ id: "j1", text: "rüya" }], log: [{ at: 1, day: "2026-10-10", id: "w1-orientation", sec: 60 }] };
    const b1 = await post("/backup", { device: "Phone A", backup: bk });
    const b1j = await b1.json();
    ok(b1.status === 200 && b1j.ok && b1j.device === "Phone A" && b1j.size > 0 && b1j.backups.length === 1, "POST /backup stores a device backup");
    const lst = (await fetch(B + "/backups.json").then(r => r.json())).backups;
    ok(lst.length === 1 && lst[0].device === "Phone A" && lst[0].journal === 1 && lst[0].log === 1 && lst[0].format === "gateway-backup/1", "GET /backups.json lists device, counts and format");
    const got = await fetch(B + "/backup").then(r => r.json());
    ok(got.ok && got.device === "Phone A" && got.backup.journal[0].text === "rüya", "GET /backup returns the newest backup intact (utf-8 safe)");
    ok((await fetch(B + "/backup?device=Phone%20A").then(r => r.json())).backup.format === "gateway-backup/1", "GET /backup?device= picks that device");
    ok((await post("/backup", { device: "x", backup: { nope: 1 } })).status === 400, "a non-backup object is refused (400)");
    ok(existsSync(join(data, "backups", "Phone-A.json")), "backup persisted under --data/backups/<device>.json");
    // a web page elsewhere must not be able to plant a backup (the app would import it on "restore from PC")
    const planted = await fetch(B + "/backup", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" }, body: JSON.stringify({ device: "Evil", backup: bk }) });
    ok(planted.status === 403 && !existsSync(join(data, "backups", "Evil.json")), "POST /backup from a foreign origin is refused (403)");
    const simple = await fetch(B + "/backup", { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ device: "Plain", backup: bk }) });
    ok(simple.status === 415 && !existsSync(join(data, "backups", "Plain.json")), "a text/plain POST (no CORS preflight) is refused (415)");

    // CORS preflight for POST
    const pre = await fetch(B + "/matches", { method: "OPTIONS", headers: { Origin: "https://localhost", "Access-Control-Request-Method": "POST" } });
    ok(pre.status === 204 && pre.headers.get("access-control-allow-origin") === "https://localhost" && /POST/.test(pre.headers.get("access-control-allow-methods") || "") && /content-type/i.test(pre.headers.get("access-control-allow-headers") || ""), "OPTIONS preflight allows POST with Content-Type from the app");
    const preEvil = await fetch(B + "/matches", { method: "OPTIONS", headers: { Origin: "https://evil.example", "Access-Control-Request-Method": "POST" } });
    ok(preEvil.status === 403 && !preEvil.headers.get("access-control-allow-origin"), "OPTIONS preflight from a foreign origin is refused");

    // app static serving (only when www/ exists)
    const home = await fetch(B + "/");
    const homeBody = await home.text();
    if (existsSync(join(WWW, "index.html"))) {
      ok(home.status === 200 && /<title>Gateway<\/title>/.test(homeBody), "app index served from --app");
      const appjs = await fetch(B + "/js/app.js");
      ok(appjs.status === 200 && (appjs.headers.get("content-type") || "").includes("javascript"), "app js served with js mime");
    } else {
      ok(home.status === 200, "info page served when no --app");
    }
  }
} finally {
  child.kill("SIGTERM");
  rmSync(tmp, { recursive: true, force: true });
  rmSync(data, { recursive: true, force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
