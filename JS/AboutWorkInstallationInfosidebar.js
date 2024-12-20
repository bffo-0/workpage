// Funzione per gestire il blur delle imgmovies
function handleImgMoviesBlur(shouldBlur) {
  if (window.innerWidth <= 1440) {
    const imgmovies = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    imgmovies.forEach(img => {
      if (shouldBlur) {
        img.classList.add('blur');
      } else {
        img.classList.remove('blur');
      }
    });
  }
}

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

    // Aggiunge blur alle imgmovies
    handleImgMoviesBlur(true);

    // Nasconde il contenuto principale e i link
    textContent.classList.add("hide-content");
    aboutLink.style.visibility = "hidden";
    workLink.style.visibility = "hidden";
  } else {
    // Chiude la sidebar "About"
    aboutSidebar.style.left = "-100vw"; // Ripristina la posizione di chiusura della sidebar
    aboutSidebar.style.width = "0"; // Ripristina la larghezza della sidebar a 0 quando è chiusa

    // Rimuove blur dalle imgmovies se nessun'altra sidebar è aperta
    if (workSidebar.style.left === "-100vw") {
      handleImgMoviesBlur(false);
    }

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

    // Aggiunge blur alle imgmovies
    handleImgMoviesBlur(true);

    // Nasconde il contenuto principale e i link
    textContent.classList.add("hide-content");
    aboutLink.style.visibility = "hidden";
    workLink.style.visibility = "hidden";
  } else {
    // Chiude la sidebar "Work"
    workSidebar.style.left = "-100vw"; // Chiude la sidebar

    // Rimuove blur dalle imgmovies se nessun'altra sidebar è aperta
    if (aboutSidebar.style.left === "-100vw") {
      handleImgMoviesBlur(false);
    }

    // Ripristina il contenuto principale e i link
    textContent.classList.remove("hide-content");
    aboutLink.style.visibility = "visible";
    workLink.style.visibility = "visible";
  }
}


// Funzione per aprire e chiudere la sidebar "Installation" e controllare l'audio
function toggleInstallationSidebar() {
  const installationSidebar = document.getElementById("installationSidebar");
  const aboutSidebar = document.getElementById("aboutSidebar");
  const audio = document.getElementById("installation audio");

  // Controlla la larghezza dello schermo
  const screenWidth = window.innerWidth;

  // Logica di apertura/chiusura della sidebar
  if (screenWidth <= 1024) {
    openPosition = "0vw";
  } else if (screenWidth <= 1440) {
    openPosition = "30.7vw";
  } else {
    openPosition = "29.35vw";
  }

  const closedPosition = "-100vw";

  // Controllo lo stato della sidebar "Installation"
  if (installationSidebar.style.left === closedPosition || installationSidebar.style.left === "") {
    // Apre la sidebar "Installation"
    installationSidebar.style.left = openPosition;
    audio.play(); // Avvia l'audio

    // Aggiunge blur alle imgmovies
    handleImgMoviesBlur(true);

    // Per dispositivi fino a 480px, gestisci posizionamento e blur
    if (screenWidth <= 1024) {
      installationSidebar.style.position = 'absolute';
      installationSidebar.style.top = '20px';
      installationSidebar.style.left = '50%';
      installationSidebar.style.transform = 'translateX(-50%)';
      
      aboutSidebar.style.filter = 'blur(20px)';
      
    }
  } else {
    // Chiude la sidebar "Installation"
    installationSidebar.style.left = closedPosition;
    audio.pause(); // Ferma l'audio
    audio.currentTime = 0; // Riporta l'audio all'inizio

    // Rimuove blur dalle imgmovies
    handleImgMoviesBlur(false);

    // Ripristina stato normale per 480px
    if (screenWidth <= 1024) {
      installationSidebar.style.position = '';
      installationSidebar.style.top = '';
      installationSidebar.style.left = '';
      installationSidebar.style.transform = '';
      
      aboutSidebar.style.filter = 'none';
      
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
    const infoSidebars = document.querySelectorAll('.infoSidebar');

    // Non interferire con il clic sull'immagine per aprire la sidebar "Installation"
    if (event.target.classList.contains("sidebar-img")) {
      return;
    }

    // Controlla se il click è avvenuto su una infoSidebar
    let clickedOnInfoSidebar = false;
    infoSidebars.forEach(sidebar => {
      if (sidebar.contains(event.target)) {
        clickedOnInfoSidebar = true;
      }
    });

    // Se il clic è fuori dalla sidebar "About", dal link "About", da installation-sidebar e da infoSidebar, chiudi la sidebar
    if (!aboutSidebar.contains(event.target) && 
        !aboutLink.contains(event.target) && 
        !installationSidebar.contains(event.target) && 
        !clickedOnInfoSidebar) {
      aboutSidebar.style.left = "-100vw";
      
      if (screenWidth <= 1024) {
        aboutSidebar.style.filter = 'none';
      }
    }

    // Se il clic è fuori dalla sidebar "Work", dal link "Work", da installation-sidebar e da infoSidebar, chiudi la sidebar
    if (!workSidebar.contains(event.target) && 
        !workLink.contains(event.target) && 
        !installationSidebar.contains(event.target) && 
        !clickedOnInfoSidebar) {
      workSidebar.style.left = "-100vw";
    }

    // Se il clic è fuori dalla sidebar "Installation", chiudi la sidebar e ferma l'audio
    if (!installationSidebar.contains(event.target)) {
      installationSidebar.style.left = "-100vw";
      audio.pause();
      audio.currentTime = 0;
      
      if (screenWidth <= 1024) {
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
    openPosition = "0vw";
  } else {
    openPosition = "32.2vw";
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
    if (screenWidth <= 1025) {
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
    if (screenWidth <= 1024) {
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
      if (window.innerWidth <= 1024) {
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
  let clickedOnInfoSidebar = false;
  
  allSidebars.forEach(sidebar => {
    if (sidebar.contains(event.target)) {
      clickedOnInfoSidebar = true;
    }
  });

  // Se non abbiamo cliccato su infosidebar
  if (!clickedOnInfoSidebar) {
    allSidebars.forEach(sidebar => {
      // If click is outside sidebar and not on a trigger element
      if (!sidebar.contains(event.target) && !event.target.closest('[data-film]')) {
        sidebar.style.left = "-100vw";
        if (window.innerWidth <= 1024) {
          sidebar.style.position = '';
          sidebar.style.top = '';
          sidebar.style.left = '';
          sidebar.style.transform = '';
          document.getElementById("workSidebar").style.filter = 'none';
        }
      }
    });
  }
});