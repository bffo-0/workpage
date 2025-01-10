// Costanti per le posizioni
const openPosition = "20px";
const closedPosition = "-100vw";

// Funzione per aprire e chiudere la sidebar "About"
function toggleAboutSidebar() {
    const aboutSidebar = document.getElementById("aboutSidebar");
    const workSidebar = document.getElementById("workSidebar");
    const aboutLink = document.getElementById("aboutLink");
    const workLink = document.getElementById("workLink");
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    const screenWidth = window.innerWidth;

    // Imposta la larghezza della sidebar in base alla larghezza dello schermo
    const sidebarWidth = (screenWidth < 599) ? "88vw" : "";
    
    // Controllo lo stato della sidebar "About"
    if (aboutSidebar.style.left === closedPosition || aboutSidebar.style.left === "") {
        // Apre la sidebar "About"
        aboutSidebar.style.left = openPosition;
        aboutSidebar.style.width = sidebarWidth;
        workSidebar.style.left = closedPosition;

        // Nasconde i link e i container
        if (aboutLink) aboutLink.style.visibility = "hidden";
        if (workLink) workLink.style.visibility = "hidden";
        if (infoContainer) infoContainer.style.visibility = "hidden";
        if (navContainer) navContainer.style.visibility = "hidden";

        // Applica il blur alle immagini
        movieImages.forEach(img => {
            img.style.filter = 'blur(20px)';
        });
    } else {
        // Chiude la sidebar "About"
        aboutSidebar.style.left = closedPosition;
        aboutSidebar.style.width = "0";

        // Ripristina i link e i container
        if (aboutLink) aboutLink.style.visibility = "visible";
        if (workLink) workLink.style.visibility = "visible";
        if (infoContainer) infoContainer.style.visibility = "visible";
        if (navContainer) navContainer.style.visibility = "visible";

        // Rimuovi il blur dalle immagini
        movieImages.forEach(img => {
            img.style.filter = 'none';
        });
    }
}

// Funzione per aprire e chiudere la sidebar "Work"
function toggleWorkSidebar() {
    const workSidebar = document.getElementById("workSidebar");
    const aboutSidebar = document.getElementById("aboutSidebar");
    const aboutLink = document.getElementById("aboutLink");
    const workLink = document.getElementById("workLink");
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    const screenWidth = window.innerWidth;

    // Imposta la larghezza per schermi piccoli
    if (screenWidth <= 599) {
        workSidebar.style.width = "88vw";
    }

    // Controlla lo stato della sidebar "Work"
    if (workSidebar.style.left === closedPosition || workSidebar.style.left === "") {
        // Apre la sidebar "Work" e chiude "About"
        workSidebar.style.left = openPosition;
        aboutSidebar.style.left = closedPosition;

        // Nasconde i link e i container
        if (aboutLink) aboutLink.style.visibility = "hidden";
        if (workLink) workLink.style.visibility = "hidden";
        if (infoContainer) infoContainer.style.visibility = "hidden";
        if (navContainer) navContainer.style.visibility = "hidden";

        // Applica il blur alle immagini
        movieImages.forEach(img => {
            img.style.filter = 'blur(20px)';
        });
    } else {
        // Chiude la sidebar "Work"
        workSidebar.style.left = closedPosition;

        // Ripristina i link e i container
        if (aboutLink) aboutLink.style.visibility = "visible";
        if (workLink) workLink.style.visibility = "visible";
        if (infoContainer) infoContainer.style.visibility = "visible";
        if (navContainer) navContainer.style.visibility = "visible";

        // Rimuovi il blur dalle immagini
        movieImages.forEach(img => {
            img.style.filter = 'none';
        });
    }
}

// Event listener per chiudere le sidebar quando si clicca fuori
document.addEventListener('mousedown', function(event) {
    const aboutSidebar = document.getElementById("aboutSidebar");
    const workSidebar = document.getElementById("workSidebar");
    const installationSidebar = document.getElementById("installationSidebar");
    const aboutLink = document.getElementById("aboutLink");
    const workLink = document.getElementById("workLink");
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');

    // Verifica se il click è fuori da tutte le sidebar e dai link
    const isClickOutside = !aboutSidebar.contains(event.target) && 
                          !workSidebar.contains(event.target) && 
                          !installationSidebar.contains(event.target) && 
                          !aboutLink.contains(event.target) && 
                          !workLink.contains(event.target);

    // Se il click è fuori, chiudi tutte le sidebar
    if (isClickOutside) {
        aboutSidebar.style.left = closedPosition;
        workSidebar.style.left = closedPosition;
        installationSidebar.style.left = closedPosition;
        
        // Ripristina i link e i container
        if (aboutLink) aboutLink.style.visibility = "visible";
        if (workLink) workLink.style.visibility = "visible";
        if (infoContainer) infoContainer.style.visibility = "visible";
        if (navContainer) navContainer.style.visibility = "visible";

        // Rimuovi il blur dalle immagini
        movieImages.forEach(img => {
            img.style.filter = 'none';
            img.style.pointerEvents = 'auto';
        });

        // Ferma l'audio se presente
        const audio = document.getElementById("installation audio");
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
});

// Esporta le funzioni
export {
    toggleAboutSidebar,
    toggleWorkSidebar
}; 