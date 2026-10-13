// Inventory of every spoken line, per language, for the recorded voice packs.
// Prints JSON: { tr: { lines: [{ key, text, uses, shared }] }, en: {...} }
//   key    — stable clip id (see voiceKey in expand.mjs); the clip file is content/voice/<lang>/<key>.mp3
//   uses   — session ids that speak the line ("common" for the app-wide lines)
//   shared — used by two or more sessions (or app-wide) → goes into the "common" pack
// Order is deterministic: app-wide lines, then shared lines, then per-session lines in catalogue order —
// so partially generated packs already cover the lines every session needs first.
import { expandContent } from "./expand.mjs";

export function voiceLines(C = expandContent()) {
  const out = {};
  for (const lang of ["tr", "en"]) {
    const map = new Map();
    const add = (text, key, sid) => {
      if (!text) return;
      if (!map.has(key)) map.set(key, { key, text, uses: [] });
      const e = map.get(key);
      if (!e.uses.includes(sid)) e.uses.push(sid);
    };
    for (const l of Object.values(C.common.lines || {})) if (l?.[lang]) add(l[lang], l.audio[lang], "common");
    const order = C.waves.waves.flatMap(w => w.items).filter(id => C.sessions[id]);
    for (const id of Object.keys(C.sessions)) if (!order.includes(id)) order.push(id);
    for (const sid of order) {
      const ex = C.sessions[sid];
      for (const ph of ex.phases || []) {
        for (const l of ph.lines || []) add(l.text?.[lang], l.audio?.[lang], sid);
        for (const r of ph.hold?.reminders || []) add(r.text?.[lang], r.audio?.[lang], sid);
      }
    }
    const all = [...map.values()].map(e => ({ ...e, shared: e.uses.includes("common") || e.uses.length >= 2 }));
    const common = all.filter(e => e.uses.includes("common")), shared = all.filter(e => !e.uses.includes("common") && e.shared), single = all.filter(e => !e.shared);
    out[lang] = { lines: [...common, ...shared, ...single], chars: all.reduce((a, e) => a + e.text.length, 0) };
  }
  return out;
}

if (process.argv[1] && /voice-lines\.mjs$/.test(process.argv[1])) process.stdout.write(JSON.stringify(voiceLines()) + "\n");
