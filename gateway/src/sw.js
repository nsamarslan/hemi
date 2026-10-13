// Offline support: network first for app files (updates arrive at once); recorded voice packs are cache first
// (their URLs carry a content hash, so a changed pack is a new URL and the old entry is dropped).
// tools/build.mjs fills PRECACHE with every app file (guide topics, visuals, icons, all modules) and derives
// the cache name from a hash of their contents, so each build installs as a fresh version.
const CACHE = "gateway-__BUILD__";
const PRECACHE = __PRECACHE__;
const VOICE = "gateway-voice-v1";
async function voiceFirst(req, url) {
  const c = await caches.open(VOICE);
  const hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) {
    await c.put(req, res.clone());
    for (const k of await c.keys()) { const u = new URL(k.url); if (u.pathname === url.pathname && u.search !== url.search) c.delete(k); }
  }
  return res;
}
self.addEventListener("install", e => {
  // the core files must be there; the rest (guide topics, images) is best effort so one missing file cannot block the install
  const core = ["./", "index.html", "content.js", "guide/index.json", "css/app.css", "css/tokens.css", "js/app.js", "manifest.webmanifest"];
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(core);
    await Promise.allSettled(PRECACHE.filter(u => !core.includes(u)).map(u => c.add(u)));
  }).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== VOICE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (/\/voice\/[a-z]{2}\/[\w.-]+\.mp3$/.test(url.pathname)) { e.respondWith(voiceFirst(req, url)); return; }
  const put = res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; };
  e.respondWith(fetch(req).then(put).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
