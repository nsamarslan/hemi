// Loads technique visuals on demand (src/js/visuals/<id>.js).
const cache = new Map();
export async function renderVisual(id, state, lang) {
  try {
    if (!cache.has(id)) cache.set(id, import(`./visuals/${id}.js`).then(m => m.default));
    const v = await cache.get(id);
    return v(state || "", lang);
  } catch {
    return "";
  }
}

// Selectable visual packs (Settings → "Session visual"; also previewed per technique).
export const packs = [
  { id: "gateway", title: { tr: "Portal (varsayılan)", en: "Portal (default)" } },
  { id: "aura", title: { tr: "Enerji Akışı", en: "Energy Flow" } },
  { id: "box", title: { tr: "Kutu (ECB)", en: "The Box (ECB)" } },
  { id: "waves", title: { tr: "Renk Dalgaları", en: "Color Waves" } },
  { id: "body", title: { tr: "Beden Haritası", en: "Body Map" } },
  { id: "img", title: { tr: "Kozmik Görseller", en: "Cosmic Images" } },
];
