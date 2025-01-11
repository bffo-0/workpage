// Service Worker registration
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registrato');
                })
                .catch(err => {
                    console.log('ServiceWorker non registrato:', err);
                });
        });
    }
}

// Image preloading
export function preloadImages() {
    const images = [
        '/Movies/zanskar.png',
        '/Movies/dormiamo insieme locandina.jpg',
        '/Movies/Burden.png',
        '/assets/images/ui/Suspendedimg.png',
        '/Movies/onceandforall.png',
        '/Movies/Despite.png',
        '/Movies/donneche.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}