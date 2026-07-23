/* Lift — Service Worker
   - Cache l'app shell (coquille) pour un lancement instantane et hors-ligne.
   - Cache a la volee le JSON des exercices + les GIFs/images deja consultes,
     pour qu'ils restent visibles sans connexion apres une premiere ouverture.
*/
const APP_CACHE   = "lift-app-v1";
const DATA_CACHE  = "lift-data-v1";
const MEDIA_CACHE = "lift-media-v1";

// Fichiers de la coquille de l'app (chemins relatifs = marche sous n'importe quel sous-dossier)
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open(APP_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>![APP_CACHE,DATA_CACHE,MEDIA_CACHE].includes(k)).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", e=>{
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);

  // 1) JSON des exercices -> "network first" puis cache (donnees a jour si possible)
  if(url.pathname.endsWith("exercises.json")){
    e.respondWith(
      fetch(req).then(res=>{
        const copy = res.clone();
        caches.open(DATA_CACHE).then(c=>c.put(req,copy));
        return res;
      }).catch(()=>caches.match(req))
    );
    return;
  }

  // 2) Medias (GIF/JPG depuis le CDN) -> "cache first" (une fois vus, dispo hors-ligne)
  if(/\.(gif|jpg|jpeg|png|webp)$/i.test(url.pathname) && url.origin !== self.location.origin){
    e.respondWith(
      caches.match(req).then(hit=> hit || fetch(req).then(res=>{
        if(res.ok){ const copy=res.clone(); caches.open(MEDIA_CACHE).then(c=>c.put(req,copy)); }
        return res;
      }).catch(()=>hit))
    );
    return;
  }

  // 3) App shell -> "cache first", repli reseau
  e.respondWith(
    caches.match(req).then(hit=> hit || fetch(req).catch(()=>caches.match("./index.html")))
  );
});
