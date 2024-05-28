const cacheName = 'static-v3';
const filesToCache = [
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/splash.html',
  '/asset/img/profil.jpg',
  '/asset/img/1.jpg',
  '/asset/img/2.jpg',
  '/asset/img/3.jpg',
  '/asset/img/4.jpg',
  '/asset/img/5.jpg',
  '/asset/img/6.jpg',
  '/asset/img/instagram.png',
  '/asset/img/gmail.png',
  '/asset/img/github.png',
  '/asset/img/icon-192.png',
  '/asset/img/icon-512.png',
  '/asset/img/maskable-icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  const isLocalHost = self.location.origin.startsWith('file://');
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return isLocalHost ? caches.match('/index.html') : fetch(event.request);
      })
  );
});

