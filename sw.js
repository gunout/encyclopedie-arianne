// ============================================================
// 🔄 SERVICE WORKER — Encyclopédie Ariane 6 ESA
// © gunout
// ============================================================

const CACHE_NAME = 'esa-enc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/ariane6-db.json',
  '/ariane6-db.js',
  '/graphiques-master.js',
  '/manifest.json'
];

// Installation
self.addEventListener('install', event => {
  console.log('🔧 Installation du Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 Mise en cache des assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activation
self.addEventListener('activate', event => {
  console.log('✅ Service Worker activé');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch (stratégie cache-first pour assets, network-first pour API)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // API : network-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Assets : cache-first
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(res => {
        // Mettre en cache les nouvelles ressources
        if (res.status === 200 && event.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return res;
      });
    }).catch(() => {
      // Fallback pour la navigation
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

// Message pour forcer la mise à jour
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});