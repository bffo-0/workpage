// Funzione per chiudere tutte le sidebar e rimuovere il blur dalle immagini
function closeAllSidebars(exceptId) {
  const sidebars = [
    { id: 'mySidebar', video: document.querySelector('.video_0') },
    { id: 'mySidebar2', video: document.querySelector('.video_2') },
    { id: 'mySidebar3', video: document.querySelector('.video3') },
    { id: 'mySidebar4', video: document.querySelector('.video4') },
    { id: 'mySidebar5', video: document.querySelector('.video5') },
    { id: 'mySidebar6', video: document.querySelector('.video6') },
    { id: 'mySidebar7', video: document.querySelector('.video7') }
  ];

  sidebars.forEach(function(sidebar) {
    const sidebarElement = document.getElementById(sidebar.id);
    if (sidebar.id !== exceptId) {
      sidebarElement.style.width = "0vw"; // Chiude la sidebar
      sidebarElement.classList.remove("open"); // Rimuove la classe 'open' per chiudere la sidebar
      if (sidebar.video) {
        sidebar.video.pause(); // Ferma il video associato
        sidebar.video.currentTime = 0; // Riporta il video all'inizio
      }
    }
  });

  // Rimuove l'effetto blur da tutte le immagini
  const images = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
  images.forEach(img => img.classList.remove('blur'));
}

function OpenOrClose(sidebarId, videoSelector) {
  closeAllSidebars(sidebarId); // Chiude le altre sidebar
  const sidebar = document.getElementById(sidebarId);
  const video = document.querySelector(videoSelector);

  // Seleziona tutte le immagini che devono avere l'effetto blur
  const images = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');

  sidebar.classList.toggle("open"); // Apre o chiude la sidebar

  // Controlla la larghezza dello schermo per decidere la larghezza della sidebar
  if (sidebar.classList.contains("open")) {
    if (window.innerWidth >= 786 && window.innerWidth <= 1024) {
      sidebar.style.right="14.4%"
      sidebar.style.width = "78vw"; // Imposta larghezza a 78vw per tablet
      images.forEach(img => img.classList.add('blur'));
    } else if (window.innerWidth <= 1440) {
      sidebar.style.width = "31vw"; // Imposta larghezza a 31vw su schermi <= 1440px
      // Aggiunge l'effetto blur alle immagini solo su schermi <= 1440px
      images.forEach(img => img.classList.add('blur'));
    } else {
      sidebar.style.width = "25vw"; // Imposta larghezza a 25vw su schermi più grandi
    }

    if (video) video.play(); // Fa partire il video se presente
  } else {
    sidebar.style.width = "0vw"; // Torna alla larghezza originale

    // Rimuove l'effetto blur dalle immagini
    images.forEach(img => img.classList.remove('blur'));

    if (video) {
      video.pause();
      video.currentTime = 0; // Riporta il video all'inizio
    }
  }
}



// Funzioni per ciascuna sidebar
function OpenOrClose1() {
  OpenOrClose('mySidebar', '.video_0');
}

function OpenOrClose2() {
  OpenOrClose('mySidebar2', '.video_2');
}

function OpenOrClose3() {
  OpenOrClose('mySidebar3', '.video3');
}

function OpenOrClose4() {
  OpenOrClose('mySidebar4', '.video4');
}

function OpenOrClose5() {
  OpenOrClose('mySidebar5', '.video5');
}
function OpenOrClose6() {
  OpenOrClose('mySidebar6', '.video6');
}
function OpenOrClose7() {
  OpenOrClose('mySidebar7', '.video7');
}

// Aggiungiamo l'evento click sul documento per chiudere le sidebar se si clicca fuori
document.addEventListener('click', function(event) {
  const sidebars = ['mySidebar', 'mySidebar2', 'mySidebar3', 'mySidebar4', 'mySidebar5', 'mySidebar6', 'mySidebar7'];

  // Se il click non avviene su un elemento della sidebar o sui bottoni
  if (!sidebars.some(id => document.getElementById(id).contains(event.target)) &&
      !event.target.closest('button')) {
    closeAllSidebars(); // Chiude tutte le sidebar
    
  }
  
});
