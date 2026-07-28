// Diese alte App-Kopie wurde durch kompass.verlagshausrathmer.com abgelöst.
// Dieser Service Worker meldet sich selbst ab und leert seinen Cache,
// damit die Weiterleitung in index.html zuverlässig greift.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});
