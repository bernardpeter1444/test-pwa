const CACHE_NAME = 'dienchan-cache-v1';
const urlsToCache = [
  '/',
  '/Index.html',
  '/manifest.json',
  '/script.js',
  '/icon.png',
  '/icon.png'
];
// Images A (1 → 78)
for (let i = 1; i <= 78; i++) {
  FILES_TO_CACHE.push(`/assets/image${i}A.jpg`);
}

// Images B (1 → 36)
for (let i = 1; i <= 36; i++) {
  FILES_TO_CACHE.push(`/assets/image${i}B.jpg`);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
