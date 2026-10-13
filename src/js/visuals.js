// Loads technique visuals on demand (src/js/visuals/<id>.js).
const cache = new Map();
export async function renderVisual(id, state, lang) {
  try {
    if (!cache.has(id)) cache.set(id, import(`./visuals/${id}.js`).then(m => m.default));
    const v = await cache.get(id);
    return v.render(state || "", lang);
  } catch {
    return "";
  }
}
