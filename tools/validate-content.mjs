// Checks content/exercises/*.json against content/SCHEMA.md.
// Usage: node tools/validate-content.mjs [file ...]   (no args = all exercises)
import { readFileSync, readdirSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "content", "exercises");
const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(dir).filter(f => f.endsWith(".json")).map(f => join(dir, f));

const CATEGORIES = ["seated", "night", "partner", "practical"];
const UNITS = ["min", "sec", "count", "bool"];
const VISUALS = {
  "larynx": [], "tunnel": [], "palming": [], "stambhasana": [],
  "first-opening": ["throat", "eyebrows", "palm", "still"],
  "meditation-phases": ["larynx", "eyebrows", "light", "space", "vortex", "above", "return"],
  "hands-triangle": ["shake", "rub", "still", "connect"],
  "arm-meridians": ["heart-constrictor", "heart", "lung"].flatMap(s => [s, s + "-rub"]),
  "leg-meridians": ["gallbladder", "bladder", "stomach"].flatMap(s => [s, s + "-rub"]),
  "eye-contact": ["partner", "mirror"],
  "will-centre": ["massage", "hands", "eye-belly"],
  "aura": ["open", "seal"],
  "night-body": ["rest", "exhale", "parts", "organs", "breath-belly", "breath-chest", "breath-nose", "breath-perineum", "senses", "day", "images", "limbs", "return"],
};
const SPOKEN_BAD = /[0-9()"“”‘’«»\/;:…—–\[\]]|\.\.|\b(dk|sn|min|sec|e\.g|i\.e|etc)\b\.?/i;

let errors = 0, warnings = 0;
const allIds = new Set();
try { for (const s of JSON.parse(readFileSync(join(root, "content", "index.json"), "utf8")).sections) s.items.forEach(i => allIds.add(i)); } catch {}
const err = (f, m) => { errors++; console.log(`ERROR ${f}: ${m}`); };
const warn = (f, m) => { warnings++; console.log(`warn  ${f}: ${m}`); };

function checkT(f, path, t, { spoken = false, optional = false } = {}) {
  if (t == null) { if (!optional) err(f, `${path} missing`); return; }
  if (typeof t !== "object" || typeof t.tr !== "string" || typeof t.en !== "string") return err(f, `${path} must be {tr, en}`);
  for (const lang of ["tr", "en"]) {
    const s = t[lang].trim();
    if (!s) err(f, `${path}.${lang} empty`);
    if (spoken) {
      if (s.length > 180) err(f, `${path}.${lang} is ${s.length} chars (max 180): ${s}`);
      const m = s.match(SPOKEN_BAD);
      if (m) err(f, `${path}.${lang} has "${m[0]}" (spoken text: no digits/abbreviations/brackets/quotes/colons/dashes): ${s}`);
      if (!/[.!?]$/.test(s)) warn(f, `${path}.${lang} should end with . ! or ?: ${s}`);
    }
  }
}

for (const file of files) {
  const f = basename(file);
  let ex;
  try { ex = JSON.parse(readFileSync(file, "utf8")); } catch (e) { err(f, "invalid JSON: " + e.message); continue; }
  if (ex.id !== basename(file, ".json")) err(f, `id "${ex.id}" must equal file name`);
  if (!Number.isInteger(ex.chapter)) err(f, "chapter must be an integer");
  if (typeof ex.section !== "string") err(f, "section must be a string");
  if (!CATEGORIES.includes(ex.category)) err(f, `category must be one of ${CATEGORIES}`);
  ["title", "summary", "setting"].forEach(k => checkT(f, k, ex[k]));
  if (!Array.isArray(ex.prereq)) err(f, "prereq must be an array");
  (ex.tips || []).forEach((t, i) => checkT(f, `tips[${i}]`, t));
  (ex.warnings || []).forEach((t, i) => checkT(f, `warnings[${i}]`, t));
  if (ex.visual != null && !(ex.visual in VISUALS)) err(f, `unknown visual "${ex.visual}"`);

  const params = {};
  for (const [i, p] of (ex.params || []).entries()) {
    if (!p.key) err(f, `params[${i}].key missing`);
    params[p.key] = p;
    checkT(f, `params[${i}].label`, p.label);
    if (!UNITS.includes(p.unit)) err(f, `params[${i}].unit must be one of ${UNITS}`);
    if (p.unit === "bool") { if (typeof p.def !== "boolean") err(f, `params[${i}].def must be boolean`); }
    else {
      for (const k of ["min", "max", "step", "def"]) if (typeof p[k] !== "number") err(f, `params[${i}].${k} must be a number`);
      if (p.def < p.min || p.def > p.max) err(f, `params[${i}].def outside min..max`);
    }
  }
  for (const [i, pr] of (ex.presets || []).entries()) {
    checkT(f, `presets[${i}].label`, pr.label);
    for (const [k, v] of Object.entries(pr.values || {})) {
      if (!params[k]) err(f, `presets[${i}] sets unknown param ${k}`);
      else if (params[k].unit !== "bool" && (v < params[k].min || v > params[k].max)) err(f, `presets[${i}].${k}=${v} outside range`);
    }
    if (i === 0) for (const [k, v] of Object.entries(pr.values || {})) if (params[k] && params[k].def !== v) err(f, `first preset sets ${k}=${v} but param def is ${params[k].def}`);
  }

  const phaseIds = new Set();
  let lineCount = 0, est = 0, repeatTimes = 1;
  const checkPhase = (ph, path, inRepeat) => {
    if (ph.repeat) {
      if (inRepeat) err(f, `${path}: nested repeat not supported`);
      const r = ph.repeat;
      repeatTimes = r.param ? (params[r.param]?.def ?? 1) : (r.times ?? 1);
      if (r.param ? !params[r.param] : !Number.isInteger(r.times)) err(f, `${path}.repeat needs a valid param or integer times`);
      if (!Array.isArray(ph.phases) || !ph.phases.length) err(f, `${path}.phases empty`);
      ph.phases.forEach((p, i) => checkPhase(p, `${path}.phases[${i}]`, true));
      return;
    }
    if (!ph.id) err(f, `${path}.id missing`);
    else if (phaseIds.has(ph.id)) err(f, `duplicate phase id ${ph.id}`);
    phaseIds.add(ph.id);
    checkT(f, `${path}.name`, ph.name);
    if (ph.name && (ph.name.tr.length > 32 || ph.name.en.length > 32)) warn(f, `${path}.name is long (keep under ~32 chars)`);
    if (ph.when && (!params[ph.when] || params[ph.when].unit !== "bool")) err(f, `${path}.when must be a bool param key`);
    if (ph.bell != null && !["start", "soft"].includes(ph.bell)) err(f, `${path}.bell must be start, soft or null`);
    if (ph.visual) {
      const v = VISUALS[ph.visual.id];
      if (!v) err(f, `${path}.visual unknown id ${ph.visual.id}`);
      else if (ph.visual.state && !v.includes(ph.visual.state)) err(f, `${path}.visual state "${ph.visual.state}" not in ${v}`);
    }
    const lineIds = new Set();
    for (const [i, l] of (ph.lines || []).entries()) {
      lineCount++;
      if (!l.id) err(f, `${path}.lines[${i}].id missing`);
      else if (lineIds.has(l.id)) err(f, `${path} duplicate line id ${l.id}`);
      lineIds.add(l.id);
      checkT(f, `${path}.lines[${i}].text`, l.text, { spoken: true });
      if (l.pause != null && (typeof l.pause !== "number" || l.pause < 0)) err(f, `${path}.lines[${i}].pause must be a number >= 0`);
      if (l.when && !inRepeat) err(f, `${path}.lines[${i}].when only allowed inside a repeat`);
      if (l.when && !["first", "notFirst", "last"].includes(l.when)) err(f, `${path}.lines[${i}].when invalid`);
      if (l.mode && (!ex.partner || !["partner", "mirror"].includes(l.mode))) err(f, `${path}.lines[${i}].mode needs partner:true and partner|mirror`);
      est += (l.text?.tr?.length || 0) / 13 + (l.pause ?? 2);
    }
    const h = ph.hold;
    if (h) {
      if (h.param) {
        const p = params[h.param];
        if (!p || !["min", "sec"].includes(p.unit)) err(f, `${path}.hold.param must be a min/sec param`);
        else est += p.def * (p.unit === "min" ? 60 : 1) * (inRepeat ? repeatTimes : 1);
      } else if (typeof h.sec === "number" && h.sec > 0) est += h.sec * (inRepeat ? repeatTimes : 1);
      else if (typeof h.sec !== "number" || h.sec <= 0) err(f, `${path}.hold needs sec > 0 or param`);
      const rIds = new Set();
      for (const [i, r] of (h.reminders || []).entries()) {
        if (!r.id || rIds.has(r.id)) err(f, `${path}.hold.reminders[${i}].id missing or duplicate`);
        rIds.add(r.id);
        checkT(f, `${path}.hold.reminders[${i}].text`, r.text, { spoken: true });
      }
      if (h.every != null && (typeof h.every !== "number" || h.every < 15)) err(f, `${path}.hold.every must be >= 15`);
    }
    if (!(ph.lines || []).length && !h) err(f, `${path} has neither lines nor hold`);
  };
  if (!Array.isArray(ex.phases) || !ex.phases.length) err(f, "phases empty");
  else ex.phases.forEach((p, i) => checkPhase(p, `phases[${i}]`, false));
  if (lineCount < 3) warn(f, `only ${lineCount} spoken lines`);
  for (const id of ex.prereq || []) if (!allIds.has(id)) warn(f, `prereq "${id}" is not a known exercise id (content/index.json)`);
  console.log(`info  ${f}: ${lineCount} lines, about ${Math.round(est / 60)} min with default params (repeat bodies counted roughly)`);
}
console.log(`\n${files.length} file(s): ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
