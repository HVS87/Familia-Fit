/* Família Fit — service worker.
   Estratégia: rede primeiro, cache como reserva. Online mostra sempre a versão
   mais recente; offline (supermercado sem sinal, avião) serve a última guardada. */
/* A versão do nome é o único mecanismo que apaga o que está guardado: o
   'activate' deita fora todas as caches cujo nome não seja esta. Sobe sempre
   que houver razão para desconfiar do que lá está — foi o caso agora, com uma
   cópia de index.html sem as receitas das últimas semanas a ser servida
   sempre que o servidor não respondia. */
const CACHE = 'familia-fit-v3';
const BASE = new URL('./', self.location).pathname;
const ESSENCIAIS = ['./', './index.html', './icon.svg', './icon-180.png', './icon-192.png', './icon-512.png', './manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ESSENCIAIS.map(u => c.add(new Request(u, {cache: 'reload'})))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;

  e.respondWith(
    fetch(req)
      .then(resp => {
        if (resp && resp.ok) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
        }
        return resp;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match(BASE + 'index.html')))
  );
});
