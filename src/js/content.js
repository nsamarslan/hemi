// Access to the content bundle produced by tools/build.mjs (window.APP_CONTENT).
const C = window.APP_CONTENT;
export const content = C;
export const waves = C.waves.waves;
export const series = C.series.series;
export const tracks = C.tracks || {};
export const techniques = C.techniques || [];
export const reference = C.reference || { categories: [], tags: {}, items: [] };
export const sessions = C.sessions;
export const focusLevels = C.focus.levels;
export const getEx = id => C.sessions[id];
export const allIds = C.waves.waves.flatMap(w => w.items).filter(id => C.sessions[id]);
export const waveOf = id => C.waves.waves.find(w => w.items.includes(id));
export const focusById = id => focusLevels.find(f => f.id === String(id));

export function routineDefault() { return waves[0].items.slice(0, 2).map(id => ({ id })); }

// Audio index (reserved for future recorded voice packs): { [lang]: { packs: { [pack]: { file, clips } } } }
export function clipInfo(lang, key) {
  const packs = C.audio?.[lang]?.packs || {};
  for (const [name, p] of Object.entries(packs)) if (p.clips[key]) return { pack: name, file: p.file, off: p.clips[key][0], len: p.clips[key][1], dur: p.clips[key][2] };
  return null;
}
export const packFor = (lang, pack) => C.audio?.[lang]?.packs?.[pack] || null;
