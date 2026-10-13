// Recorded voice packs: checks the clip store (content/voice) and the packs/manifest written by tools/build.mjs.
// Run after `node tools/build.mjs`.  Usage: node tools/test-voice.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expandContent, voiceKey } from "./expand.mjs";
import { voiceLines } from "./voice-lines.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL " + m); } };

const bundle = expandContent();
const inv = voiceLines(bundle);
const src = readFileSync(join(root, "www", "content.js"), "utf8");
const built = JSON.parse(src.slice(src.indexOf("=") + 1).replace(/;\s*$/, ""));
const audio = built.audio || {};

// 1. every spoken line carries a key per language, keys are the hash of the text, texts are unique per key
for (const lang of ["tr", "en"]) {
  const lines = inv[lang].lines;
  ok(lines.length > 500, `${lang}: inventory has ${lines.length} lines`);
  ok(lines.every(l => l.key === voiceKey(l.text)), `${lang}: keys are voiceKey(text)`);
  ok(new Set(lines.map(l => l.key)).size === lines.length, `${lang}: keys unique`);
  ok(lines.every(l => l.text.length <= 180 && !/\d/.test(l.text)), `${lang}: spoken lines ≤ 180 chars without digits`);
}
ok(Object.values(bundle.common.lines).every(l => l.audio?.tr && l.audio?.en), "common lines carry audio keys");
const w1 = bundle.sessions["w1-intro-10"];
ok(w1.phases[0].lines[0].audio?.tr && w1.phases[0].lines[0].audio?.en, "session lines carry audio keys");

// 2. clip store: index entries have files, texts still exist in the content (stale clips are only a warning)
for (const lang of ["tr", "en"]) {
  const dir = join(root, "content", "voice", lang);
  if (!existsSync(join(dir, "index.json"))) { console.log(`note: no clips for ${lang} yet`); continue; }
  const idx = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
  const keys = Object.keys(idx.clips);
  ok(keys.length > 0 && keys.every(k => existsSync(join(dir, k + ".mp3"))), `${lang}: ${keys.length} indexed clips have files`);
  ok(keys.every(k => voiceKey(idx.clips[k].text) === k), `${lang}: indexed clip texts hash to their keys`);
  const stray = readdirSync(dir).filter(f => f.endsWith(".mp3") && !idx.clips[f.slice(0, -4)]);
  ok(stray.length === 0, `${lang}: no clip files missing from the index (${stray.slice(0, 3)})`);
  const known = new Set(inv[lang].lines.map(l => l.key));
  const stale = keys.filter(k => !known.has(k));
  if (stale.length) console.log(`note: ${lang}: ${stale.length} clips no longer used by any line`);
  ok(keys.every(k => idx.clips[k].dur > 0.3 && idx.clips[k].dur < 20), `${lang}: clip durations plausible`);
}

// 3. built packs: contiguous byte ranges, MP3 sync word at every clip start, hashed URLs, pack assignment
for (const [lang, a] of Object.entries(audio)) {
  const shared = new Set(inv[lang].lines.filter(l => l.shared).map(l => l.key));
  const seen = new Set();
  let total = 0;
  for (const [name, p] of Object.entries(a.packs)) {
    const m = /^voice\/(tr|en)\/([\w-]+)\.mp3\?v=([0-9a-f]{8})$/.exec(p.file);
    ok(m && m[1] === lang && m[2] === name, `${lang}/${name}: hashed pack URL (${p.file})`);
    const file = join(root, "www", "voice", lang, `${name}.mp3`);
    ok(existsSync(file), `${lang}/${name}: pack file exists`);
    if (!existsSync(file)) continue;
    const buf = readFileSync(file);
    let off = 0, contiguous = true, sync = true, assign = true;
    for (const [key, [o, l, d]] of Object.entries(p.clips)) {
      if (o !== off) contiguous = false;
      off = o + l;
      if (!(buf[o] === 0xff && (buf[o + 1] & 0xe0) === 0xe0)) sync = false;
      if (!(d > 0.3 && d < 20)) sync = false;
      if (seen.has(key)) assign = false;
      seen.add(key);
      if (name === "common" ? !shared.has(key) : shared.has(key)) assign = false;
      if (name !== "common" && !inv[lang].lines.find(x => x.key === key)?.uses.includes(name)) assign = false;
      total++;
    }
    ok(contiguous && off === buf.length, `${lang}/${name}: clip byte ranges tile the file (${buf.length} bytes)`);
    ok(sync, `${lang}/${name}: every clip starts with an MP3 frame sync and has a plausible duration`);
    ok(assign, `${lang}/${name}: clips belong to this pack (shared → common, else the session)`);
  }
  ok(a.recorded === total && a.lines === inv[lang].lines.length, `${lang}: coverage ${a.recorded}/${a.lines} matches the packs`);
}

console.log(`voice: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
