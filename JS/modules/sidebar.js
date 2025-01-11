// Costanti per le posizioni
const CLOSED_POSITION = "-100%";  // Completamente fuori dallo schermo a destra
const OPEN_POSITION = "0";        // Attaccata al bordo destro

// Array con gli ID delle sidebar nell'ordine corretto basato sul layout
const sidebarIds = [
    'mySidebar6',  // Zanskar (top-left)
    'mySidebar1',   // Sleeping Close (dovrebbe essere mySidebar1)
    'mySidebar3',  // Burden
    'mySidebar7',  // Vite in sospeso
    'mySidebar5',  // Once and for all (second row)
    'mySidebar4',  // Despite
    'mySidebar2'   // Donne Che Viaggiano Sole (ultimo)
];

// Funzione per gestire i video quando si apre/chiude la sidebar
function handleVideo(sidebarId, action) {
    const sidebar = document.getElementById(sidebarId);
    const video = sidebar.querySelector('video');
    if (video) {
        if (action === 'play') {
            video.play();
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }
}

// Funzione per gestire il blur
function handleBlur(action) {
    const buttons = document.querySelectorAll('.openbtn, .openbtn2, .openbtn3, .openbtn4, .openbtn5, .openbtn6, .openbtn7');
    buttons.forEach(button => {
        if (action === 'add') {
            button.classList.add('blur-effect');
        } else {
            button.classList.remove('blur-effect');
        }
    });
}

// Funzione per aprire/chiudere le sidebar
function handleSidebar(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    const isOpen = sidebar.style.right === '0px' || sidebar.style.right === '0%';
    
    if (isOpen) {
        sidebar.style.right = '-100%';
        handleVideo(sidebarId, 'pause');
        handleBlur('remove');
    } else {
        closeAllSidebars();
        sidebar.style.right = '0';
        handleVideo(sidebarId, 'play');
        handleBlur('add');
        
        // Aggiorna lo stato dei pulsanti quando si apre una sidebar
        const currentIndex = sidebarIds.indexOf(sidebarId);
        updateNavigationButtons(currentIndex);
    }
}

// Funzione per chiudere tutte le sidebar
function closeAllSidebars() {
    const sidebars = document.querySelectorAll('.Sidebar, .Sidebar2, .Sidebar3, .Sidebar4, .Sidebar5, .Sidebar6, .Sidebar7');
    sidebars.forEach(sidebar => {
        sidebar.style.right = '-100%';
        handleVideo(sidebar.id, 'pause');
    });
    handleBlur('remove');
}

// Event listener per chiudere le sidebar quando si clicca fuori
document.addEventListener('click', function(event) {
    const isOutsideSidebar = !event.target.closest('.Sidebar, .Sidebar2, .Sidebar3, .Sidebar4, .Sidebar5, .Sidebar6, .Sidebar7');
    const isOutsideButton = !event.target.closest('.openbtn, .openbtn2, .openbtn3, .openbtn4, .openbtn5, .openbtn6, .openbtn7');
    const isOutsideImage = !event.target.closest('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    
    // Controlli per i pannelli principali
    const isPanelElement = event.target.closest('#workSidebar, #aboutSidebar, #installationSidebar, .film-sidebar');
    const isPanelTrigger = event.target.hasAttribute('data-panel-trigger');
    
    // Verifica se c'è almeno una sidebar dei film aperta
    const isAnyMovieSidebarOpen = sidebarIds.some(id => {
        const sidebar = document.getElementById(id);
        return sidebar && (sidebar.style.right === '0' || sidebar.style.right === '0%' || sidebar.style.right === '0px');
    });

    // Verifica se c'è almeno un pannello principale aperto
    const isAnyPanelOpen = [
        '#workSidebar', 
        '#aboutSidebar', 
        '#installationSidebar'
    ].some(selector => document.querySelector(selector)?.classList.contains('visible')) ||
    document.querySelector('.film-sidebar')?.classList.contains('visible');

    // Se c'è interazione simultanea tra sidebar dei film e pannelli, non chiudere nulla
    if (isAnyMovieSidebarOpen && isAnyPanelOpen) {
        return;
    }

    // Altrimenti, procedi con la normale logica di chiusura
    if (isOutsideSidebar && isOutsideButton && isOutsideImage && !isPanelElement && !isPanelTrigger) {
        closeAllSidebars();
        handleBlur('remove');
    }
});

// Funzioni individuali per ogni sidebar
function OpenOrClose1() { handleSidebar('mySidebar1'); }
function OpenOrClose2() { handleSidebar('mySidebar2'); }
function OpenOrClose3() { handleSidebar('mySidebar3'); }
function OpenOrClose4() { handleSidebar('mySidebar4'); }
function OpenOrClose5() { handleSidebar('mySidebar5'); }
function OpenOrClose6() { handleSidebar('mySidebar6'); }
function OpenOrClose7() { handleSidebar('mySidebar7'); }

// Funzione per trovare l'indice della sidebar corrente
function getCurrentSidebarIndex() {
    // Aggiungiamo un console.log per debug
    const currentIndex = sidebarIds.findIndex(id => {
        const sidebar = document.getElementById(id);
        const isOpen = sidebar && (
            sidebar.style.right === '0' || 
            sidebar.style.right === '0%' || 
            sidebar.style.right === '0px'
        );
        console.log(`Checking ${id}:`, isOpen); // Debug
        return isOpen;
    });
    console.log('Current Index:', currentIndex); // Debug
    return currentIndex;
}

// Funzione per navigare alla sidebar precedente
function navigatePrevious() {
    const currentIndex = getCurrentSidebarIndex();
    console.log('Navigating from index:', currentIndex); // Debug
    
    if (currentIndex > 0) {
        const prevId = sidebarIds[currentIndex - 1];
        console.log('Moving to:', prevId); // Debug
        handleSidebar(prevId);
        updateNavigationButtons(currentIndex - 1);
    }
}

// Funzione per navigare alla sidebar successiva
function navigateNext() {
    const currentIndex = getCurrentSidebarIndex();
    console.log('Navigating from index:', currentIndex); // Debug
    
    if (currentIndex < sidebarIds.length - 1) {
        const nextId = sidebarIds[currentIndex + 1];
        console.log('Moving to:', nextId); // Debug
        handleSidebar(nextId);
        updateNavigationButtons(currentIndex + 1);
    }
}

// Funzione per aggiornare lo stato dei pulsanti di navigazione
function updateNavigationButtons(currentIndex) {
    const nextButtons = document.querySelectorAll('.next-movie');
    const prevButtons = document.querySelectorAll('.prev-movie');
    
    // Gestisci il pulsante "successivo" - si spegne solo quando arrivi a mySidebar2
    nextButtons.forEach(btn => {
        if (sidebarIds[currentIndex] === 'mySidebar2') {
            btn.style.opacity = "0.5";
            btn.style.pointerEvents = "none";
        } else {
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
        }
    });

    // Gestisci il pulsante "precedente" - sempre opaco su mySidebar6
    prevButtons.forEach(btn => {
        if (sidebarIds[currentIndex] === 'mySidebar6') {
            btn.style.opacity = "0.5";
            btn.style.pointerEvents = "none";
        } else {
            btn.style.opacity = "1";
            btn.style.pointerEvents = "auto";
        }
    });
}

// Aggiungi gli event listener quando il documento è caricato
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.prev-movie').forEach(btn => {
        btn.addEventListener('click', navigatePrevious);
    });
    
    document.querySelectorAll('.next-movie').forEach(btn => {
        btn.addEventListener('click', navigateNext);
    });

    // Inizializza lo stato dei pulsanti
    updateNavigationButtons(getCurrentSidebarIndex());
});

// Esporta le funzioni
export {
    OpenOrClose1,
    OpenOrClose2,
    OpenOrClose3,
    OpenOrClose4,
    OpenOrClose5,
    OpenOrClose6,
    OpenOrClose7,
    navigatePrevious,
    navigateNext
};