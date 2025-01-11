const CACHE_NAME = 'workpage-cache-v1';

const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/JS/main.js',
    '/JS/modules/sidebar.js',
    '/JS/modules/panel-handlers.js',
    '/JS/modules/mobile-carousel.js',
    '/JS/modules/utils/dom-utils.js',
    '/JS/modules/utils/event-utils.js',
    '/manifest.json',
    
    // CDN Resources
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    
    // Images & Icons
    '/assets/images/favicons/FAVICONE32X32.png',
    
    // Videos
    '/assets/videos/ZANSKAR 6000 music_02.mp4',
    '/assets/videos/Acqua.mp4',
    '/assets/videos/Burden.mov',
    '/assets/videos/OnceAndFor.mov',
    '/assets/videos/DespiteTheFacts.mov',
    '/assets/videos/donneche.mp4',
    '/assets/videos/suspended.mp4',
    
    // Audio
    '/Audio Page3/2.dariyasd_proj_quadraphonic_Front.wav'
];

const RUNTIME_CACHE = [
    '/assets/images/ui/*.png',
    '/assets/images/ui/*.jpg',
    '/Movies/*.png',
    '/Movies/*.jpg',
    '/IMG_page3/*.jpg',
    '/IMG_page3/*.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Proviamo a cachare ogni risorsa individualmente
                return Promise.all(
                    PRECACHE_ASSETS.map(url => {
                        return cache.add(url).catch(err => {
                            console.log('Errore nel caching di:', url, err);
                            // Continuiamo con le altre risorse anche se una fallisce
                            return Promise.resolve();
                        });
                    })
                );
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseClone));
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
}); 