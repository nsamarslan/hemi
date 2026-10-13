// Generates Android launcher icons, splash images and notification sounds.
// Usage: node tools/android-assets.mjs   (after tools/build.mjs; needs playwright + ffmpeg)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const res = join(root, "android/app/src/main/res");
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const BG = "#16142a";
const svg = readFileSync(join(root, "src/icons/icon.svg"), "utf8");
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<rect[^>]*\/>/, "");
const glyph = (scale) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g transform="translate(256 256) scale(${scale}) translate(-256 -256)">${inner}</g></svg>`;

const browser = await chromium.launch();
const page = await browser.newPage();
async function png(w, h, html, file) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
  mkdirSync(dirname(file), { recursive: true });
  await page.screenshot({ path: file, omitBackground: true });
}
const dens = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
for (const [d, k] of Object.entries(dens)) {
  const s = Math.round(48 * k), f = Math.round(108 * k);
  await png(s, s, `<div style="width:${s}px;height:${s}px;border-radius:${s * 0.22}px;background:${BG};overflow:hidden">${glyph(1).replace("<svg", `<svg width="${s}" height="${s}"`)}</div>`, join(res, `mipmap-${d}/ic_launcher.png`));
  await png(s, s, `<div style="width:${s}px;height:${s}px;border-radius:50%;background:${BG};overflow:hidden">${glyph(0.9).replace("<svg", `<svg width="${s}" height="${s}"`)}</div>`, join(res, `mipmap-${d}/ic_launcher_round.png`));
  // adaptive icon foreground: 108dp canvas, glyph inside the 66dp safe zone
  await png(f, f, glyph(0.62).replace("<svg", `<svg width="${f}" height="${f}"`), join(res, `mipmap-${d}/ic_launcher_foreground.png`));
}
writeFileSync(join(res, "values/ic_launcher_background.xml"), `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${BG}</color>\n</resources>\n`);

// splash: replace every splash.png with the glyph centred on the night background
for (const dir of readdirSync(res).filter(d => d.startsWith("drawable"))) {
  const f = join(res, dir, "splash.png");
  if (!existsSync(f)) continue;
  const head = readFileSync(f);
  const w = head.readUInt32BE(16), h = head.readUInt32BE(20);
  const g = Math.round(Math.min(w, h) * 0.32);
  await png(w, h, `<div style="width:${w}px;height:${h}px;background:${BG};display:grid;place-items:center">${glyph(1).replace("<svg", `<svg width="${g}" height="${g}"`)}</div>`, f);
}
await browser.close();

// ---------- notification sounds (res/raw) ----------
const raw = join(res, "raw");
mkdirSync(raw, { recursive: true });
const SR = 22050;
function bell(len, parts, gain) {
  const n = Math.round(len * SR), x = new Float32Array(n);
  for (const [f, a, d] of parts) for (let i = 0; i < n; i++) { const t = i / SR; x[i] += a * Math.min(1, t / 0.012) * Math.exp(-t * 6.9 / d) * Math.sin(2 * Math.PI * f * t); }
  for (let i = 0; i < n; i++) x[i] *= gain;
  return x;
}
function wav(x, file) {
  const b = Buffer.alloc(44 + x.length * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write("data", 36); b.writeUInt32LE(x.length * 2, 40);
  x.forEach((v, i) => b.writeInt16LE(Math.max(-1, Math.min(1, v)) * 32767, 44 + i * 2));
  writeFileSync(file, b);
}
const big = bell(6, [[196, 1, 7], [541, 0.5, 5], [1060, 0.25, 3.5], [1745, 0.12, 2.2]], 0.45);
wav(big, join(raw, "bell.wav"));
const soft = bell(2.2, [[392, 0.6, 2.6], [1056, 0.22, 1.6], [1740, 0.08, 0.9]], 0.5);
const reminder = existsSync(join(root, "content/reminder.json")) ? JSON.parse(readFileSync(join(root, "content/reminder.json"), "utf8")) : null;
const { audioKey } = await import("./extract-lines.mjs");
for (const lang of ["tr", "en"]) {
  let voice = new Float32Array(0);
  const mp3 = reminder && join(root, "audio", lang, audioKey(lang, reminder.cue[lang]) + ".mp3");
  if (mp3 && existsSync(mp3)) {
    const pcm = execFileSync("ffmpeg", ["-v", "error", "-i", mp3, "-f", "s16le", "-ac", "1", "-ar", String(SR), "-"]);
    voice = new Float32Array(pcm.length / 2).map((_, i) => pcm.readInt16LE(i * 2) / 32768);
  } else console.warn(`no recorded cue for ${lang}: notification will only chime`);
  const out = new Float32Array(soft.length + voice.length);
  out.set(soft); out.set(voice, Math.round(1.2 * SR) < out.length ? Math.round(1.2 * SR) : 0);
  for (let i = 0; i < voice.length; i++) out[Math.round(1.2 * SR) + i] = (out[Math.round(1.2 * SR) + i] || 0) + voice[i] - (i < soft.length - 1.2 * SR ? 0 : 0);
  wav(out, join(raw, `eye_cue_${lang}.wav`));
}
console.log("android icons, splash and sounds written");
