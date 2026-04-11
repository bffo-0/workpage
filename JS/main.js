// ==================== main.js - VERSIONE DEFINITIVA ====================
import { siteData } from './data.js';

// -------------------- DATI GLOBALI --------------------
const SIDEBAR_IDS = ['mySidebar6', 'mySidebar', 'mySidebar3', 'mySidebar7', 'mySidebar5', 'mySidebar4', 'mySidebar2'];

// -------------------- UTILITY --------------------
function isMobile() {
    return window.innerWidth <= 480;
}

function stopAllVideos() {
    document.querySelectorAll('.Sidebar video, .video-panel video').forEach(video => {
        if (video) { video.pause(); video.currentTime = 0; }
    });
}

function closeAllVideoSidebars() {
    SIDEBAR_IDS.forEach(id => {
        const sidebar = document.getElementById(id);
        if (sidebar) {
            sidebar.classList.remove('open');
            const video = sidebar.querySelector('video');
            if (video) { video.pause(); video.currentTime = 0; }
        }
    });
}

function isVideoSidebarOpen(id) {
    const s = document.getElementById(id);
    return s && s.classList.contains('open');
}

function getCurrentVideoIndex() {
    return SIDEBAR_IDS.findIndex(id => isVideoSidebarOpen(id));
}

function updateNavButtons(index) {
    const isFirst = index === 0;
    const isLast = index === SIDEBAR_IDS.length - 1;
    document.querySelectorAll('.prev-movie').forEach(btn => {
        btn.style.opacity = isFirst ? '0.5' : '1';
        btn.style.pointerEvents = isFirst ? 'none' : 'auto';
    });
    document.querySelectorAll('.next-movie').forEach(btn => {
        btn.style.opacity = isLast ? '0.5' : '1';
        btn.style.pointerEvents = isLast ? 'none' : 'auto';
    });
}

// -------------------- APERTURA SIDEBAR VIDEO --------------------
function openVideoSidebar(id) {
    const sidebar = document.getElementById(id);
    if (!sidebar) return;

    SIDEBAR_IDS.forEach(otherId => {
        const other = document.getElementById(otherId);
        if (other && other !== sidebar && other.classList.contains('open')) {
            other.classList.remove('open');
            const otherVideo = other.querySelector('video');
            if (otherVideo) {
                otherVideo.pause();
                otherVideo.currentTime = 0;
            }
        }
    });

    sidebar.classList.add('open');
    const video = sidebar.querySelector('video');
    if (video) video.play().catch(e => console.log('Autoplay bloccato'));

    const idx = SIDEBAR_IDS.indexOf(id);
    updateNavButtons(idx);
}
window.openVideoSidebar = openVideoSidebar;

function closeVideoSidebar(id) {
    const sidebar = document.getElementById(id);
    if (sidebar) {
        sidebar.classList.remove('open');
        const video = sidebar.querySelector('video');
        if (video) { video.pause(); video.currentTime = 0; }
    }
}
window.closeVideoSidebar = closeVideoSidebar;

function navigateVideo(direction) {
    const currentIdx = getCurrentVideoIndex();
    if (currentIdx === -1) return;
    const newIdx = currentIdx + direction;
    if (newIdx >= 0 && newIdx < SIDEBAR_IDS.length) {
        openVideoSidebar(SIDEBAR_IDS[newIdx]);
    }
}
window.navigateVideo = navigateVideo;

// -------------------- SINCRONIZZAZIONE POSIZIONI --------------------
function syncPanels() {
    const about = document.getElementById('aboutSidebar');
    const work = document.getElementById('workSidebar');
    const install = document.getElementById('installationSidebar');
    const title = document.querySelector('.title-container');

    if (!title) return;
    let titleWidth = title.offsetWidth;
    
    // Limita la larghezza massima a 450px
    if (titleWidth > 450) titleWidth = 450;
    
    const leftBase = 30;

    if (about) about.style.width = titleWidth + 'px';
    if (work) work.style.width = titleWidth + 'px';
    if (install) install.style.width = titleWidth + 'px';
    
    document.querySelectorAll('.film-sidebar').forEach(film => {
        film.style.width = titleWidth + 'px';
    });

    let mainPanel = null;
    if (work?.classList.contains('visible')) mainPanel = work;
    else if (about?.classList.contains('visible')) mainPanel = about;

    const mainWidth = mainPanel ? mainPanel.offsetWidth : 0;

    if (install) {
        if (mainPanel && install.classList.contains('visible')) {
            install.style.left = (leftBase + mainWidth) + 'px';
        } else {
            install.style.left = leftBase + 'px';
        }
    }

    document.querySelectorAll('.film-sidebar.visible').forEach(film => {
        if (mainPanel) {
            film.style.left = (leftBase + mainWidth) + 'px';
        } else {
            film.style.left = leftBase + 'px';
        }
    });
}


function syncAfterToggle() {
    setTimeout(syncPanels, 50);
}

// -------------------- TOGGLE PER FILM INFO --------------------
function toggleFilmInfoSidebar(filmId) {
    const panel = document.getElementById(filmId);
    if (!panel) return;
    const isOpening = !panel.classList.contains('visible');
    document.querySelectorAll('.film-sidebar').forEach(s => {
        if (s.id !== filmId) s.classList.remove('visible');
    });
    if (isOpening) {
        panel.classList.add('visible');
        syncPanels();
    } else {
        panel.classList.remove('visible');
        syncAfterToggle();
    }
}
window.toggleFilmInfoSidebar = toggleFilmInfoSidebar;

// -------------------- PANNELLI PRINCIPALI --------------------
function hideMainContainers() {
    document.querySelector('.info-container')?.classList.add('hidden');
    document.querySelector('.nav-container')?.classList.add('hidden');
}

function showMainContainers() {
    document.querySelector('.info-container')?.classList.remove('hidden');
    document.querySelector('.nav-container')?.classList.remove('hidden');
}

function stopInstallationAudio() {
    const audio = document.querySelector('#installationSidebar audio');
    if (audio) { audio.pause(); audio.currentTime = 0; }
}

function closeAllMainPanels() {
    document.getElementById('aboutSidebar')?.classList.remove('visible');
    document.getElementById('workSidebar')?.classList.remove('visible');
    document.getElementById('installationSidebar')?.classList.remove('visible');
    document.querySelectorAll('.film-sidebar').forEach(s => s.classList.remove('visible'));
    stopInstallationAudio();
    showMainContainers();
}

function toggleAboutSidebar() {
    const panel = document.getElementById('aboutSidebar');
    if (!panel) return;
    const isOpening = !panel.classList.contains('visible');

    if (isOpening) {
        document.getElementById('workSidebar')?.classList.remove('visible');
        document.querySelectorAll('.film-sidebar').forEach(s => s.classList.remove('visible'));
        panel.classList.add('visible');
        hideMainContainers();
    } else {
        panel.classList.remove('visible');
        const installOpen = document.getElementById('installationSidebar')?.classList.contains('visible');
        if (!installOpen) showMainContainers();
    }
    syncAfterToggle();
}

function toggleWorkSidebar() {
    const panel = document.getElementById('workSidebar');
    if (!panel) return;
    const isOpening = !panel.classList.contains('visible');

    if (isOpening) {
        document.getElementById('aboutSidebar')?.classList.remove('visible');
        document.querySelectorAll('.film-sidebar').forEach(s => s.classList.remove('visible'));
        panel.classList.add('visible');
        hideMainContainers();
    } else {
        panel.classList.remove('visible');
        const installOpen = document.getElementById('installationSidebar')?.classList.contains('visible');
        const aboutOpen = document.getElementById('aboutSidebar')?.classList.contains('visible');
        if (!installOpen && !aboutOpen) showMainContainers();
    }
    syncAfterToggle();
}

function toggleInstallationSidebar() {
    const panel = document.getElementById('installationSidebar');
    if (!panel) return;
    const isOpening = !panel.classList.contains('visible');

    if (isOpening) {
        document.getElementById('workSidebar')?.classList.remove('visible');
        document.querySelectorAll('.film-sidebar').forEach(s => s.classList.remove('visible'));
        panel.classList.add('visible');
        hideMainContainers();
        const audio = panel.querySelector('audio');
        if (audio) audio.play().catch(e => console.log('Auto-play blocked'));
    } else {
        panel.classList.remove('visible');
        stopInstallationAudio();
        const aboutOpen = document.getElementById('aboutSidebar')?.classList.contains('visible');
        if (!aboutOpen) showMainContainers();
    }
    syncAfterToggle();
}

// -------------------- GENERAZIONE DINAMICA DOM --------------------
function generateWorksList() {
    const worksList = document.getElementById('works-list');
    if (!worksList || !siteData.works) return;

    siteData.works.forEach((work, idx) => {
        const p = document.createElement('p');
        p.className = `aligned-text${idx + 1}`;
        p.setAttribute('data-film', work.id);
        p.style.cursor = 'pointer';
        p.innerHTML = `
            <i class="${work.icon}"></i>
            <span class="highlighted-text${idx + 1}">${work.title}</span>
            <span class="right-align${idx + 1}">${work.year}</span>
        `;
        p.addEventListener('click', () => toggleFilmInfoSidebar(work.id));
        worksList.appendChild(p);
    });
}

function generateFilmSidebars() {
    const container = document.getElementById('film-info-container');
    if (!container || !siteData.filmInfo) return;

    Object.keys(siteData.filmInfo).forEach(filmId => {
        const film = siteData.filmInfo[filmId];
        const sidebar = document.createElement('div');
        sidebar.id = filmId;
        sidebar.className = 'film-sidebar';
        sidebar.innerHTML = `
            <span class="closebtn" data-film-close="${filmId}">×</span>
            <div class="film-container">
                <div class="film-content">
                    ${film.image ? `<img src="${film.image}" alt="${film.title}" class="${film.imageClass || 'film-img'}">` : ''}
                    <div class="film-content-title"><h2>${film.title}</h2></div>
                    <div class="film-content-info">
                        ${film.info.map(line => `<p>${line}</p>`).join('')}
                    </div>
                    ${film.link ? `<p><a href="${film.link}" target="_blank">More info →</a></p>` : ''}
                </div>
            </div>
        `;
        container.appendChild(sidebar);
        sidebar.querySelector('.closebtn')?.addEventListener('click', () => {
            sidebar.classList.remove('visible');
            syncAfterToggle();
        });
    });
}

function generateGridThumbnails() {
    const gridContainer = document.getElementById('grid-container');
    if (!gridContainer || !siteData.grid) return;

    siteData.grid.forEach(item => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.id = item.id;
        div.innerHTML = `<img src="${item.image}" alt="${item.alt}" loading="lazy">`;
        const img = div.querySelector('img');
        img.addEventListener('click', () => openVideoSidebar(item.videoId));
        gridContainer.appendChild(div);
    });
}

function generateVideoSidebars() {
    const container = document.getElementById('video-sidebars-container');
    if (!container || !siteData.videoSidebars) return;

    Object.keys(siteData.videoSidebars).forEach(key => {
        const data = siteData.videoSidebars[key];
        const sidebar = document.createElement('div');
        sidebar.id = key;
        sidebar.className = 'Sidebar';
        sidebar.innerHTML = `
            <div class="movie-header">
                <a href="javascript:void(0)" class="closebtn" onclick="closeVideoSidebar('${key}')">×</a>
                <a href="${data.titleLink}" target="_blank" class="Title">${data.title}</a>
            </div>
            <div class="sidebar-nav">
                <div class="nav-arrow-container"><span class="nav-arrow prev-movie">←</span></div>
                <div class="nav-arrow-container"><span class="nav-arrow next-movie">→</span></div>
            </div>
            <div class="movie-content">
                <video src="${data.videoSrc}" controls preload="none"></video>
                <div class="linemovie"></div>
                <p class="InfoMovie">${data.description}</p>
                ${data.bandcamp ? `
                    <div class="linemovie"></div>
                    <iframe src="${data.bandcamp.src}" style="${data.bandcamp.style}" seamless></iframe>
                ` : ''}
            </div>
        `;
        container.appendChild(sidebar);
    });
}

// -------------------- EVENTI E INIT --------------------
function initEventListeners() {
    const navAbout = document.querySelector('.nav-link[data-panel="about"]');
    const navWork = document.querySelector('.nav-link[data-panel="work"]');

    if (navAbout) {
        navAbout.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAboutSidebar();
        });
    }
    if (navWork) {
        navWork.addEventListener('click', (e) => {
            e.preventDefault();
            toggleWorkSidebar();
        });
    }

    document.querySelector('#aboutSidebar .closebtn')?.addEventListener('click', () => {
        closeAllMainPanels();
        syncAfterToggle();
    });
    document.querySelector('#workSidebar .closebtn')?.addEventListener('click', () => {
        closeAllMainPanels();
        syncAfterToggle();
    });
    document.querySelector('#installationSidebar .closebtn')?.addEventListener('click', () => {
        toggleInstallationSidebar();
        syncAfterToggle();
    });
    document.querySelector('.installation-image-container')?.addEventListener('click', () => {
        toggleInstallationSidebar();
        syncAfterToggle();
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev-movie')) navigateVideo(-1);
        else if (e.target.classList.contains('next-movie')) navigateVideo(1);
    });

    document.addEventListener('click', (e) => {
        const inside = e.target.closest('.panel, .Sidebar, .film-sidebar, .nav-link, .installation-image-container, .closebtn, .grid-item');
        if (!inside) {
            closeAllMainPanels();
            closeAllVideoSidebars();
            syncAfterToggle();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllMainPanels();
            closeAllVideoSidebars();
            syncAfterToggle();
        }
    });

    const msg = document.querySelector('.hover-message');
    if (msg) {
        msg.textContent = 'Click on the images to watch the movies';
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 5000);
    }
}

function preloadCriticalImages() {
    if (!siteData.grid) return;
    siteData.grid.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

function initMobileCarousel() {
    if (!isMobile()) return;
    const grid = document.querySelector('.grid-container');
    if (!grid || typeof Swiper === 'undefined') return;

    grid.classList.add('swiper');
    const items = Array.from(grid.querySelectorAll('.grid-item'));
    const wrapper = document.createElement('div');
    wrapper.className = 'swiper-wrapper';

    items.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.appendChild(item);
        wrapper.appendChild(slide);
    });
    grid.appendChild(wrapper);

    new Swiper('.grid-container.swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: { rotate: 25, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
        loop: false
    });
}

// -------------------- START --------------------
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sito inizializzato');
    generateWorksList();
    generateFilmSidebars();
    generateGridThumbnails();
    generateVideoSidebars();
    initEventListeners();
    preloadCriticalImages();
    initMobileCarousel();

    syncPanels();
    window.addEventListener('resize', () => setTimeout(syncPanels, 100));
});