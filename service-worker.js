const cacheName = 'static-v4';
const filesToCache = [
  '/test-pwa/index.html',
  '/test-pwa/styles.css',
  '/test-pwa/script.js',
  '/test-pwa/manifest.json',
  '/test-pwa/splash.html',
  '/test-pwa/asset/img/profil.jpg',
  '/test-pwa/asset/img/1.jpg',
  '/test-pwa/asset/img/2.jpg',
  '/test-pwa/asset/img/3.jpg',
  '/test-pwa/asset/img/4.jpg',
  '/test-pwa/asset/img/5.jpg',
  '/test-pwa/asset/img/6.jpg',
  '/test-pwa/asset/img/instagram.png',
  '/test-pwa/asset/img/gmail.png',
  '/test-pwa/asset/img/github.png',
  '/test-pwa/asset/img/icon-192.png',
  '/test-pwa/asset/img/icon-512.png',
  '/test-pwa/asset/img/maskable-icon.png'
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

