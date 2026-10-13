// Builds the app into www/ (used by the web version and the Android app):
//  - validates content, attaches audio keys to every spoken text,
//  - packs recorded clips per exercise and language into www/audio/<lang>/<pack>.bin,
//  - writes www/content.js and copies src/.
// Usage: node tools/build.mjs [--allow-missing-content]
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync, cpSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { audioKey, LANGS } from "./extract-lines.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");
const J = p => JSON.parse(readFileSync(join(root, p), "utf8"));
const opt = p => (existsSync(join(root, p)) ? J(p) : null);

try { execFileSync("node", [join(root, "tools/validate-content.mjs")], { stdio: "pipe" }); }
catch (e) { process.stdout.write(e.stdout); console.error("content validation failed"); process.exit(1); }

const index = J("content/index.json");
const exercises = {};
for (const f of readdirSync(join(root, "content/exercises")).filter(f => f.endsWith(".json"))) {
  const ex = J("content/exercises/" + f);
  exercises[ex.id] = ex;
}
const missingEx = index.sections.flatMap(s => s.items).filter(id => !exercises[id]);
if (missingEx.length) console.warn("exercises listed but not written yet:", missingEx.join(", "));

const common = J("content/common.json");
const reminder = opt("content/reminder.json");
const moon = opt("content/moon.json");
const routines = J("content/routines.json");
const report = Object.assign({}, ...readdirSync(join(root, "audio")).filter(f => /^report.*\.json$/.test(f)).map(f => J("audio/" + f)));

// ---- attach audio keys ----
const used = Object.fromEntries(LANGS.map(l => [l, new Map()])); // lang → key → Set(pack)
const tag = (T, pack) => {
  if (!T) return;
  T.audio = {};
  for (const l of LANGS) {
    const k = audioKey(l, T[l]);
    T.audio[l] = k;
    if (!used[l].has(k)) used[l].set(k, new Set());
    used[l].get(k).add(pack);
  }
};
for (const ex of Object.values(exercises)) {
  ex.titleAudio = {};
  for (const l of LANGS) { const k = audioKey(l, ex.title[l]); ex.titleAudio[l] = k; }
  const walk = phases => phases.forEach(ph => {
    if (ph.repeat) return walk(ph.phases);
    (ph.lines || []).forEach(x => tag(x.text, ex.id));
    (ph.hold?.reminders || []).forEach(x => tag(x.text, ex.id));
  });
  walk(ex.phases);
  // lines carry .audio on the line too (timeline reads l.audio)
  const lift = phases => phases.forEach(ph => {
    if (ph.repeat) return lift(ph.phases);
    (ph.lines || []).forEach(x => { x.audio = x.text.audio; });
    (ph.hold?.reminders || []).forEach(x => { x.audio = x.text.audio; });
  });
  lift(ex.phases);
}
Object.values(common.lines).forEach(T => tag(T, "common"));
if (reminder) tag(reminder.cue, "common");

// ---- packs ----
// AUDIO_KBPS=32 node tools/build.mjs  → clips re-encoded at a lower bitrate (smaller APK), cached in build/audio-<kbps>/
const KBPS = process.env.AUDIO_KBPS;
function readClip(f, k, l) {
  if (!KBPS) return readFileSync(f);
  const out = join(root, "build", "audio-" + KBPS, l, k + ".mp3");
  if (!existsSync(out) || statSync(out).mtimeMs < statSync(f).mtimeMs) {
    mkdirSync(dirname(out), { recursive: true });
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", f, "-ac", "1", "-ar", "22050", "-b:a", KBPS + "k", out]);
  }
  return readFileSync(out);
}
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
const audio = {};
let have = 0, need = 0, bytes = 0;
for (const l of LANGS) {
  audio[l] = { packs: {} };
  const byPack = {};
  for (const [k, packs] of used[l]) for (const p of packs) (byPack[p] ||= []).push(k);
  for (const ex of Object.values(exercises)) (byPack[ex.id] ||= []).push(ex.titleAudio[l]); // titles (spoken in programmes)
  mkdirSync(join(www, "audio", l), { recursive: true });
  for (const [pack, keys] of Object.entries(byPack)) {
    const bufs = [], clips = {};
    let off = 0;
    for (const k of [...new Set(keys)]) {
      need++;
      const f = join(root, "audio", l, k + ".mp3");
      if (!existsSync(f)) continue;
      have++;
      const b = readClip(f, k, l);
      clips[k] = [off, b.length, report[k]?.dur ?? +(b.length / 6000).toFixed(2)]; // 48 kbit/s CBR ≈ 6000 bytes/s
      bufs.push(b); off += b.length;
    }
    if (!bufs.length) continue;
    const file = `audio/${l}/${pack}.mp3`;
    writeFileSync(join(www, file), Buffer.concat(bufs));
    bytes += off;
    audio[l].packs[pack] = { file, clips };
  }
}

const bundle = { index, exercises, common, reminder, moon, routines, audio, built: new Date().toISOString() };
writeFileSync(join(www, "content.js"), "window.APP_CONTENT=" + JSON.stringify(bundle) + ";\n");

// ---- copy app ----
cpSync(join(root, "src"), www, { recursive: true, filter: s => !s.endsWith("README.md") });

console.log(`www/ built: ${Object.keys(exercises).length} exercises, audio ${have}/${need} clips (${(bytes / 1e6).toFixed(1)} MB)`);
