// Per-device storage: settings, practice log, favourites, programme (localStorage) and journal (IndexedDB).
const PREFIX = "ttg2.";
export const store = {
  get(k, d) { try { const v = localStorage.getItem(PREFIX + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch {} },
};

const defaultLang = (navigator.language || "en").toLowerCase().startsWith("tr") ? "tr" : "en";
export const settings = Object.assign({
  lang: defaultLang,
  voiceVol: 1,
  bellVol: 0.7,
  pauseScale: 1,
  remind: 90,
  nightBeep: false,
  keepAwake: true,
}, store.get("settings", {}));
export const saveSettings = () => store.set("settings", settings);

export const paramsFor = (ex) => {
  const p = Object.fromEntries((ex.params || []).map(x => [x.key, x.def]));
  return Object.assign(p, store.get("p." + ex.id, {}));
};
export const saveParams = (ex, p) => store.set("p." + ex.id, p);

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export function logSession(entry) {
  const log = store.get("log", []);
  log.push(Object.assign({ at: Date.now(), day: dayKey() }, entry));
  store.set("log", log.slice(-3000));
}
export const getLog = () => store.get("log", []);

export function streak() {
  const days = new Set(getLog().map(x => x.day));
  let n = 0;
  const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export const favorites = {
  all: () => store.get("fav", []),
  has: id => store.get("fav", []).includes(id),
  toggle(id) { const f = store.get("fav", []); const i = f.indexOf(id); i < 0 ? f.push(id) : f.splice(i, 1); store.set("fav", f); },
};

// ---------- journal (IndexedDB: drawings can be large) ----------
let dbp = null;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open("ttg-journal", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("entries", { keyPath: "id" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
export const journal = {
  async add(entry) {
    const d = await db();
    const e = Object.assign({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), at: Date.now() }, entry);
    await new Promise((res, rej) => { const tx = d.transaction("entries", "readwrite"); tx.objectStore("entries").put(e); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
    return e;
  },
  async all() {
    try {
      const d = await db();
      return await new Promise((res, rej) => { const r = d.transaction("entries").objectStore("entries").getAll(); r.onsuccess = () => res(r.result.sort((a, b) => b.at - a.at)); r.onerror = () => rej(r.error); });
    } catch { return []; }
  },
  async remove(id) {
    const d = await db();
    await new Promise(res => { const tx = d.transaction("entries", "readwrite"); tx.objectStore("entries").delete(id); tx.oncomplete = res; });
  },
};
