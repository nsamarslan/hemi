// Per-device storage: settings, practice log, favourites, programme (localStorage) and journal (IndexedDB).
const PREFIX = "gateway.";
export const store = {
  get(k, d) { try { const v = localStorage.getItem(PREFIX + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch {} },
};

// Import-safe outside a browser (Node < 21 has no `navigator` global; the render tests import this module).
const uiLang = (typeof navigator !== "undefined" && navigator.language) || "en";
const defaultLang = uiLang.toLowerCase().startsWith("tr") ? "tr" : "en";
export const settings = Object.assign({
  lang: defaultLang,
  voiceVol: 1,        // spoken guidance
  bedVol: 0.7,        // binaural bed (the entrainment signal)
  bellVol: 0.7,
  ambience: 0.02,     // soft filtered noise under the bed
  pauseScale: 1,
  remind: 90,
  keepAwake: true,
  audioSource: "synth",  // "synth" = the app renders the binaural bed itself; "pc" = stream from tools/pc-server.py
  recordedVoice: true,   // use the recorded voice clips when a line has one (otherwise the device text-to-speech)
  visualPack: "gateway",   // session visual pack (src/js/visuals/<id>.js; see visuals.js `packs`)
  pcUrl: "",             // PC audio server address, e.g. http://192.168.1.20:8700
  deviceName: "",        // label for this device's backup slot on the PC ("" = guessed from the browser)
  theme: "auto",         // "auto" (system) | "dark" | "light"
  motion: "auto",        // "auto" (system reduced-motion preference) | "reduce" | "full"
  fontScale: 1,          // root font size multiplier (0.9 … 1.3)
  sleepFade: 2,          // night sessions: minutes of bed fade-out at the end
  breathGuide: true,     // paced-breathing holds: breath ring on screen + audio cue (hum / tick) in the render
  ttsVoice: "",          // device text-to-speech voiceURI for the current language ("" = system default)
  ttsRate: 0.9,          // device text-to-speech rate
  rcEvery: 0,            // reality-check reminder interval in hours while the app is open (0 = off)
  rcFrom: 9, rcTo: 22,   // reminder window (local hours), shared with the Human Plus command reminder
  hpRemind: 0,           // Human Plus "command of the day" reminder interval in hours while the app is open (0 = off)
}, store.get("settings", {}));
/** User-added dream signs (free text), kept for reuse next to the preset ones. */
export const dreamSigns = {
  custom: () => store.get("dreamSigns", []),
  add(sign) { const v = String(sign || "").trim().slice(0, 40); if (!v) return; const all = store.get("dreamSigns", []); if (!all.includes(v)) { all.push(v); store.set("dreamSigns", all); } },
  remove(sign) { store.set("dreamSigns", store.get("dreamSigns", []).filter(x => x !== sign)); },
};
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

// ---------- journal (IndexedDB for drawings; localStorage fallback where IndexedDB is blocked) ----------
const useIDB = typeof indexedDB !== "undefined";
let dbp = null;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open("gateway-journal", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("entries", { keyPath: "id" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
const lsRead = () => { try { return JSON.parse(localStorage.getItem(PREFIX + "journal") || "[]"); } catch { return []; } };
const lsWrite = arr => { try { localStorage.setItem(PREFIX + "journal", JSON.stringify(arr.slice(-500))); } catch {} };
export const journal = {
  async add(entry) {
    const e = Object.assign({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 7), at: Date.now() }, entry);
    if (useIDB) {
      try {
        const d = await db();
        await new Promise((res, rej) => { const tx = d.transaction("entries", "readwrite"); tx.objectStore("entries").put(e); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
        return e;
      } catch {}
    }
    const all = lsRead(); all.push(e); lsWrite(all);
    return e;
  },
  async all() {
    if (useIDB) {
      try {
        const d = await db();
        return await new Promise((res, rej) => { const r = d.transaction("entries").objectStore("entries").getAll(); r.onsuccess = () => res(r.result.sort((a, b) => b.at - a.at)); r.onerror = () => rej(r.error); });
      } catch {}
    }
    return lsRead().sort((a, b) => b.at - a.at);
  },
  async remove(id) {
    if (useIDB) {
      try {
        const d = await db();
        await new Promise(res => { const tx = d.transaction("entries", "readwrite"); tx.objectStore("entries").delete(id); tx.oncomplete = res; });
        return;
      } catch {}
    }
    lsWrite(lsRead().filter(x => x.id !== id));
  },
  async get(id) {
    return (await this.all()).find(x => x.id === id) || null;
  },
  /** Merge a patch into one entry (id and creation time are kept). Returns the updated entry or null. */
  async update(id, patch) {
    const cur = await this.get(id);
    if (!cur) return null;
    const e = Object.assign({}, cur, patch, { id: cur.id, at: cur.at, editedAt: Date.now() });
    if (useIDB) {
      try {
        const d = await db();
        await new Promise((res, rej) => { const tx = d.transaction("entries", "readwrite"); tx.objectStore("entries").put(e); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
        return e;
      } catch {}
    }
    lsWrite(lsRead().map(x => (x.id === id ? e : x)));
    return e;
  },
  /** Merge entries from a backup (same id = overwrite). Returns the number of entries written. */
  async putMany(entries) {
    const list = (entries || []).filter(e => e && e.id && e.at);
    if (useIDB) {
      try {
        const d = await db();
        await new Promise((res, rej) => { const tx = d.transaction("entries", "readwrite"); const st = tx.objectStore("entries"); list.forEach(e => st.put(e)); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
        return list.length;
      } catch {}
    }
    const byId = new Map(lsRead().map(e => [e.id, e])); list.forEach(e => byId.set(e.id, e)); lsWrite([...byId.values()].sort((a, b) => a.at - b.at));
    return list.length;
  },
};

// ---------- backup (journal + practice log + favourites + programme + settings) ----------
export const BACKUP_FORMAT = "gateway-backup/1";
// ---------- guide reading: progress per topic, "where I left off", bookmarks ----------
export const reading = {
  all: () => store.get("gprog", {}),
  get(id) { return this.all()[id] || null; },
  /** Record reading progress for a topic. pct only ever grows; the position (chapter, scroll ratio) follows the reader. */
  update(id, { pct, ch, chTitle, y } = {}) {
    const all = this.all(); const cur = all[id] || { pct: 0 };
    all[id] = { pct: Math.max(cur.pct || 0, Math.round(Number(pct) || 0)), ch: ch ?? cur.ch ?? null, chTitle: chTitle ?? cur.chTitle ?? "", y: y ?? cur.y ?? 0, at: Date.now() };
    store.set("gprog", all);
    store.set("glast", { id, ...all[id] });
    return all[id];
  },
  last: () => store.get("glast", null),
  isRead(id) { return (this.get(id)?.pct || 0) >= 90; },
  readCount(ids) { const a = this.all(); return ids.filter(id => (a[id]?.pct || 0) >= 90).length; },
};
export const bookmarks = {
  all: () => store.get("gmarks", []),
  key: (id, ch) => id + (ch ? "#" + ch : ""),
  has(id, ch) { const k = this.key(id, ch); return this.all().some(b => this.key(b.id, b.ch) === k); },
  /** Toggle a bookmark on a topic (ch = null) or on one of its chapters. Returns true when it is now set. */
  toggle({ id, ch = null, title = "" }) {
    const k = this.key(id, ch); const list = this.all();
    const i = list.findIndex(b => this.key(b.id, b.ch) === k);
    if (i >= 0) { list.splice(i, 1); store.set("gmarks", list); return false; }
    list.unshift({ id, ch, title, at: Date.now() }); store.set("gmarks", list.slice(0, 200)); return true;
  },
  remove(key) { store.set("gmarks", this.all().filter(b => this.key(b.id, b.ch) !== key)); },
};

export async function exportBackup() {
  return { format: BACKUP_FORMAT, exportedAt: new Date().toISOString(), journal: await journal.all(), log: getLog(), fav: favorites.all(), program: store.get("program", null), settings, reading: reading.all(), bookmarks: bookmarks.all(),
    practice: store.get("hpPractice", []), hpCmd: store.get("hpCmd", {}), positions: store.get("pos", {}) };
}
/** Merge a backup object into local storage. Returns { journal, log } counts of merged items. Throws on an unknown format. */
export async function importBackup(data) {
  if (!data || data.format !== BACKUP_FORMAT) throw new Error("format");
  const nJ = await journal.putMany(data.journal);
  const log = getLog(); const seen = new Set(log.map(x => x.at + ":" + (x.id || "")));
  let nL = 0;
  for (const x of data.log || []) { const k = x.at + ":" + (x.id || ""); if (x.at && x.day && !seen.has(k)) { log.push(x); seen.add(k); nL++; } }
  log.sort((a, b) => a.at - b.at); store.set("log", log.slice(-3000));
  if (Array.isArray(data.fav)) store.set("fav", [...new Set([...favorites.all(), ...data.fav])]);
  if (data.program && !store.get("program", null)) store.set("program", data.program);
  if (data.reading && typeof data.reading === "object") {          // keep the larger progress per topic
    const cur = reading.all();
    for (const [id, r] of Object.entries(data.reading)) if (r && typeof r.pct === "number" && (!cur[id] || cur[id].pct < r.pct)) cur[id] = r;
    store.set("gprog", cur);
  }
  if (Array.isArray(data.bookmarks)) {
    const have = new Set(bookmarks.all().map(b => bookmarks.key(b.id, b.ch)));
    const add = data.bookmarks.filter(b => b && b.id && !have.has(bookmarks.key(b.id, b.ch)));
    if (add.length) store.set("gmarks", [...bookmarks.all(), ...add].slice(0, 200));
  }
  if (Array.isArray(data.practice)) {                              // Human Plus practice taps (idempotent by at+id)
    const all = store.get("hpPractice", []); const have = new Set(all.map(x => x.at + ":" + x.id));
    for (const x of data.practice) if (x && x.id && x.at && x.day && !have.has(x.at + ":" + x.id)) { all.push(x); have.add(x.at + ":" + x.id); }
    all.sort((a, b) => a.at - b.at); store.set("hpPractice", all.slice(-5000));
  }
  if (data.positions && typeof data.positions === "object") {      // resume positions of PC recordings: newer wins
    const cur = store.get("pos", {});
    for (const [p, v] of Object.entries(data.positions)) if (v && typeof v.pos === "number" && (!cur[p] || (v.at || 0) > (cur[p].at || 0))) cur[p] = v;
    store.set("pos", cur);
  }
  if (data.hpCmd && typeof data.hpCmd === "object") {              // user-noted commands: local notes win
    const cur = store.get("hpCmd", {});
    for (const [id, v] of Object.entries(data.hpCmd)) if (typeof v === "string" && v.trim() && !cur[id]) cur[id] = v.trim().slice(0, 60);
    store.set("hpCmd", cur);
  }
  return { journal: nJ, log: nL };
}
