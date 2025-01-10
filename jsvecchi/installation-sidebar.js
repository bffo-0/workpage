// Costanti per le posizioni
const installationOpenPosition = "320px";
const closedPosition = "-100vw";

// Funzione per aprire e chiudere la sidebar "Installation"
function toggleInstallationSidebar() {
    const installationSidebar = document.getElementById("installationSidebar");
    const aboutSidebar = document.getElementById("aboutSidebar");
    const audio = document.getElementById("installation audio");
    const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    const screenWidth = window.innerWidth;

    // Se la sidebar è già aperta, chiudila
    if (installationSidebar.style.left !== closedPosition && installationSidebar.style.left !== "") {
        installationSidebar.style.left = closedPosition;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        // Riabilita l'hover sulle immagini
        movieImages.forEach(img => {
            img.style.pointerEvents = 'auto';
        });
    } else {
        // Apri la sidebar mantenendo about-sidebar aperta
        const aboutSidebarRect = aboutSidebar.getBoundingClientRect();
        installationSidebar.style.left = aboutSidebarRect.right + 20 + "px";
        
        // Non modifichiamo la posizione di about-sidebar
        // aboutSidebar.style.left rimane invariato
        
        if (audio) {
            audio.play();
        }

        // Disabilita l'hover sulle immagini
        movieImages.forEach(img => {
            img.style.pointerEvents = 'none';
        });
    }
}

// Funzione per aprire e chiudere la sidebar "Film Info"
function toggleFilmInfoSidebar(element) {
    // Se l'elemento è una stringa (closebtn), chiudi la sidebar corrente
    if (typeof element === 'string') {
        const sidebar = document.querySelector('.infoSidebar[style*="left: 0"], .infoSidebar[style*="left: 30.5vw"]');
        if (sidebar) {
            sidebar.style.left = closedPosition;
            document.getElementById("workSidebar").style.filter = 'none';
        }
        return;
    }

    const filmId = element.getAttribute("data-film");
    const targetSidebar = document.getElementById(filmId);
    const workSidebar = document.getElementById("workSidebar");
    const screenWidth = window.innerWidth;

    let openPosition;
    if (screenWidth <= 785) {
        openPosition = "0vw";
    } else {
        openPosition = "30.5vw";
    }

    // Close all other sidebars
    const allSidebars = document.querySelectorAll('.infoSidebar');
    allSidebars.forEach(sidebar => {
        if (sidebar !== targetSidebar) {
            sidebar.style.left = closedPosition;
        }
    });

    // Check if sidebar is already open
    if (targetSidebar.style.left === openPosition) {
        targetSidebar.style.left = closedPosition;
        
        if (screenWidth <= 785) {
            targetSidebar.style.position = '';
            targetSidebar.style.top = '';
            targetSidebar.style.left = '';
            targetSidebar.style.transform = '';
            workSidebar.style.filter = 'none';
        }
    } else {
        targetSidebar.style.left = openPosition;
        
        if (screenWidth <= 785) {
            targetSidebar.style.position = 'absolute';
            targetSidebar.style.top = '20px';
            targetSidebar.style.left = '50%';
            targetSidebar.style.transform = 'translateX(-50%)';
            workSidebar.style.filter = 'blur(20px)';
        }
    }
}

export {
    toggleInstallationSidebar,
    toggleFilmInfoSidebar
}; 