// Aggiungi queste costanti all'inizio del file, prima delle funzioni
const openPosition = "20px";
const installationOpenPosition = "320px";
const closedPosition = "-100vw";

// Esportiamo le funzioni esistenti
export { 
    toggleAboutSidebar,
    toggleWorkSidebar,
    toggleInstallationSidebar,
    toggleFilmInfoSidebar
};

// Funzione per aprire e chiudere la sidebar "About"
function toggleAboutSidebar() {
  const aboutSidebar = document.getElementById("aboutSidebar");
  const workSidebar = document.getElementById("workSidebar");
  const textContent = document.getElementById("textContent");
  const aboutLink = document.getElementById("aboutLink");
  const workLink = document.getElementById("workLink");
  const screenWidth = window.innerWidth;
  

  // Imposta la larghezza della sidebar in base alla larghezza dello schermo
  const sidebarWidth = (screenWidth < 599) ? "88vw" : ""; // 34vw per schermi più piccoli, altrimenti usa il valore predefinito
 
  
  // Controllo lo stato della sidebar "About"
  if (aboutSidebar.style.left === "-100vw" || aboutSidebar.style.left === "") {
    // Apre la sidebar "About" con margine da sinistra di 20px
    aboutSidebar.style.left = "20px"; // Imposta la posizione a 20px da sinistra
    aboutSidebar.style.width = sidebarWidth; // Imposta la larghezza della sidebar
    workSidebar.style.left = "-100vw"; // Chiude la sidebar "Work"

    // Nasconde il contenuto principale e i link
    textContent.classList.add("hide-content");
    aboutLink.style.visibility = "hidden";
    workLink.style.visibility = "hidden";
  } else {
    // Chiude la sidebar "About"
    aboutSidebar.style.left = "-100vw"; // Ripristina la posizione di chiusura della sidebar
    aboutSidebar.style.width = "0"; // Ripristina la larghezza della sidebar a 0 quando è chiusa

    // Ripristina il contenuto principale e i link
    textContent.classList.remove("hide-content");
    aboutLink.style.visibility = "visible";
    workLink.style.visibility = "visible";
  }
}

  // Funzione per aprire e chiudere la sidebar "Work"
function toggleWorkSidebar() {
  const workSidebar = document.getElementById("workSidebar");
  const aboutSidebar = document.getElementById("aboutSidebar");
  const textContent = document.getElementById("textContent");
  const aboutLink = document.getElementById("aboutLink");
  const workLink = document.getElementById("workLink");
  const screenWidth = window.innerWidth;

  // Controlla se lo schermo è a 599px o meno e imposta la larghezza solo in quel caso
  if (window.innerWidth <= 599) {
    workSidebar.style.width = "88vw"; // Larghezza per schermi piccoli
  }

  // Controlla lo stato della sidebar "Work" per aprirla o chiuderla
  if (workSidebar.style.left === "-100vw" || workSidebar.style.left === "") {
    // Apre la sidebar "Work" e chiude "About" se aperta
    workSidebar.style.left = "20px";
    aboutSidebar.style.left = "-100vw";

    // Nasconde il contenuto principale e i link
    textContent.classList.add("hide-content");
    aboutLink.style.visibility = "hidden";
    workLink.style.visibility = "hidden";
  } else {
    // Chiude la sidebar "Work"
    workSidebar.style.left = "-100vw"; // Chiude la sidebar

    // Ripristina il contenuto principale e i link
    textContent.classList.remove("hide-content");
    aboutLink.style.visibility = "visible";
    workLink.style.visibility = "visible";
  }
}


// Funzione per aprire e chiudere la sidebar "Installation"
function toggleInstallationSidebar() {
  const aboutSidebar = document.getElementById("aboutSidebar");
  const installationSidebar = document.getElementById("installationSidebar");
  const screenWidth = window.innerWidth;

  // Calcola la posizione in base alla about sidebar
  const aboutSidebarRect = aboutSidebar.getBoundingClientRect();
  const newPosition = aboutSidebarRect.right + 20 + "px"; // 20px di spazio tra le sidebar

  // Se la sidebar è già aperta, chiudila
  if (installationSidebar.style.left === newPosition) {
    installationSidebar.style.left = closedPosition;
    
    // Reset stili mobile
    if (screenWidth <= 785) {
      installationSidebar.style.position = '';
      installationSidebar.style.top = '';
      installationSidebar.style.transform = '';
      document.getElementById("workSidebar").style.filter = 'none';
    }
  } else {
    // Apri la sidebar nella nuova posizione
    installationSidebar.style.left = newPosition;
    
    // Stili mobile
    if (screenWidth <= 785) {
      installationSidebar.style.position = 'absolute';
      installationSidebar.style.top = '20px';
      installationSidebar.style.left = '50%';
      installationSidebar.style.transform = 'translateX(-50%)';
      document.getElementById("workSidebar").style.filter = 'blur(20px)';
    }
  }
}

  // Funzione per chiudere le sidebar e ripristinare la visibilità degli elementi al clic fuori
  document.addEventListener('click', function (event) {
    const aboutSidebar = document.getElementById("aboutSidebar");
    const workSidebar = document.getElementById("workSidebar");
    const installationSidebar = document.getElementById("installationSidebar");
    const textContent = document.getElementById("textContent");
    const aboutLink = document.getElementById("aboutLink");
    const workLink = document.getElementById("workLink");
    const audio = document.getElementById("installation audio");
    const screenWidth = window.innerWidth;

    // Non interferire con il clic sull'immagine per aprire la sidebar "Installation"
    if (event.target.classList.contains("sidebar-img")) {
      return; // Non fare nulla se il clic è sull'immagine
    }

    // Se il clic è fuori dalla sidebar "About" e dal link "About", chiudi la sidebar
    if (!aboutSidebar.contains(event.target) && !aboutLink.contains(event.target)) {
      aboutSidebar.style.left = "-100vw"; // Chiude la sidebar
      
      // Per dispositivi fino a 480px, rimuovi blur
      if (screenWidth <= 785) {
        aboutSidebar.style.filter = 'none';
      }
    }

    // Se il clic è fuori dalla sidebar "Work" e dal link "Work", chiudi la sidebar
    if (!workSidebar.contains(event.target) && !workLink.contains(event.target)) {
      workSidebar.style.left = "-100vw"; // Chiude la sidebar
    }

    // Se il clic è fuori dalla sidebar "Installation", chiudi la sidebar e ferma l'audio
    if (!installationSidebar.contains(event.target)) {
      installationSidebar.style.left = "-100vw"; // Chiude la sidebar
      audio.pause(); // Ferma l'audio
      audio.currentTime = 0; // Riporta l'audio all'inizio
      
      // Per dispositivi fino a 480px, rimuovi blur
      if (screenWidth <= 785) {
        aboutSidebar.style.filter = 'none';
      }
    }

    // Ripristina il contenuto principale e i link se tutte le sidebar sono chiuse
    if (aboutSidebar.style.left === "-100vw" && workSidebar.style.left === "-100vw" && installationSidebar.style.left === "-100vw") {
      textContent.classList.remove("hide-content"); // Ripristina il contenuto principale
      aboutLink.style.visibility = "visible"; // Rendi visibile il link "About"
      workLink.style.visibility = "visible"; // Rendi visibile il link "Work"
    }
  });
  
 // Funzione per aprire e chiudere la sidebar "Film Info"
function toggleFilmInfoSidebar(element) {
  const filmId = element.getAttribute("data-film");

  const targetSidebar = document.getElementById(filmId);

  const workSidebar = document.getElementById("workSidebar");
  const screenWidth = window.innerWidth;

  let openPosition;
  if (screenWidth <= 785) {
    openPosition = "0vw";
  } else if (screenWidth <= 1024) {
    openPosition = "30.5vw";
  } else {
    openPosition = "30.5vw";
  }

  const closedPosition = "-100vw";

  // Close all other sidebars
  const allSidebars = document.querySelectorAll('.infoSidebar');
  allSidebars.forEach(sidebar => {
    if (sidebar !== targetSidebar) {
      sidebar.style.left = closedPosition;
    }
  });

  // Check if sidebar is already open
  if (targetSidebar.style.left === openPosition) {
    // Close sidebar
    targetSidebar.style.left = closedPosition;
    
    // Remove blur for mobile
    if (screenWidth <= 785) {
      targetSidebar.style.position = '';
      targetSidebar.style.top = '';
      targetSidebar.style.left = '';
      targetSidebar.style.transform = '';
      workSidebar.style.filter = 'none';
    }
  } else {
    // Open sidebar
    targetSidebar.style.left = openPosition;
    
    // Add blur for mobile
    if (screenWidth <= 785) {
      targetSidebar.style.position = 'absolute';
      targetSidebar.style.top = '20px';
      targetSidebar.style.left = '50%';
      targetSidebar.style.transform = 'translateX(-50%)';
      workSidebar.style.filter = 'blur(20px)';
    }
  }
}

// Update close button handler
document.querySelectorAll('.infoSidebar .closebtn').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.stopPropagation();
    const sidebar = this.closest('.infoSidebar');
    if (sidebar) {
      sidebar.style.left = "-100vw";
      if (window.innerWidth <= 785) {
        sidebar.style.position = '';
        sidebar.style.top = '';
        sidebar.style.left = '';
        sidebar.style.transform = '';
        document.getElementById("workSidebar").style.filter = 'none';
      }
    }
  });
});

// Close sidebars when clicking outside
document.addEventListener('click', function(event) {
  const allSidebars = document.querySelectorAll('.infoSidebar');
  allSidebars.forEach(sidebar => {
    // If click is outside sidebar and not on a trigger element
    if (!sidebar.contains(event.target) && !event.target.closest('[data-film]')) {
      sidebar.style.left = "-100vw";
      if (window.innerWidth <= 785) {
        sidebar.style.position = '';
        sidebar.style.top = '';
        sidebar.style.left = '';
        sidebar.style.transform = '';
        document.getElementById("workSidebar").style.filter = 'none';
      }
    }
  });
});

// Funzioni per aprire/chiudere le sidebar dei film
function OpenOrClose1(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.right === OPEN_POSITION) {
        // Chiudi la sidebar
        sidebar.style.right = CLOSED_POSITION;
        sidebar.style.opacity = "0";
    } else {
        // Chiudi tutte le altre sidebar prima
        closeAllSidebars();
        // Apri questa sidebar
        sidebar.style.right = OPEN_POSITION;
        sidebar.style.opacity = "1";
        sidebar.style.display = "block";  // Assicurati che sia visibile
    }
}

// Funzioni per ogni sidebar (2-7)
function OpenOrClose2(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

function OpenOrClose3(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

function OpenOrClose4(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

function OpenOrClose5(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

function OpenOrClose6(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

function OpenOrClose7(sidebarId) {
    const sidebar = document.getElementById(sidebarId);
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        closeAllSidebars();
        sidebar.style.display = "block";
    }
}

// Funzione helper per chiudere tutte le sidebar
function closeAllSidebars() {
    const sidebars = [
        'mySidebar', 'mySidebar2', 'mySidebar3', 
        'mySidebar4', 'mySidebar5', 'mySidebar6', 
        'mySidebar7'
    ];
    
    sidebars.forEach(sidebarId => {
        const sidebar = document.getElementById(sidebarId);
        if (sidebar) {
            sidebar.style.right = CLOSED_POSITION;
            sidebar.style.opacity = "0";
        }
    });
}

// Event listener per chiudere le sidebar cliccando fuori
document.addEventListener('click', function(event) {
    if (!event.target.closest('.sidebar') && 
        !event.target.closest('.openbtn') && 
        !event.target.closest('.imgmovie')) {
        closeAllSidebars();
    }
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
    closeAllSidebars
};