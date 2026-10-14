// Builds the app into www/: expands + validates content, writes www/content.js, copies src/.
// Usage: node tools/build.mjs
import { writeFileSync, rmSync, mkdirSync, cpSync, readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { expandContent } from "./expand.mjs";
import { voiceLines } from "./voice-lines.mjs";
import { createHash } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");

try { execFileSync("node", [join(root, "tools/validate-content.mjs")], { stdio: "inherit" }); }
catch { console.error("content validation failed"); process.exit(1); }

const bundle = expandContent();
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });
cpSync(join(root, "src"), www, { recursive: true });

// recorded voice packs: content/voice/<lang>/{index.json,<key>.mp3} → www/voice/<lang>/<pack>.mp3 + manifest in APP_CONTENT.audio
// (one file per pack = the clips concatenated; every clip is a standalone MP3 so a byte range decodes on its own)
export function buildVoicePacks(bundle, srcRoot = root, outRoot = www) {
  const audio = {}, usage = voiceLines(bundle);
  for (const lang of ["tr", "en"]) {
    const dir = join(srcRoot, "content", "voice", lang);
    if (!existsSync(join(dir, "index.json"))) continue;
    const idx = JSON.parse(readFileSync(join(dir, "index.json"), "utf8"));
    const packs = {};
    for (const ln of usage[lang].lines) {
      const clip = idx.clips[ln.key];
      if (!clip || clip.text !== ln.text || !existsSync(join(dir, ln.key + ".mp3"))) continue;
      (packs[ln.shared ? "common" : ln.uses[0]] ||= []).push({ key: ln.key, dur: clip.dur });
    }
    const outDir = join(outRoot, "voice", lang);
    mkdirSync(outDir, { recursive: true });
    const manifest = {};
    let recorded = 0;
    for (const [name, clips] of Object.entries(packs)) {
      const parts = clips.map(c => readFileSync(join(dir, c.key + ".mp3")));
      const file = Buffer.concat(parts);
      writeFileSync(join(outDir, `${name}.mp3`), file);
      let off = 0; const m = {};
      clips.forEach((c, i) => { m[c.key] = [off, parts[i].length, c.dur]; off += parts[i].length; });
      manifest[name] = { file: `voice/${lang}/${name}.mp3?v=${createHash("sha1").update(file).digest("hex").slice(0, 8)}`, clips: m };
      recorded += clips.length;
    }
    audio[lang] = { packs: manifest, voice: idx.voice || "", lines: usage[lang].lines.length, recorded };
  }
  bundle.audio = audio;
  return audio;
}
const voiceStats = buildVoicePacks(bundle);
writeFileSync(join(www, "content.js"), "window.APP_CONTENT=" + JSON.stringify(bundle) + ";\n");

// service worker: precache list = every file in www/ except the voice packs (cache-first at runtime) and sw.js;
// the cache name carries a hash of those files, so any content or code change installs as a new version.
export function finishServiceWorker(outRoot = www) {
  const files = [];
  const walk = (dir, rel) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const r = rel ? `${rel}/${f.name}` : f.name;
      if (f.name.startsWith(".")) continue;
      if (f.isDirectory()) { if (r !== "voice") walk(join(dir, f.name), r); }
      else if (r !== "sw.js" && !r.endsWith(".map")) files.push(r);
    }
  };
  walk(outRoot, "");
  files.sort();
  const h = createHash("sha1");
  for (const f of files) h.update(f).update(readFileSync(join(outRoot, f)));
  const build = h.digest("hex").slice(0, 10);
  const urls = ["./", ...files.filter(f => f !== "index.html"), "index.html"];
  const swPath = join(outRoot, "sw.js");
  const sw = readFileSync(swPath, "utf8").replace("__BUILD__", build).replace("__PRECACHE__", JSON.stringify(urls));
  writeFileSync(swPath, sw);
  return { build, files: urls.length };
}
writeFileSync(join(www, ".nojekyll"), "");            // GitHub Pages: serve files as they are
const sw = finishServiceWorker();

const secs = Object.values(bundle.sessions)
  .map(s => `${s.phases.length} phases`)
  .length;
console.log(`www/ built: ${Object.keys(bundle.sessions).length} sessions (${secs}), ${bundle.waves.waves.length} waves, ${bundle.series.series.length} series, ${bundle.focus.levels.length} focus levels; sw gateway-${sw.build} precaches ${sw.files} files`);
for (const [lang, a] of Object.entries(voiceStats)) console.log(`voice ${lang}: ${a.recorded}/${a.lines} lines recorded in ${Object.keys(a.packs).length} packs`);
