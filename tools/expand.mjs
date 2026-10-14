// Expands the compact content sources (templates + per-wave session files) into the full
// content bundle the app loads. Usage as a module: `import { expandContent } from "./expand.mjs"`.
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const J = p => JSON.parse(readFileSync(join(root, p), "utf8"));

/** Deep merge: b overrides a; result is always a fresh structure (structuredClone). */
function deepMerge(a, b) {
  if (Array.isArray(a) || Array.isArray(b)) return structuredClone(b ?? a);
  if (a && b && typeof a === "object" && typeof b === "object") {
    const o = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) o[k] = deepMerge(a[k], b[k]);
    return o;
  }
  return b === undefined ? structuredClone(a) : structuredClone(b);
}

/** Stable id of a spoken line (per language): sha1 of the NFC text, 12 hex chars. Recorded voice clips are named by it. */
export const voiceKey = text => createHash("sha1").update(String(text).normalize("NFC")).digest("hex").slice(0, 12);
/** Attach `audio: { tr, en }` keys to every spoken line, reminder and common line (consumed by timeline.js / audio.js). */
function attachVoiceKeys(C) {
  const tag = o => { if (o?.text?.tr || o?.text?.en) o.audio = { tr: voiceKey(o.text.tr || ""), en: voiceKey(o.text.en || "") }; };
  for (const ex of Object.values(C.sessions)) for (const ph of ex.phases || []) { (ph.lines || []).forEach(tag); (ph.hold?.reminders || []).forEach(tag); }
  for (const l of Object.values(C.common.lines || {})) if (l && (l.tr || l.en)) l.audio = { tr: voiceKey(l.tr || ""), en: voiceKey(l.en || "") };
  return C;
}

export function expandContent(dir = root) {
  const read = p => JSON.parse(readFileSync(join(dir, p), "utf8"));
  const common = read("content/common.json");
  const focus = read("content/focus.json");
  const waves = read("content/waves.json");
  const series = read("content/series.json");
  const templates = read("content/templates.json");
  const defaults = read("content/defaults.json");
  const tracks = read("content/tracks.json");
  const techniques = [...read("content/techniques-a.json").techniques, ...read("content/techniques-b.json").techniques];
  techniques.sort((a, b) => a.no - b.no);
  const reference = read("content/reference.json");
  delete reference._comment;

  // Canonical order: series order, then wave `no`. Sessions follow their wave, then `no`.
  const sOrder = new Map(series.series.map((s, i) => [s.id, i]));
  waves.waves.sort((a, b) => (sOrder.get(a.series) ?? 99) - (sOrder.get(b.series) ?? 99) || (a.no - b.no));
  const wOrder = new Map(waves.waves.map((w, i) => [w.id, i]));

  const collected = [];
  for (const f of readdirSync(join(dir, "content/sessions")).filter(f => f.endsWith(".json")).sort()) {
    for (const s of read("content/sessions/" + f).sessions) {
      if (collected.some(x => x.id === s.id)) throw new Error(`duplicate session id ${s.id}`);
      collected.push(s);
    }
  }
  collected.sort((a, b) => (wOrder.get(a.wave) - wOrder.get(b.wave)) || (a.no - b.no));
  const sessions = {};
  for (const s of collected) sessions[s.id] = s;

  for (const s of Object.values(sessions)) {
    s.params = s.params || defaults.params;
    s.presets = s.presets || defaults.presets;
    s.phases = (s.phases || []).map(ph => {
      if (!ph.use) return structuredClone(ph);
      const { use, ...ov } = ph;
      const tpl = templates[use];
      if (!tpl) throw new Error(`session ${s.id}: unknown template "${use}"`);
      const merged = deepMerge(tpl, ov);
      if (merged.linesByFocus) {
        const key = String(merged.focus ?? s.focus?.[0] ?? "10");
        merged.lines = merged.linesByFocus[key] || merged.linesByFocus["10"] || [];
        delete merged.linesByFocus;
      }
      return merged;
    });
  }

  return attachVoiceKeys({ common, focus, waves, series, defaults, tracks, techniques, reference, sessions });   // no build timestamp: identical content keeps the same service-worker cache name
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const b = expandContent();
  console.log(`expanded: ${Object.keys(b.sessions).length} sessions, ${b.waves.waves.length} waves, ${b.series.series.length} series, ${Object.keys(b.tracks).length} track mappings, ${b.techniques.length} techniques, ${b.reference.items.length} reference titles, ${Object.keys(b.common.focusBeats).length} focus beat values`);
}
