// Fan Guys Exam Pro — offline cache.
// Strategy: pages = network first (so updates arrive), everything else = cache first, filled on use.
// Bump VERSION on each release to clear old caches. Saved progress is in localStorage and is NOT touched here.
const VERSION = "exampro-2026-11-17";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-180.png",
  "./img/logo.png", "./img/mascot-point.png", "./img/mascot-badge.png", "./img/mascot-book.jpg",
  "./img/static-layer.png", "./img/sciss-layer.png", "./img/basket-layer.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return; // links to NFPA, OSHA, YouTube etc. go straight to the network

  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put("./index.html", copy)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
    if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return res;
  })));
});
