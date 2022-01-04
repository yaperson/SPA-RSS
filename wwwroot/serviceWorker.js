const staticCacheName = "cache-v1";
const assets = [
    "/wwwroot",
    "/wwwroot/index.html",
    "/wwwroot/css/main.css",
    "/wwwroot/images/cv.svg",
    "/wwwroot/images/in-progress.svg",
    "/wwwroot/images/home.svg"
]
// Mise en cache

self.addEventListener('install', (e) => {
    //console.log("serviceWorker installer");
    e.waitUntil(
        caches.open(staticCacheName).then((caches) =>{
            caches.addAll(assets)
        })
    )
});

self.addEventListener('fetch', (event)=>{
    //console.log(event.request);
    event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
    
            // IMPORTANT: Cloner la requête.
            // Une requete est un flux et est à consommation unique
            // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
            var fetchRequest = event.request.clone();
    
            return fetch(fetchRequest).then(
              function(response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
    
                // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
                var responseToCache = response.clone();
    
                caches.open(staticCacheName)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });
    
                return response;
              }
            );
        })
    );
});

// Supprimer caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.add(
                keys
                .filter((key) => key !== staticCacheName)
                .map((key) => caches.delete(key))
            );
        })
    );
});