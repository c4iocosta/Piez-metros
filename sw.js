const C='piezo-v5';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./apple-touch-icon.png','./icon-192.png','./manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=r.url;
  // imagens de satélite e biblioteca do mapa: usa a cópia guardada primeiro
  if(u.includes('arcgisonline.com')||u.includes('unpkg.com/leaflet')||u.includes('wixstatic.com')){
    e.respondWith(caches.match(u).then(h=>h||fetch(r).then(x=>{const cp=x.clone();caches.open(u.includes('arcgis')?'piezo-mapa':C).then(c=>c.put(u,cp));return x})));return}
  e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./index.html'))))});
