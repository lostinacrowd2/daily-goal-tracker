const CACHE = "dgt-v3";
const ASSETS = [
  "/daily-goal-tracker/",
  "/daily-goal-tracker/index.html",
  "/daily-goal-tracker/manifest.json",
  "/daily-goal-tracker/sw.js",
  "/daily-goal-tracker/icon-192.png",
  "/daily-goal-tracker/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
