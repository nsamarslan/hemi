// Offline support: network first for app files (updates arrive at once), cache first for audio packs.
const CACHE = "ucuncu-goz-v2";
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./", "index.html", "content.js", "css/app.css", "css/tokens.css", "js/app.js"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const put = res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return res; };
  if (req.url.includes("/audio/")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(put)));
  } else {
    e.respondWith(fetch(req).then(put).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
  }
});
