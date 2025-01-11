import { 
    OpenOrClose1,
    OpenOrClose2,
    OpenOrClose3,
    OpenOrClose4,
    OpenOrClose5,
    OpenOrClose6,
    OpenOrClose7
} from './modules/sidebar.js';


import {
    toggleAboutSidebar,
    toggleWorkSidebar,
    toggleInstallationSidebar,
    toggleFilmInfoSidebar
} from './modules/panel-handlers.js';

import { registerServiceWorker, preloadImages } from './modules/utils/event-utils.js';
import './modules/mobile-carousel.js';  // Aggiungiamo questa linea
// Rendi le funzioni disponibili globalmente
window.OpenOrClose1 = OpenOrClose1;
window.OpenOrClose2 = OpenOrClose2;
window.OpenOrClose3 = OpenOrClose3;
window.OpenOrClose4 = OpenOrClose4;
window.OpenOrClose5 = OpenOrClose5;
window.OpenOrClose6 = OpenOrClose6;
window.OpenOrClose7 = OpenOrClose7;


// Inizializza service worker e preload
registerServiceWorker();
document.addEventListener('DOMContentLoaded', preloadImages);