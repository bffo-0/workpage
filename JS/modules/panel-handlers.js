// Funzioni helper per gestire i container
function hideContainers() {
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    
    if (infoContainer) infoContainer.classList.add('hidden');
    if (navContainer) navContainer.classList.add('hidden');
}

function showContainers() {
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    
    if (infoContainer) infoContainer.classList.remove('hidden');
    if (navContainer) navContainer.classList.remove('hidden');
}

// Funzione per verificare se siamo in modalità mobile/tablet
function isMobileOrTablet() {
    return window.innerWidth <= 785;
}

// Funzioni per gestire l'overlay solo in mobile/tablet
function showOverlay() {
    if (isMobileOrTablet()) {
        const overlay = document.querySelector('.overlay');
        const aboutPanel = document.getElementById('aboutSidebar');
        if (overlay && aboutPanel) {
            overlay.classList.add('active');
            aboutPanel.style.opacity = '0';
            aboutPanel.style.pointerEvents = 'none';
        }
    }
}

function hideOverlay() {
    if (isMobileOrTablet()) {
        const overlay = document.querySelector('.overlay');
        const aboutPanel = document.getElementById('aboutSidebar');
        if (overlay && aboutPanel) {
            overlay.classList.remove('active');
            aboutPanel.style.opacity = '1';
            aboutPanel.style.pointerEvents = 'auto';
        }
    }
}

// Funzione per chiudere il pannello installation e fermare l'audio
function closeInstallationPanel() {
    const panel = document.querySelector('#installationSidebar');
    const audio = panel?.querySelector('audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    panel?.classList.remove('visible');
    hideOverlay(); // Funzionerà solo in mobile/tablet
}

// Funzione per gestire il blur delle immagini
function toggleButtonsBlur(shouldBlur) {
    const buttons = document.querySelectorAll('.grid-container button img');
    buttons.forEach(img => {
        if (shouldBlur) {
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s ease';
            
            // Aggiungiamo l'hover effect
            img.closest('button').addEventListener('mouseenter', () => {
                img.style.filter = 'blur(0px)';
            });
            
            img.closest('button').addEventListener('mouseleave', () => {
                img.style.filter = 'blur(5px)';
            });
        } else {
            img.style.filter = 'none';
            img.style.transition = 'filter 0.3s ease';
            
            // Rimuoviamo gli event listener quando non serve più il blur
            const button = img.closest('button');
            button.replaceWith(button.cloneNode(true));
        }
    });
}

// Event Listener principale
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.grid-container button img');
    const aboutPanel = document.getElementById('aboutSidebar');
    const workPanel = document.getElementById('workSidebar');
    const installationPanel = document.getElementById('installationSidebar');
    const installationAudio = document.querySelector('#installation\\ audio');
    
    // Event listener per l'immagine in about che apre/chiude installation
    document.querySelector('.installation-image-container img').addEventListener('click', () => {
        const installationPanel = document.getElementById('installationSidebar');
        const isVisible = installationPanel.classList.toggle('visible');
        
        if (isVisible) {
            showOverlay(); // Funzionerà solo in mobile/tablet
            installationAudio.play();
        } else {
            hideOverlay(); // Funzionerà solo in mobile/tablet
            installationAudio.pause();
            installationAudio.currentTime = 0;
        }
    });

    // Event listener per il bottone di chiusura dell'installation panel
    const closeInstallation = document.querySelector('[data-panel-close="installation"]');
    if (closeInstallation) {
        closeInstallation.addEventListener('click', () => {
            installationPanel.classList.remove('visible');
            installationAudio.pause();
            installationAudio.currentTime = 0;
        });
    }

    // Funzione per aggiungere gli event listener del blur
    function addBlurListeners(img) {
        const button = img.closest('button');
        // Rimuovi eventuali vecchi listener clonando e sostituendo il button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Aggiungi i nuovi listener
        newButton.addEventListener('mouseenter', () => {
            if (aboutPanel.classList.contains('visible') || 
                workPanel.classList.contains('visible')) {
                img.style.filter = 'none';
            }
        });
        newButton.addEventListener('mouseleave', () => {
            if (aboutPanel.classList.contains('visible') || 
                workPanel.classList.contains('visible')) {
                img.style.filter = 'blur(5px)';
            }
        });
    }

    // Gestione pannelli about, work e installation
    document.querySelectorAll('[data-panel-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panelType = trigger.getAttribute('data-panel-trigger');
            let panel;
            
            switch(panelType) {
                case 'about':
                    panel = aboutPanel;
                    break;
                case 'work':
                    panel = workPanel;
                    break;
            }
            
            if (panel) {
                const isVisible = panel.classList.toggle('visible');
                handlePanelVisibilityChange(isVisible);
            }
        });
    });

    // Event listener per i film nel work panel
    document.querySelectorAll('[class^="aligned-text"]').forEach(row => {
        row.addEventListener('click', () => {
            const filmId = row.getAttribute('data-film');
            const filmSidebar = document.getElementById(filmId);
            
            if (filmSidebar) {
                // Chiudi tutti gli altri film sidebars
                document.querySelectorAll('.film-sidebar').forEach(sidebar => {
                    if (sidebar.id !== filmId) {
                        sidebar.classList.remove('visible');
                    }
                });
                
                // Toggle del film sidebar selezionato
                filmSidebar.classList.toggle('visible');
            }
        });

        row.style.cursor = 'pointer';
    });

    // Aggiungi event listener per i pulsanti di chiusura dei film
    document.querySelectorAll('[data-film-close]').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const filmSidebar = closeBtn.closest('.film-sidebar');
            if (filmSidebar) {
                filmSidebar.classList.remove('visible');
            }
        });
    });

   // Gestione click fuori dalle sidebar
document.addEventListener('click', (e) => {
    const isClickInsideWork = workPanel.contains(e.target);
    const isClickInsideFilm = Array.from(document.querySelectorAll('.film-sidebar')).some(sidebar => sidebar.contains(e.target));
    const isClickInsideAbout = aboutPanel.contains(e.target);
    const isClickInsideInstallation = installationPanel.contains(e.target);
    const isWorkTrigger = e.target.getAttribute('data-panel-trigger') === 'work';
    const isAboutTrigger = e.target.getAttribute('data-panel-trigger') === 'about';
    const isFilmClose = e.target.hasAttribute('data-film-close');
    const isInsideMovieSidebar = e.target.closest('[class*="Sidebar"]');
    const isMovieControl = e.target.closest('.prev-movie, .next-movie, .openbtn, [class*="openbtn"], [class*="imgmovie"]');
    
    // Verifica se c'è almeno una sidebar dei film aperta
    const isAnyMovieSidebarOpen = [
        'mySidebar1', 'mySidebar2', 'mySidebar3', 'mySidebar4', 
        'mySidebar5', 'mySidebar6', 'mySidebar7'
    ].some(id => {
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
    if (!isClickInsideWork && !isClickInsideFilm && !isClickInsideAbout && 
        !isClickInsideInstallation && !isWorkTrigger && !isAboutTrigger && 
        !isFilmClose && !isInsideMovieSidebar && !isMovieControl) {
        
        workPanel.classList.remove('visible');
        aboutPanel.classList.remove('visible');
        installationPanel.classList.remove('visible');
        document.querySelectorAll('.film-sidebar').forEach(sidebar => {
            sidebar.classList.remove('visible');
        });
        installationAudio.pause();
        installationAudio.currentTime = 0;
        
        handlePanelVisibilityChange(false);
    }
});
    // Gestione tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            workPanel.classList.remove('visible');
            aboutPanel.classList.remove('visible');
            installationPanel.classList.remove('visible');
            document.querySelectorAll('.film-sidebar').forEach(sidebar => {
                sidebar.classList.remove('visible');
            });
            
            document.querySelector('.info-container').classList.remove('hidden');
            document.querySelector('.nav-container').classList.remove('hidden');
            document.querySelector('.main-container').classList.remove('blur');
            buttons.forEach(img => {
                img.style.filter = 'blur(0px)';
            });
        }
    });

    // Gestione chiusura about panel
    document.querySelector('.closebtn[onclick="toggleAboutSidebar()"]').addEventListener('click', () => {
        installationPanel.classList.remove('visible');
        installationAudio.pause();
        installationAudio.currentTime = 0;
    });

    // Aggiungi questo all'interno del DOMContentLoaded
    document.querySelectorAll('.closebtn').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const panel = closeBtn.closest('#workSidebar, #aboutSidebar');
            if (panel) {
                panel.classList.remove('visible');
                handlePanelVisibilityChange(false);
                
                // Chiudi tutti i film sidebar
                document.querySelectorAll('.film-sidebar').forEach(sidebar => {
                    sidebar.classList.remove('visible');
                });
                
                // Ripristina i container direttamente
                showContainers();
                document.querySelector('.main-container')?.classList.remove('blur');
                
                // Rimuovi il blur dalle immagini
                document.querySelectorAll('.grid-container button img').forEach(img => {
                    img.style.filter = 'none';
                    // Rimuovi eventuali event listener clonando il button
                    const button = img.closest('button');
                    if (button) {
                        button.replaceWith(button.cloneNode(true));
                    }
                });
            }
        });
    });

    // Aggiungi un listener per il resize della finestra
    window.addEventListener('resize', () => {
        if (!isMobileOrTablet()) {
            // Se non siamo in mobile/tablet, rimuovi overlay e ripristina about panel
            hideOverlay();
        }
    });
});

// Funzioni di toggle esportate
export function toggleAboutSidebar() {
    const panel = document.querySelector('.about-panel');
    if (panel) {
        const isVisible = panel.classList.toggle('visible');
        if (isVisible) {
            hideContainers();
        } else {
            showContainers();
        }
    }
}

export function toggleWorkSidebar() {
    const panel = document.querySelector('.work-panel');
    if (panel) {
        const isVisible = panel.classList.toggle('visible');
        if (isVisible) {
            hideContainers();
        } else {
            showContainers();
        }
    }
}

export function toggleInstallationSidebar() {
    const panel = document.querySelector('.installation-panel');
    if (panel) {
        const isVisible = panel.classList.toggle('visible');
        if (isVisible) {
            hideContainers();
        } else {
            showContainers();
        }
    }
}

export function toggleFilmInfoSidebar() {
    const panel = document.querySelector('.film-sidebar');
    if (panel) {
        const isVisible = panel.classList.toggle('visible');
        if (isVisible) {
            hideContainers();
        } else {
            showContainers();
        }
    }
}

// Aggiungi questa nuova funzione helper
function handlePanelVisibilityChange(isVisible) {
    const buttons = document.querySelectorAll('.grid-container button img');
    const aboutPanel = document.getElementById('aboutSidebar');
    const workPanel = document.getElementById('workSidebar');

    const isAnyPanelVisible = aboutPanel.classList.contains('visible') || 
                             workPanel.classList.contains('visible');

    document.querySelector('.info-container').classList.toggle('hidden', isAnyPanelVisible);
    document.querySelector('.nav-container').classList.toggle('hidden', isAnyPanelVisible);
    document.querySelector('.main-container').classList.toggle('blur', isAnyPanelVisible);

    buttons.forEach(img => {
        // Aggiungiamo la transizione prima di qualsiasi cambio di stato
        img.style.transition = 'filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (isAnyPanelVisible) {
            img.style.filter = 'blur(5px)';
            
            const button = img.closest('button');
            const newButton = button.cloneNode(true);
            const newImg = newButton.querySelector('img');
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('mouseenter', () => {
                if (aboutPanel.classList.contains('visible') || 
                    workPanel.classList.contains('visible')) {
                    newImg.style.filter = 'blur(0)';
                }
            });
            
            newButton.addEventListener('mouseleave', () => {
                if (aboutPanel.classList.contains('visible') || 
                    workPanel.classList.contains('visible')) {
                    newImg.style.filter = 'blur(5px)';
                }
            });
        } else {
            img.style.filter = 'none';
            const button = img.closest('button');
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        }
    });
}

// Modifica gli event listener per i pulsanti di chiusura
document.querySelectorAll('.closebtn').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const panel = closeBtn.closest('#workSidebar, #aboutSidebar');
        if (panel) {
            panel.classList.remove('visible');
            handlePanelVisibilityChange(false);
            
            // Chiudi tutti i film sidebar
            document.querySelectorAll('.film-sidebar').forEach(sidebar => {
                sidebar.classList.remove('visible');
            });
            
            // Ripristina i container direttamente
            showContainers();
            document.querySelector('.main-container')?.classList.remove('blur');
            
            // Rimuovi il blur dalle immagini
            document.querySelectorAll('.grid-container button img').forEach(img => {
                img.style.filter = 'none';
                // Rimuovi eventuali event listener clonando il button
                const button = img.closest('button');
                if (button) {
                    button.replaceWith(button.cloneNode(true));
                }
            });
        }
    });
}); 
 