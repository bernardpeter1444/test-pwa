const CACHE_NAME = 'dienchan-cache-v1';
const urlsToCache = [
  '/',
  '/Index.html',
  '/manifest.json',
  '/script.js',
  '/icon.png',
  '/icon.png'
];

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
