const CACHE='minimentes-v8';
const ASSETS=['./','/index.html','/css/main.css','/js/app.js','/js/data.js',
  '/js/games/frases.js','/js/games/colorear.js','/js/games/puntos.js',
  '/js/games/letras.js','/js/games/contar.js','/js/games/sombras.js',
  '/js/games/ingles.js','/js/games/completa.js','/js/games/sonidos.js',
  '/js/games/calculo.js','/js/games/colores.js','/js/games/memoria.js',
  '/js/games/forma.js','/js/games/cuento.js','/js/games/reloj.js',
  '/js/games/tiempo.js','/js/games/ordena_nums.js','/js/games/clasifica.js',
  '/js/games/patron.js','/js/games/laberinto.js','/js/games/mini.js','/js/games/opuestos.js','/js/games/partes_cuerpo.js','/js/games/emociones.js','/manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>cached)));});
