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

  // Restore hidden elements if we're on mobile
  if (window.innerWidth <= 1024) {
    const contactForm = document.querySelector('.contact-form');
    const linkContainer = document.querySelector('.links-container');
    const aboutLink = document.querySelector('.about-link');
    const workLink = document.querySelector('.work-link');
    const lightText = document.querySelector('p.light');

    if (contactForm) contactForm.style.visibility = 'visible';
    if (linkContainer) linkContainer.style.visibility = 'visible';
    if (aboutLink) aboutLink.style.visibility = 'visible';
    if (workLink) workLink.style.visibility = 'visible';
    if (lightText) lightText.style.visibility = 'visible';
  }

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
  images.forEach(img => {
    img.style.filter = "none";
    img.classList.remove('blur');
  });
}

// Global variables for double-tap detection (mobile only)
let lastTapTime = 0;
let tapCount = 0;

// Function to handle mobile double-tap
function handleMobileTouch(e, element) {
  if (window.innerWidth <= 785) {
    // Mobile double-tap logic
    const currentTime = Date.now();
    const tapGap = currentTime - lastTapTime;
    
    if (tapGap < 300) {
      tapCount++;
      if (tapCount === 2) {
        // Double tap detected
        e.preventDefault();
        const imgClass = element.className;
        if (imgClass === 'imgmovie') {
          OpenOrClose1();
        } else if (imgClass === 'imgmovie2') {
          OpenOrClose2();
        } else if (imgClass === 'imgmovie3') {
          OpenOrClose3();
        } else if (imgClass === 'imgmovie4') {
          OpenOrClose4();
        } else if (imgClass === 'imgmovie5') {
          OpenOrClose5();
        } else if (imgClass === 'imgmovie6') {
          OpenOrClose6();
        } else if (imgClass === 'imgmovie7') {
          OpenOrClose7();
        }
        tapCount = 0;
      }
    } else {
      tapCount = 1;
    }
    lastTapTime = currentTime;
    return false;
  } else {
    // Desktop behavior - single click
    const imgClass = element.className;
    if (imgClass === 'imgmovie') {
      OpenOrClose1();
    } else if (imgClass === 'imgmovie2') {
      OpenOrClose2();
    } else if (imgClass === 'imgmovie3') {
      OpenOrClose3();
    } else if (imgClass === 'imgmovie4') {
      OpenOrClose4();
    } else if (imgClass === 'imgmovie5') {
      OpenOrClose5();
    } else if (imgClass === 'imgmovie6') {
      OpenOrClose6();
    } else if (imgClass === 'imgmovie7') {
      OpenOrClose7();
    }
    return true;
  }
}

function OpenOrClose(sidebarId, videoSelector) {
  closeAllSidebars(sidebarId); // Chiude le altre sidebar
  const sidebar = document.getElementById(sidebarId);
  const video = document.querySelector(videoSelector);
  const contactForm = document.querySelector('.contact-form');
  const linkContainer = document.querySelector('.links-container');
  const aboutLink = document.querySelector('.about-link');
  const workLink = document.querySelector('.work-link');
  const lightText = document.querySelector('p.light');

  // Seleziona tutte le immagini che devono avere l'effetto blur
  const images = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');

  sidebar.classList.toggle("open"); // Apre o chiude la sidebar

  // Controlla la larghezza dello schermo per decidere la larghezza della sidebar
  if (sidebar.classList.contains("open")) {
    if (window.innerWidth < 1026) {
      // Mobile view
      sidebar.style.width = "89.7vw";
      sidebar.style.right = "10%";
      sidebar.style.display = "block";
      if (contactForm) contactForm.style.visibility = 'hidden';
      if (linkContainer) linkContainer.style.visibility = 'hidden';
      if (aboutLink) aboutLink.style.visibility = 'hidden';
      if (workLink) workLink.style.visibility = 'hidden';
      if (lightText) lightText.style.visibility = 'hidden';
      images.forEach(img => img.style.filter = "blur(5px)");
    } else if (window.innerWidth >= 786 && window.innerWidth <= 1024) {
      // Tablet view
      sidebar.style.right="14.4%"
      sidebar.style.width = "78vw";
      images.forEach(img => img.style.filter = "blur(5px)");
    } else if (window.innerWidth <= 1440) {
      // Small desktop
      sidebar.style.width = "31vw";
    } else {
      // Large desktop
      sidebar.style.width = "25vw";
    }

    if (video) video.play(); // Fa partire il video se presente
  } else {
    if (window.innerWidth < 1025) {
      sidebar.style.width = "0";
      sidebar.style.display = "none";
      if (contactForm) contactForm.style.visibility = 'visible';
      if (linkContainer) linkContainer.style.visibility = 'visible';
      if (aboutLink) aboutLink.style.visibility = 'visible';
      if (workLink) workLink.style.visibility = 'visible';
      if (lightText) lightText.style.visibility = 'visible';
      images.forEach(img => img.style.filter = "none");
    } else {
      sidebar.style.width = "0vw";
      images.forEach(img => img.style.filter = "none");
    }

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
  const sidebars = ['mySidebar', 'mySidebar3', 'mySidebar6', 'mySidebar7'];

  // Se il click non avviene su un elemento della sidebar o sui bottoni
  if (!sidebars.some(id => document.getElementById(id).contains(event.target)) &&
      !event.target.closest('button')) {
    closeAllSidebars(); // Chiude tutte le sidebar
    
  }
  
});

// Aggiungiamo l'evento touchstart per gestire il double-tap su dispositivi mobili
document.addEventListener('touchstart', function(event) {
  if (event.target.classList.contains('imgmovie') || event.target.classList.contains('imgmovie2') || event.target.classList.contains('imgmovie3') || event.target.classList.contains('imgmovie4') || event.target.classList.contains('imgmovie5') || event.target.classList.contains('imgmovie6') || event.target.classList.contains('imgmovie7')) {
    handleMobileTouch(event, event.target);
  }
});
