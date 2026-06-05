const CACHE = 'minimentes-v1';
const ASSETS = [
  '/', '/index.html',
  '/css/main.css',
  '/js/app.js', '/js/data.js',
  '/js/games/frases.js', '/js/games/colorear.js',
  '/js/games/puntos.js', '/js/games/letras.js',
  '/js/games/contar.js', '/js/games/sombras.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
