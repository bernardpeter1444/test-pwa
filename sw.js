const CACHE_NAME = "pwa-cache-v1";

// Fichiers essentiels
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/script.js",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

// Images A (1 → 78)
for (let i = 1; i <= 78; i++) {
  FILES_TO_CACHE.push(`/assets/image${i}A.jpg`);
}

// Images B (1 → 36)
for (let i = 1; i <= 36; i++) {
  FILES_TO_CACHE.push(`/assets/image${i}B.jpg`);
}

// Installation → cache tous les fichiers
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation → supprime anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Stratégie offline-first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});