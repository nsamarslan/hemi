// Access to the content bundle produced by tools/build.mjs (window.APP_CONTENT).
const C = window.APP_CONTENT;
export const content = C;
export const sections = C.index.sections;
export const exercises = C.exercises;
export const getEx = id => C.exercises[id];
export const allIds = sections.flatMap(s => s.items).filter(id => C.exercises[id]);
export const sectionOf = id => sections.find(s => s.items.includes(id));

// Audio index: { [lang]: { packs: { [pack]: { file, clips: { [key]: [offset, length, durSec] } } } } }
export function clipInfo(lang, key) {
  const packs = C.audio?.[lang]?.packs || {};
  for (const [name, p] of Object.entries(packs)) if (p.clips[key]) return { pack: name, file: p.file, off: p.clips[key][0], len: p.clips[key][1], dur: p.clips[key][2] };
  return null;
}
export const packFor = (lang, pack) => C.audio?.[lang]?.packs?.[pack] || null;

export function routineDefault() { return C.routines.default.items.map(x => ({ ...x })); }
