// Validates the expanded content bundle against content/SCHEMA.md.
// Usage: node tools/validate-content.mjs
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expandContent } from "./expand.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const B = expandContent();
const { sessions, waves, focus, common, series } = B;

const FOCUS_IDS = new Set(focus.levels.map(f => f.id));
const WAVE_IDS = new Set(waves.waves.map(w => w.id));
const SERIES_IDS = new Set(series.series.map(s => s.id));
const BELL_KINDS = new Set(["start", "soft", "end", "beep"]);
const SPOKEN_BAD = /[0-9()\"“”‘’«»\\/;:…—–\[\]]|\.\.|\b(dk|sn|min|sec|hz|hz|e\.g|i\.e|etc)\b\.?/i;

let errors = 0, warnings = 0;
const err = m => { errors++; console.log(`ERROR ${m}`); };
const warn = m => { warnings++; console.log(`warn  ${m}`); };

function checkT(path, t, { spoken = false, optional = false } = {}) {
  if (t == null) { if (!optional) err(`${path} missing`); return; }
  if (typeof t !== "object" || typeof t.tr !== "string" || typeof t.en !== "string") return err(`${path} must be {tr, en}`);
  for (const lang of ["tr", "en"]) {
    const s = t[lang].trim();
    if (!s) err(`${path}.${lang} empty`);
    if (spoken) {
      if (s.length > 180) err(`${path}.${lang} is ${s.length} chars (max 180): ${s}`);
      const m = s.match(SPOKEN_BAD);
      if (m) err(`${path}.${lang} has "${m[0]}" (spoken text: no digits/abbreviations/brackets/quotes/colons/dashes): ${s}`);
      if (!/[.!?]$/.test(s)) warn(`${path}.${lang} should end with . ! or ?: ${s}`);
    }
  }
}

// series
series.series.forEach(s => {
  checkT(`series ${s.id}.title`, s.title);
  checkT(`series ${s.id}.intro`, s.intro);
  if (!Number.isInteger(s.no)) err(`series ${s.id}: no must be an integer`);
});

// waves
waves.waves.forEach(w => {
  if (!WAVE_IDS.has(w.id)) err(`wave ${w.id} not in index`);
  checkT(`wave ${w.id}.title`, w.title);
  checkT(`wave ${w.id}.intro`, w.intro);
  if (!SERIES_IDS.has(w.series)) err(`wave ${w.id} has unknown series ${w.series}`);
  if (!Array.isArray(w.items) || !w.items.length) err(`wave ${w.id} has no items`);
  w.items.forEach(id => { if (!sessions[id]) err(`wave ${w.id} lists unknown session ${id}`); });
  (w.focus || []).forEach(f => { if (!FOCUS_IDS.has(String(f))) err(`wave ${w.id} has unknown focus ${f}`); });
});

// focus levels
focus.levels.forEach(f => {
  checkT(`focus ${f.id}.title`, f.title);
  checkT(`focus ${f.id}.text`, f.text);
  if (f.beat != null && !(f.beat > 0 && f.beat < 40)) err(`focus ${f.id} beat ${f.beat} out of range`);
});
// common focusBeats consistent with focus levels
for (const f of focus.levels) {
  if (f.beat != null && common.focusBeats?.[f.id] != null && Math.abs(common.focusBeats[f.id] - f.beat) > 0.01)
    err(`focus ${f.id}: beat mismatch between focus.json (${f.beat}) and common.focusBeats (${common.focusBeats[f.id]})`);
}

// sessions
const seenIds = new Set();
for (const ex of Object.values(sessions)) {
  const f = ex.id;
  if (seenIds.has(f)) err(`duplicate session ${f}`);
  seenIds.add(f);
  if (!/^[a-z0-9-]+$/.test(f)) err(`${f}: id must be kebab-case`);
  if (!WAVE_IDS.has(ex.wave)) err(`${f}: unknown wave ${ex.wave}`);
  if (!Number.isInteger(ex.no)) err(`${f}: no must be an integer`);
  if (!Array.isArray(ex.focus) || !ex.focus.length) err(`${f}: focus must be a non-empty array`);
  ex.focus.forEach(x => { if (!FOCUS_IDS.has(String(x))) err(`${f}: unknown focus ${x}`); });
  ["title", "summary", "setting", "goal"].forEach(k => checkT(`${f}.${k}`, ex[k]));
  if (ex.command != null) checkT(`${f}.command`, ex.command);
  (ex.tips || []).forEach((x, i) => checkT(`${f}.tips[${i}]`, x));
  (ex.warnings || []).forEach((x, i) => checkT(`${f}.warnings[${i}]`, x));
  if (!Array.isArray(ex.prereq)) err(`${f}: prereq must be an array`);
  ex.prereq.forEach(p => { if (!sessions[p]) err(`${f}: prereq ${p} does not exist`); });
  if (typeof ex.night !== "boolean") err(`${f}: night must be a boolean`);

  // params & presets
  const keys = new Set();
  ex.params.forEach(p => {
    if (keys.has(p.key)) err(`${f}: duplicate param ${p.key}`);
    keys.add(p.key);
    checkT(`${f}.param ${p.key}`, p.label);
    if (!["min", "sec", "count", "bool"].includes(p.unit)) err(`${f}.param ${p.key}: bad unit`);
    if (p.unit !== "bool" && !(p.def >= p.min && p.def <= p.max)) err(`${f}.param ${p.key}: def outside min/max`);
  });
  ex.presets.forEach((pr, i) => {
    checkT(`${f}.preset ${pr.id}`, pr.label);
    Object.entries(pr.values).forEach(([k, v]) => { if (!keys.has(k)) err(`${f}.preset ${pr.id}: unknown param ${k}`); });
    if (i === 0) ex.params.forEach(p => { if (p.unit !== "bool" && pr.values[p.key] !== p.def) err(`${f}: preset[0] (${pr.id}) must match param defs (${p.key})`); });
  });

  // phases
  const phaseIds = new Set();
  const walk = (phases, ctx) => phases.forEach((ph, i) => {
    const path = `${f}.phases[${ctx}${i}]`;
    if (ph.repeat) return walk(ph.phases, `${ctx}${i}.`);
    if (!ph.id || phaseIds.has(ph.id)) err(`${path}: missing or duplicate phase id`);
    phaseIds.add(ph.id);
    checkT(`${path}.name`, ph.name);
    if (ph.bell && !BELL_KINDS.has(ph.bell)) err(`${path}: bad bell ${ph.bell}`);
    if (ph.focus != null && !FOCUS_IDS.has(String(ph.focus))) err(`${path}: unknown focus ${ph.focus}`);
    (ph.lines || []).forEach((l, j) => {
      checkT(`${path}.lines[${j}]`, l.text, { spoken: true });
      if (l.pause != null && !(l.pause >= 0 && l.pause <= 120)) err(`${path}.lines[${j}]: pause ${l.pause} out of range`);
      if (l.when && !["first", "notFirst", "last"].includes(l.when)) err(`${path}.lines[${j}]: bad when`);
    });
    if (ph.hold) {
      const h = ph.hold;
      if (h.param && !keys.has(h.param)) err(`${path}.hold: unknown param ${h.param}`);
      if (!h.param && !h.sec) err(`${path}.hold: needs sec or param`);
      (h.reminders || []).forEach((r, j) => checkT(`${path}.hold.reminders[${j}]`, r.text, { spoken: true }));
      if (h.essential && !(h.every > 0)) err(`${path}.hold: essential reminders need every`);
    }
    if (ph.breath) {
      const b = ph.breath;
      if (!ph.hold) err(`${path}.breath: needs a hold`);
      if (!(b.in > 0 && b.out > 0)) err(`${path}.breath: in and out must be > 0`);
      ["in", "hold", "out", "rest"].forEach(k => { if (b[k] != null && !(b[k] >= 0 && b[k] <= 60)) err(`${path}.breath.${k} out of range`); });
      if (b.tone != null && !["hum", "tick"].includes(b.tone)) err(`${path}.breath: bad tone ${b.tone}`);
    }
    if (ph.bed) {
      if (ph.bed.beat !== "focus" && !(typeof ph.bed.beat === "number" && ph.bed.beat > 0 && ph.bed.beat < 40)) err(`${path}.bed: bad beat`);
      if (ph.bed.gain != null && !(ph.bed.gain > 0 && ph.bed.gain <= 0.5)) err(`${path}.bed: gain out of range`);
    }
  });
  walk(ex.phases, "");
  if (!ex.phases.length) err(`${f}: no phases`);
}

// cross: every session listed in a wave, wave field matches
const listed = new Set(waves.waves.flatMap(w => w.items));
for (const id of Object.keys(sessions)) if (!listed.has(id)) err(`session ${id} not listed in any wave`);
for (const w of waves.waves) for (const id of w.items) if (sessions[id]?.wave !== w.id) err(`session ${id} wave field does not match its wave`);

// techniques catalog (Techniques tab + visual previews)
const TECH_CATS = new Set(["prep", "protection", "tools", "breathing", "mental", "communication", "exploration", "theory"]);
const techIds = new Set();
for (const tech of B.techniques || []) {
  if (techIds.has(tech.id)) err(`duplicate technique ${tech.id}`);
  techIds.add(tech.id);
  checkT(`technique ${tech.id}.title`, tech.title);
  checkT(`technique ${tech.id}.short`, tech.short);
  if (!TECH_CATS.has(tech.category)) err(`technique ${tech.id}: unknown category ${tech.category}`);
  if (!/^(prep|focus\d+|explore|return)$/.test(tech.state || "")) err(`technique ${tech.id}: bad visual state ${tech.state}`);
  (tech.sections || []).forEach((s, i) => {
    checkT(`technique ${tech.id}.sections[${i}].h`, s.h);
    (s.p || []).forEach((x, j) => checkT(`technique ${tech.id}.sections[${i}].p[${j}]`, x));
    (s.steps || []).forEach((x, j) => checkT(`technique ${tech.id}.sections[${i}].steps[${j}]`, x));
  });
  (tech.tips || []).forEach((x, i) => checkT(`technique ${tech.id}.tips[${i}]`, x));
  (tech.warnings || []).forEach((x, i) => checkT(`technique ${tech.id}.warnings[${i}]`, x));
}

// reference catalogue (content/reference.json — Hemi-Sync titles without a session of their own)
{
  const ref = B.reference || {};
  const cats = new Set((ref.categories || []).map(c => c.id));
  const tagIds = new Set(Object.keys(ref.tags || {}));
  for (const c of ref.categories || []) { checkT(`reference category ${c.id}.title`, c.title); checkT(`reference category ${c.id}.intro`, c.intro); }
  for (const [k, v] of Object.entries(ref.tags || {})) checkT(`reference tag ${k}`, v);
  const refIds = new Set();
  const refTitles = new Set();
  for (const it of ref.items || []) {
    if (!/^ref-[a-z0-9-]+$/.test(it.id || "")) err(`reference item: bad id ${it.id}`);
    if (refIds.has(it.id)) err(`duplicate reference item ${it.id}`);
    refIds.add(it.id);
    if (!it.title || typeof it.title !== "string") err(`reference ${it.id}: missing title`);
    if (refTitles.has(it.title)) err(`reference ${it.id}: duplicate title ${it.title}`);
    refTitles.add(it.title);
    if (!cats.has(it.cat)) err(`reference ${it.id}: unknown category ${it.cat}`);
    checkT(`reference ${it.id}.desc`, it.desc);
    if (!Array.isArray(it.hints) || !it.hints.length) err(`reference ${it.id}: hints required (PC matching)`);
    for (const tg of it.tags || []) if (!tagIds.has(tg)) err(`reference ${it.id}: unknown tag ${tg}`);
    for (const r of it.related || []) if (!sessions[r]) err(`reference ${it.id}: related session ${r} does not exist`);
    if (it.code != null && !/^[A-Z0-9-]{2,12}$/.test(it.code)) err(`reference ${it.id}: bad code ${it.code}`);
    if (it.creator != null && typeof it.creator !== "string") err(`reference ${it.id}: creator must be a string`);
    // a reference title must not duplicate a session the app already has (compare official track names)
    for (const [sid, hints] of Object.entries(B.tracks || {})) if (hints.some(h => h.toLowerCase() === it.title.toLowerCase())) err(`reference ${it.id}: "${it.title}" already exists as session ${sid}`);
  }
  // collections: curated groups of reference titles plus the closest in-app sessions
  const colIds = new Set();
  for (const c of ref.collections || []) {
    if (!/^[a-z0-9-]+$/.test(c.id || "")) err(`reference collection: bad id ${c.id}`);
    if (colIds.has(c.id)) err(`duplicate reference collection ${c.id}`);
    colIds.add(c.id);
    checkT(`reference collection ${c.id}.title`, c.title); checkT(`reference collection ${c.id}.intro`, c.intro);
    if (!Array.isArray(c.items) || !c.items.length) err(`reference collection ${c.id}: items required`);
    for (const i of c.items || []) if (!refIds.has(i)) err(`reference collection ${c.id}: unknown item ${i}`);
    if (!Array.isArray(c.sessions)) err(`reference collection ${c.id}: sessions must be an array`);
    for (const r of c.sessions || []) if (!sessions[r]) err(`reference collection ${c.id}: session ${r} does not exist`);
  }
  // relatedByTag: fallback session links for items without a curated `related` list
  for (const [tg, ids] of Object.entries(ref.relatedByTag || {})) {
    if (!tagIds.has(tg)) err(`reference relatedByTag: unknown tag ${tg}`);
    if (!Array.isArray(ids)) err(`reference relatedByTag ${tg}: must be an array`);
    for (const r of ids || []) if (!sessions[r]) err(`reference relatedByTag ${tg}: session ${r} does not exist`);
  }
  for (const it of ref.items || []) if (!(it.related || []).length && !(it.tags || []).some(tg => (ref.relatedByTag?.[tg] || []).length)) warn(`reference ${it.id}: no related session (neither curated nor by tag)`);
}

// tracks.json (PC audio source: official names used to match the user's files)
const trackIds = new Set(Object.keys(B.tracks || {}));
for (const [id, hints] of Object.entries(B.tracks || {})) {
  if (!sessions[id]) err(`tracks.json: unknown session ${id}`);
  if (!Array.isArray(hints) || !hints.length || hints.some(h => typeof h !== "string" || !h.trim()))
    err(`tracks.json ${id}: hints must be a non-empty array of strings`);
}
for (const id of Object.keys(sessions)) if (!trackIds.has(id)) warn(`session ${id} has no track hints (PC source will fall back to synthesis)`);

console.log(errors ? `\n${errors} error(s), ${warnings} warning(s)` : `OK: ${Object.keys(sessions).length} sessions, ${waves.waves.length} waves, ${series.series.length} series, ${focus.levels.length} focus levels, ${(B.reference?.items || []).length} reference titles (${warnings} warning(s))`);
process.exit(errors ? 1 : 0);
