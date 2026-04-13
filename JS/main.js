import { siteData } from './data.js';

const SIDEBAR_IDS = ['mySidebar6', 'mySidebar', 'mySidebar3', 'mySidebar7', 'mySidebar5', 'mySidebar4', 'mySidebar2'];

/* ==================== UTILITY ==================== */

function isMobile() {
  return window.innerWidth <= 480;
}

function stopAllVideos() {
  document.querySelectorAll('.Sidebar video, .video-panel video').forEach((video) => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
}

function closeAllVideoSidebars() {
  SIDEBAR_IDS.forEach((id) => {
    const sidebar = document.getElementById(id);
    if (!sidebar) return;

    sidebar.classList.remove('open');
    const video = sidebar.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  });
}

function isVideoSidebarOpen(id) {
  const sidebar = document.getElementById(id);
  return !!(sidebar && sidebar.classList.contains('open'));
}

function getCurrentVideoIndex() {
  return SIDEBAR_IDS.findIndex((id) => isVideoSidebarOpen(id));
}

function updateNavButtons(index) {
  const isFirst = index === 0;
  const isLast = index === SIDEBAR_IDS.length - 1;

  document.querySelectorAll('.prev-movie').forEach((btn) => {
    btn.style.opacity = isFirst ? '0.5' : '1';
    btn.style.pointerEvents = isFirst ? 'none' : 'auto';
  });

  document.querySelectorAll('.next-movie').forEach((btn) => {
    btn.style.opacity = isLast ? '0.5' : '1';
    btn.style.pointerEvents = isLast ? 'none' : 'auto';
  });
}

/* ==================== VIDEO SIDEBARS ==================== */

function openVideoSidebar(id) {
  const sidebar = document.getElementById(id);
  if (!sidebar) return;

  SIDEBAR_IDS.forEach((otherId) => {
    const other = document.getElementById(otherId);
    if (!other || other === sidebar || !other.classList.contains('open')) return;

    other.classList.remove('open');
    const otherVideo = other.querySelector('video');
    if (otherVideo) {
      otherVideo.pause();
      otherVideo.currentTime = 0;
    }
  });

  sidebar.classList.add('open');

  const video = sidebar.querySelector('video');
  if (video) video.play().catch(() => {});

  const idx = SIDEBAR_IDS.indexOf(id);
  updateNavButtons(idx);
}
window.openVideoSidebar = openVideoSidebar;

function closeVideoSidebar(id) {
  const sidebar = document.getElementById(id);
  if (!sidebar) return;

  sidebar.classList.remove('open');
  const video = sidebar.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
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

/* ==================== PANEL SYNC ==================== */

function syncPanels() {
  const about = document.getElementById('aboutSidebar');
  const work = document.getElementById('workSidebar');
  const install = document.getElementById('installationSidebar');
  const title = document.querySelector('.title-container');

  if (!title) return;

  const rootStyles = getComputedStyle(document.documentElement);
  const panelMaxWidth = parseFloat(rootStyles.getPropertyValue('--panel-max-width')) || 450;
  const titleWidth = Math.min(title.getBoundingClientRect().width, panelMaxWidth);

  const mainContainer = document.querySelector('.main-container');
  const leftBase = mainContainer ? Math.round(mainContainer.getBoundingClientRect().left) : 28;
  const gap = 8;
  const viewportPadding = 16;
  const fallbackTop = window.innerWidth <= 1366 ? 80 : 100;

  if (about) about.style.width = `${titleWidth}px`;
  if (work) work.style.width = `${titleWidth}px`;

  document.querySelectorAll('.film-sidebar').forEach((film) => {
    film.style.width = `${titleWidth}px`;
  });

  let mainPanel = null;
  if (work?.classList.contains('visible')) mainPanel = work;
  else if (about?.classList.contains('visible')) mainPanel = about;

  const mainWidth = mainPanel ? mainPanel.getBoundingClientRect().width : 0;
  const secondLeft = leftBase + mainWidth + (mainWidth > 0 ? gap : 0);

  let visibleFilmSidebar = null;

  document.querySelectorAll('.film-sidebar.visible').forEach((film) => {
    visibleFilmSidebar = film;
    film.style.left = mainPanel ? `${secondLeft}px` : `${leftBase}px`;
  });

  if (!install) return;

  install.classList.remove('overlay-on-film');

  if (!install.classList.contains('visible')) {
    install.style.left = `${leftBase}px`;
    install.style.top = `${fallbackTop}px`;
    return;
  }

  const installRect = install.getBoundingClientRect();
  const installWidth = installRect.width || install.offsetWidth || 420;
  const installHeight = installRect.height || install.offsetHeight || 420;

  const minTop = fallbackTop;
  const maxTop = window.innerHeight - installHeight - 24;

  if (visibleFilmSidebar) {
    const filmRect = visibleFilmSidebar.getBoundingClientRect();

    const preferredLeft = Math.round(filmRect.right + gap);
    const rightEdge = preferredLeft + installWidth;

    let targetTop = filmRect.top + (filmRect.height - installHeight) / 2;
    targetTop = Math.max(minTop, Math.min(targetTop, maxTop));

    if (rightEdge <= window.innerWidth - viewportPadding) {
      install.style.left = `${preferredLeft}px`;
      install.style.top = `${targetTop}px`;
      return;
    }

    install.classList.add('overlay-on-film');

    const overlayOffset = 116;
    const overlayLeft = Math.round(filmRect.right - installWidth + overlayOffset);

    install.style.left = `${overlayLeft}px`;
    install.style.top = `${targetTop}px`;
    return;
  }

  if (mainPanel) {
    const mainRect = mainPanel.getBoundingClientRect();

    const preferredLeft = Math.round(mainRect.right + gap);
    const rightEdge = preferredLeft + installWidth;

    let targetTop = mainRect.top + (mainRect.height - installHeight) / 2;
    targetTop = Math.max(minTop, Math.min(targetTop, maxTop));

    if (rightEdge <= window.innerWidth - viewportPadding) {
      install.style.left = `${preferredLeft}px`;
      install.style.top = `${targetTop}px`;
      return;
    }

    install.classList.add('overlay-on-film');

    const overlayOffset = 36;
    const overlayLeft = Math.round(mainRect.right - installWidth + overlayOffset);

    install.style.left = `${overlayLeft}px`;
    install.style.top = `${targetTop}px`;
    return;
  }

  install.style.left = `${leftBase}px`;
  install.style.top = `${fallbackTop}px`;
}

function syncAfterToggle() {
  window.setTimeout(syncPanels, 50);
}

/* ==================== FILM INFO SIDEBARS ==================== */

function toggleFilmInfoSidebar(filmId) {
  const panel = document.getElementById(filmId);
  if (!panel) return;

  const isOpening = !panel.classList.contains('visible');

  document.querySelectorAll('.film-sidebar').forEach((s) => {
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

/* ==================== MAIN PANELS ==================== */

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
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function closeAllMainPanels() {
  document.getElementById('aboutSidebar')?.classList.remove('visible');
  document.getElementById('workSidebar')?.classList.remove('visible');
  document.getElementById('installationSidebar')?.classList.remove('visible');
  document.querySelectorAll('.film-sidebar').forEach((s) => s.classList.remove('visible'));
  stopInstallationAudio();
  showMainContainers();
}

function toggleAboutSidebar() {
  const panel = document.getElementById('aboutSidebar');
  if (!panel) return;

  const isOpening = !panel.classList.contains('visible');

  if (isOpening) {
    document.getElementById('workSidebar')?.classList.remove('visible');
    document.querySelectorAll('.film-sidebar').forEach((s) => s.classList.remove('visible'));
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
    document.querySelectorAll('.film-sidebar').forEach((s) => s.classList.remove('visible'));
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
    panel.classList.add('visible');
    syncPanels();

    const audio = panel.querySelector('audio');
    if (audio) audio.play().catch(() => {});
  } else {
    panel.classList.remove('visible');
    stopInstallationAudio();
  }

  syncAfterToggle();
}

/* ==================== DOM GENERATION ==================== */

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

  Object.keys(siteData.filmInfo).forEach((filmId) => {
    const film = siteData.filmInfo[filmId];
    const sidebar = document.createElement('div');

    sidebar.id = filmId;
    sidebar.className = 'film-sidebar';

    const isInstallationTrigger = filmId === 'film1' && film.image;

    let imageMarkup = '';

    if (film.image) {
      if (isInstallationTrigger) {
        imageMarkup = `
          <div class="installation-trigger-wrap" data-installation-trigger="true">
            <div class="film-image-block">
              <img src="${film.image}" alt="${film.title}" class="${film.imageClass || 'film-img'} installation-trigger-image">
              ${film.caption ? `<p class="film-caption">${film.caption}</p>` : ''}
            </div>
            <span class="installation-trigger-icon" aria-hidden="true">🎧 Listen</span>
          </div>
        `;
      } else {
        imageMarkup = `
          <div class="film-image-block">
            <img src="${film.image}" alt="${film.title}" class="${film.imageClass || 'film-img'}">
            ${film.caption ? `<p class="film-caption">${film.caption}</p>` : ''}
          </div>
        `;
      }
    }

    const videoButtonMarkup = film.videoId
      ? `
        <button class="film-video-trigger" type="button" data-video-id="${film.videoId}">
          View clip
        </button>
      `
      : '';

    sidebar.innerHTML = `
      <span class="closebtn" data-film-close="${filmId}">×</span>
      <div class="film-container">
        <div class="film-content">
          ${imageMarkup}
          <div class="film-content-title"><h2>${film.title}</h2></div>
          <div class="film-content-info">
            ${film.info.map((line) => `<p>${line}</p>`).join('')}
          </div>
          <div class="film-actions">
            ${videoButtonMarkup}
            ${film.link ? `<p><a href="${film.link}" target="_blank" rel="noopener noreferrer">More info →</a></p>` : ''}
          </div>
        </div>
      </div>
    `;

    container.appendChild(sidebar);

    if (isInstallationTrigger) {
      const triggerWrap = sidebar.querySelector('[data-installation-trigger="true"]');

      triggerWrap?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleInstallationSidebar();
        syncAfterToggle();
      });
    }

    const videoTrigger = sidebar.querySelector('.film-video-trigger');
    if (videoTrigger) {
      videoTrigger.addEventListener('click', (e) => {
        e.stopPropagation();

        const id = videoTrigger.dataset.videoId;
        const isOpen = isVideoSidebarOpen(id);

        if (isOpen) {
          closeVideoSidebar(id);
        } else {
          openVideoSidebar(id);
        }
      });
    }

    sidebar.querySelector('.closebtn')?.addEventListener('click', () => {
      sidebar.classList.remove('visible');

      if (filmId === 'film1') {
        const installationSidebar = document.getElementById('installationSidebar');
        if (installationSidebar?.classList.contains('visible')) {
          installationSidebar.classList.remove('visible');
          stopInstallationAudio();
        }
      }

      syncAfterToggle();
    });
  });
}

function generateVideoSidebars() {
  const container = document.getElementById('video-sidebars-container');
  if (!container || !siteData.videoSidebars) return;

  Object.keys(siteData.videoSidebars).forEach((key) => {
    const data = siteData.videoSidebars[key];
    const sidebar = document.createElement('div');
    sidebar.id = key;
    sidebar.className = 'Sidebar';

    sidebar.innerHTML = `
      <div class="movie-header">
        <a href="javascript:void(0)" class="closebtn" onclick="closeVideoSidebar('${key}')">×</a>
        <span class="Title">${data.title}</span>
      </div>
      <div class="sidebar-nav">
        <div class="nav-arrow-container"><span class="nav-arrow prev-movie">←</span></div>
        <div class="nav-arrow-container"><span class="nav-arrow next-movie">→</span></div>
      </div>
      <div class="movie-content">
        <div class="movie-video-stack">
          <div class="movie-video-frame">
            <video src="${data.videoSrc}" controls preload="none"></video>
          </div>
          <p class="InfoMovie">${data.description}</p>
        </div>
        ${
          data.bandcamp
            ? `
          <div class="movie-soundtrack-panel">
            <div class="bandcamp-embed">
              <iframe src="${data.bandcamp.src}" style="${data.bandcamp.style}" seamless title="Bandcamp"></iframe>
            </div>
          </div>
        `
            : ''
        }
      </div>
    `;

    container.appendChild(sidebar);
  });
}

/* ==================== SCENE SYSTEM ==================== */

function oppositeDir(dir) {
  const map = { right: 'left', left: 'right', bottom: 'top', top: 'bottom' };
  return map[dir] || 'left';
}

function getCoverFilter(progress) {
  const p = Math.max(0, Math.min(1, progress));
  const eased = p * p * p;
  const brightness = 0.05 + eased * 0.95;
  const grayscale = 1 - eased;
  const contrast = 0.9 + eased * 0.1;
  const saturate = 0.75 + eased * 0.25;

  return `brightness(${brightness.toFixed(3)}) grayscale(${grayscale.toFixed(3)}) contrast(${contrast.toFixed(3)}) saturate(${saturate.toFixed(3)})`;
}

function getDirTransform(direction, stage) {
  const map = {
    right: {
      hidden: 'translate(calc(-50% + 65vw), -50%) scale(.93)',
      enter: 'translate(calc(-50% + 12vw), -50%) scale(.97)',
      center: 'translate(-50%, -50%) scale(1)',
      prev: 'translate(calc(-50% - 30vw), -50%) scale(.86)',
    },
    left: {
      hidden: 'translate(calc(-50% - 65vw), -50%) scale(.93)',
      enter: 'translate(calc(-50% - 12vw), -50%) scale(.97)',
      center: 'translate(-50%, -50%) scale(1)',
      prev: 'translate(calc(-50% + 30vw), -50%) scale(.86)',
    },
    bottom: {
      hidden: 'translate(-50%, calc(-50% + 55vh)) scale(.93)',
      enter: 'translate(-50%, calc(-50% + 10vh)) scale(.97)',
      center: 'translate(-50%, -50%) scale(1)',
      prev: 'translate(-50%, calc(-50% - 26vh)) scale(.86)',
    },
    top: {
      hidden: 'translate(-50%, calc(-50% - 55vh)) scale(.93)',
      enter: 'translate(-50%, calc(-50% - 10vh)) scale(.97)',
      center: 'translate(-50%, -50%) scale(1)',
      prev: 'translate(-50%, calc(-50% + 26vh)) scale(.86)',
    },
  };

  return (map[direction] || map.right)[stage] || map.right.center;
}

function setImageSrc(el, src, alt) {
  if (!el) return;
  el.innerHTML = `<img src="${src}" alt="${alt}" style="width:100%;height:100%;object-fit:cover;display:block;" draggable="false">`;
}

function initSceneSystem() {
  const hint = document.querySelector('.hint');
  const intro = document.querySelector('.scroll-intro');
  const imageA = document.getElementById('sceneImage');
  const imageB = document.getElementById('sceneImageNext');

  if (!imageA || !imageB || !siteData.filmsScenes?.length) return;

  const sceneWidth =
    window.innerWidth <= 1440
      ? 'min(60vw, 760px)'
      : 'min(68vw, 840px)';

  const baseStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: sceneWidth,
    aspectRatio: '16 / 10',
    overflow: 'hidden',
    border: '1px solid rgba(26,26,26,0.1)',
    background: 'rgba(200,198,194,0.2)',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease, filter 1.6s ease',
    zIndex: '25',
  };

  Object.assign(imageA.style, baseStyle, { zIndex: '26' });
  Object.assign(imageB.style, baseStyle, { zIndex: '25' });

  let metaEl = document.querySelector('.scene-meta');
  if (!metaEl) {
    metaEl = document.createElement('div');
    metaEl.className = 'scene-meta';
    document.body.appendChild(metaEl);
    metaEl.innerHTML = `
      <div class="scene-title"></div>
      <div class="scene-counter"></div>
      <button class="scene-button" type="button">View project</button>
    `;
  }

  const titleEl = metaEl.querySelector('.scene-title');
  const counterEl = metaEl.querySelector('.scene-counter');
  const buttonEl = metaEl.querySelector('.scene-button');

  const films = siteData.filmsScenes;

  let phase = 'enter';
  let filmIdx = 0;
  let sceneIdx = 0;
  let coverStep = 0;
  const ILLUM_STEPS = 12;
  let locked = false;
  let touchY = 0;
  let layerA = imageA;
  let layerB = imageB;

  function swapLayers() {
    [layerA, layerB] = [layerB, layerA];
    layerA.style.zIndex = '26';
    layerB.style.zIndex = '25';
  }

  function hideMeta() {
    metaEl.style.opacity = '0';
    metaEl.style.transform = 'translateX(-50%) translateY(10px)';
    if (buttonEl) {
      buttonEl.style.pointerEvents = 'none';
      buttonEl.onclick = null;
    }
  }

  function showMeta(film) {
    if (titleEl) titleEl.innerHTML = `<h2>${film.title}</h2><p>${film.role || ''}</p>`;
    if (counterEl) {
      counterEl.textContent = `${String(filmIdx + 1).padStart(2, '0')} / ${String(films.length).padStart(2, '0')}`;
    }
    if (buttonEl) {
      buttonEl.textContent = film.buttonLabel || 'View project';
      buttonEl.onclick = () => openVideoSidebar(film.videoId);
      buttonEl.style.pointerEvents = 'auto';
    }

    requestAnimationFrame(() => {
      metaEl.style.opacity = '1';
      metaEl.style.transform = 'translateX(-50%) translateY(0)';
    });
  }

  function getFilm(idx) {
    const f = films[idx];
    if (!f) return null;
    const cover = f.cover || f.scenes?.[0];
    const extras = f.cover ? (f.scenes || []) : (f.scenes || []).slice(1);
    return { ...f, cover, extras };
  }

  function sendOff(el, dir, asPrev = false) {
    if (!el) return;
    el.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease, filter 0.6s ease';
    el.style.transform = getDirTransform(dir, asPrev ? 'prev' : 'hidden');
    el.style.opacity = '0';
    el.style.filter = 'brightness(.05) grayscale(1) contrast(.9)';
  }

  function applyIllum(step) {
    const p = step / ILLUM_STEPS;
    const eased = 1 - Math.pow(1 - p, 3);

    const brightness = 0.04 + eased * 0.96;
    const grayscale = 1 - eased;
    const contrast = 0.88 + eased * 0.12;
    const saturate = 0.7 + eased * 0.3;

    layerA.style.transition = 'filter 0.9s ease-out';
    layerA.style.filter = `
      brightness(${brightness})
      grayscale(${grayscale})
      contrast(${contrast})
      saturate(${saturate})
    `;
  }

  function initFirstImage() {
    const film = getFilm(0);
    if (!film?.cover) return;

    setImageSrc(layerA, film.cover, film.title);

    layerA.style.transition = 'none';
    layerA.style.transform = getDirTransform(film.direction || 'right', 'enter');
    layerA.style.opacity = '0.55';
    layerA.style.filter = 'brightness(.02) grayscale(1) contrast(.85)';

    sendOff(layerB, film.direction || 'right');

    hint?.classList.remove('hidden');
    intro?.classList.remove('hidden');
    hideMeta();
  }

  function moveToCenterDark() {
    const film = getFilm(0);
    if (!film) return;
    phase = 'darkin';

    hint?.classList.add('hidden');
    intro?.classList.add('hidden');

    layerA.style.transition = 'transform 1.3s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease';
    layerA.style.transform = getDirTransform(film.direction || 'right', 'center');
    layerA.style.opacity = '1';

    showMeta(film);
    locked = true;
    setTimeout(() => {
      locked = false;
    }, 1000);
  }

  function showImage(src, filmData) {
    const dir = filmData.direction || 'right';

    sendOff(layerA, oppositeDir(dir), true);
    swapLayers();
    setImageSrc(layerA, src, filmData.title);

    layerA.style.transition = 'none';
    layerA.style.transform = getDirTransform(dir, 'hidden');
    layerA.style.opacity = '0';
    layerA.style.filter = 'brightness(1) grayscale(0) contrast(1)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        layerA.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease, filter 0.5s ease';
        layerA.style.transform = getDirTransform(dir, 'center');
        layerA.style.opacity = '1';
        layerA.style.filter = 'brightness(1) grayscale(0) contrast(1)';
      });
    });

    showMeta(filmData);
    locked = true;
    setTimeout(() => {
      locked = false;
    }, 900);
  }

  function goForward() {
    if (locked) return;
    const film = getFilm(filmIdx);

    if (phase === 'enter') {
      moveToCenterDark();
      return;
    }

    if (phase === 'darkin') {
      if (coverStep < ILLUM_STEPS) {
        coverStep++;
        applyIllum(coverStep);
        if (coverStep === ILLUM_STEPS) {
          phase = 'scenes';
        }
        return;
      }
    }

    if (!film) return;

    if (sceneIdx < film.extras.length) {
      showImage(film.extras[sceneIdx], film);
      sceneIdx++;
      return;
    }

    if (filmIdx < films.length - 1) {
      filmIdx++;
      sceneIdx = 0;
      const nextFilm = getFilm(filmIdx);
      if (nextFilm?.cover) showImage(nextFilm.cover, nextFilm);
    }
  }

  function goBackward() {
    if (locked) return;
    const film = getFilm(filmIdx);

    if (filmIdx === 0 && phase === 'darkin') {
      if (coverStep > 0) {
        coverStep--;
        applyIllum(coverStep);
      } else {
        phase = 'enter';
        layerA.style.transition = 'transform 1.3s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease';
        layerA.style.transform = getDirTransform(film?.direction || 'right', 'enter');
        layerA.style.opacity = '0.55';
        hint?.classList.remove('hidden');
        intro?.classList.remove('hidden');
        hideMeta();
      }
      return;
    }

    if (sceneIdx > 0) {
      sceneIdx--;
      const src = sceneIdx === 0 ? film.cover : film.extras[sceneIdx - 1];
      showImage(src, film);
      return;
    }

    if (filmIdx > 0) {
      filmIdx--;
      const prevFilm = getFilm(filmIdx);
      sceneIdx = prevFilm?.extras.length || 0;
      const src = sceneIdx > 0 ? prevFilm.extras[sceneIdx - 1] : prevFilm?.cover;
      if (src) showImage(src, prevFilm);
      return;
    }

    if (filmIdx === 0 && phase === 'scenes') {
      phase = 'darkin';
      coverStep = ILLUM_STEPS;
    }
  }

  initFirstImage();

  window.addEventListener(
    'wheel',
    (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      if (e.deltaY > 0) goForward();
      else goBackward();
    },
    { passive: true }
  );

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goForward();
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goBackward();
    }
  });

  window.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches?.length) touchY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      if (!e.changedTouches?.length) return;
      const delta = touchY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      if (delta > 0) goForward();
      else goBackward();
    },
    { passive: true }
  );
}

/* ==================== EVENTS ==================== */

function initEventListeners() {
  const navAbout = document.querySelector('.nav-link[data-panel="about"]');
  const navWork = document.querySelector('.nav-link[data-panel="work"]');

  navAbout?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAboutSidebar();
  });

  navWork?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleWorkSidebar();
  });

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

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('prev-movie')) navigateVideo(-1);
    else if (e.target.classList.contains('next-movie')) navigateVideo(1);
  });

  document.addEventListener('click', (e) => {
    const inside = e.target.closest(
      '.panel, .Sidebar, .film-sidebar, .nav-link, .closebtn, .scene-button, .scene-meta'
    );

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

}

function initAudioSystem() {
  let audioCtx = null;
  let buffer = null;
  let isPlaying = false;
  let grainTimeout = null;
  let activeNodes = [];
  let outputBus = null;

  const grainSizeEl = document.getElementById('grainSize');
  const densityEl = document.getElementById('density');
  const filterFreqEl = document.getElementById('filterFreq');
  const blurAmountEl = document.getElementById('blurAmount');
  const driftAmountEl = document.getElementById('driftAmount');

  const generateBtn = document.getElementById('generateSound');
  const downloadBtn = document.getElementById('downloadSound');
  const audioUpload = document.getElementById('audioUpload');
  const renderStatus = document.getElementById('audioRenderStatus');

function showRenderStatus() {
  renderStatus?.classList.add('visible');
  renderStatus?.setAttribute('aria-hidden', 'false');
}

function hideRenderStatus() {
  renderStatus?.classList.remove('visible');
  renderStatus?.setAttribute('aria-hidden', 'true');
}

  if (!generateBtn && !downloadBtn && !audioUpload) return;

  function ensureAudioSetup() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!outputBus) {
      outputBus = audioCtx.createGain();
      outputBus.gain.value = 1;
      outputBus.connect(audioCtx.destination);
    }
  }

  function createNoiseBuffer(ctx, seconds = 2) {
    const newBuffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = newBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    return newBuffer;
  }

  function createImpulseResponse(ctx, duration = 1.8, decay = 2.5) {
    const length = Math.floor(ctx.sampleRate * duration);
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);

    for (let ch = 0; ch < impulse.numberOfChannels; ch++) {
      const channel = impulse.getChannelData(ch);

      for (let i = 0; i < length; i++) {
        const n = length - i;
        channel[i] = (Math.random() * 2 - 1) * Math.pow(n / length, decay);
      }
    }

    return impulse;
  }

  function stopGranular() {
    if (grainTimeout) {
      clearTimeout(grainTimeout);
      grainTimeout = null;
    }

    activeNodes.forEach((node) => {
      try {
        if (typeof node.stop === 'function') node.stop();
      } catch (_) {}

      try {
        node.disconnect();
      } catch (_) {}
    });

    activeNodes = [];
  }

  function startGranular() {
    function triggerGrain() {
      if (!isPlaying || !audioCtx || !buffer || !outputBus) return;

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      const dryGain = audioCtx.createGain();
      const wetGain = audioCtx.createGain();
      const masterGain = audioCtx.createGain();

      const filter = audioCtx.createBiquadFilter();
      const convolver = audioCtx.createConvolver();
      const pan = audioCtx.createStereoPanner();

      const grainSize = parseFloat(grainSizeEl?.value || '0.08');
      const density = parseFloat(densityEl?.value || '12');
      const baseFilterFreq = parseFloat(filterFreqEl?.value || '1200');
      const blurAmount = parseFloat(blurAmountEl?.value || '0.35');
      const driftAmount = parseFloat(driftAmountEl?.value || '0.22');

      const driftSpread = baseFilterFreq * driftAmount * 1.4;
      const driftedFreq = Math.max(
        120,
        baseFilterFreq + (Math.random() * 2 - 1) * driftSpread
      );

      const randomPan = (Math.random() * 2 - 1) * (0.15 + driftAmount * 0.65);
      const playbackSpread = 1 + (Math.random() * 2 - 1) * (driftAmount * 0.22);

      filter.type = 'bandpass';
      filter.frequency.value = driftedFreq;
      filter.Q.value = 2 + driftAmount * 8;

      pan.pan.value = randomPan;
      source.playbackRate.value = playbackSpread;

      convolver.buffer = createImpulseResponse(audioCtx, 1.4 + blurAmount * 2, 2.2);

      dryGain.gain.value = 1 - blurAmount * 0.75;
      wetGain.gain.value = blurAmount * 0.85;
      masterGain.gain.value = 0.42;

      const now = audioCtx.currentTime;

      dryGain.gain.setValueAtTime(0, now);
      wetGain.gain.setValueAtTime(0, now);

      dryGain.gain.linearRampToValueAtTime(
        (1 - blurAmount * 0.75) * 0.9,
        now + grainSize * 0.45
      );
      dryGain.gain.linearRampToValueAtTime(0, now + grainSize);

      wetGain.gain.linearRampToValueAtTime(
        (blurAmount * 0.85) * 0.8,
        now + grainSize * 0.55
      );
      wetGain.gain.linearRampToValueAtTime(0, now + grainSize * 1.15);

      source.connect(filter);
      filter.connect(dryGain);
      filter.connect(convolver);
      convolver.connect(wetGain);
      dryGain.connect(pan);
      wetGain.connect(pan);
      pan.connect(masterGain);
      masterGain.connect(outputBus);

      activeNodes.push(source, filter, convolver, dryGain, wetGain, pan, masterGain);

      const maxOffset = Math.max(0, buffer.duration - grainSize);
      const offset = Math.random() * maxOffset;

      source.start(now, offset, grainSize);

      grainTimeout = window.setTimeout(() => {
        triggerGrain();
      }, 1000 / density);
    }

    triggerGrain();
  }

  function audioBufferToWav(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1;
    const bitDepth = 16;

    const channelData = [];
    for (let ch = 0; ch < numChannels; ch++) {
      channelData.push(audioBuffer.getChannelData(ch));
    }

    const samples = audioBuffer.length;
    const blockAlign = numChannels * bitDepth / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = samples * blockAlign;
    const bufferLength = 44 + dataSize;

    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    let offset = 0;

    function writeString(str) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset++, str.charCodeAt(i));
      }
    }

    function write16(value) {
      view.setUint16(offset, value, true);
      offset += 2;
    }

    function write32(value) {
      view.setUint32(offset, value, true);
      offset += 4;
    }

    writeString('RIFF');
    write32(36 + dataSize);
    writeString('WAVE');
    writeString('fmt ');
    write32(16);
    write16(format);
    write16(numChannels);
    write32(sampleRate);
    write32(byteRate);
    write16(blockAlign);
    write16(bitDepth);
    writeString('data');
    write32(dataSize);

    for (let i = 0; i < samples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channelData[ch][i];
        sample = Math.max(-1, Math.min(1, sample));
        const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  async function renderOfflineTexture(durationSeconds = 8) {
    ensureAudioSetup();

    const sampleRate = 44100;
    const length = Math.floor(sampleRate * durationSeconds);
    const offlineCtx = new OfflineAudioContext(2, length, sampleRate);

    const srcBuffer = buffer || createNoiseBuffer(audioCtx || offlineCtx, 2);

    const grainSize = parseFloat(grainSizeEl?.value || '0.08');
    const density = parseFloat(densityEl?.value || '12');
    const baseFilterFreq = parseFloat(filterFreqEl?.value || '1200');
    const blurAmount = parseFloat(blurAmountEl?.value || '0.35');
    const driftAmount = parseFloat(driftAmountEl?.value || '0.22');

    const impulse = createImpulseResponse(offlineCtx, 1.4 + blurAmount * 2, 2.2);
    const interval = 1 / density;

    for (let t = 0; t < durationSeconds; t += interval) {
      const source = offlineCtx.createBufferSource();
      source.buffer = srcBuffer;

      const filter = offlineCtx.createBiquadFilter();
      const convolver = offlineCtx.createConvolver();
      const dryGain = offlineCtx.createGain();
      const wetGain = offlineCtx.createGain();
      const pan = offlineCtx.createStereoPanner();
      const masterGain = offlineCtx.createGain();

      const driftSpread = baseFilterFreq * driftAmount * 1.4;
      const driftedFreq = Math.max(
        120,
        baseFilterFreq + (Math.random() * 2 - 1) * driftSpread
      );

      const randomPan = (Math.random() * 2 - 1) * (0.15 + driftAmount * 0.65);
      const playbackSpread = 1 + (Math.random() * 2 - 1) * (driftAmount * 0.22);

      filter.type = 'bandpass';
      filter.frequency.value = driftedFreq;
      filter.Q.value = 2 + driftAmount * 8;

      convolver.buffer = impulse;
      pan.pan.value = randomPan;
      source.playbackRate.value = playbackSpread;

      dryGain.gain.setValueAtTime(0, t);
      wetGain.gain.setValueAtTime(0, t);

      dryGain.gain.linearRampToValueAtTime(
        (1 - blurAmount * 0.75) * 0.9,
        t + grainSize * 0.45
      );
      dryGain.gain.linearRampToValueAtTime(0, t + grainSize);

      wetGain.gain.linearRampToValueAtTime(
        (blurAmount * 0.85) * 0.8,
        t + grainSize * 0.55
      );
      wetGain.gain.linearRampToValueAtTime(0, t + grainSize * 1.15);

      masterGain.gain.value = 0.42;

      source.connect(filter);
      filter.connect(dryGain);
      filter.connect(convolver);
      convolver.connect(wetGain);
      dryGain.connect(pan);
      wetGain.connect(pan);
      pan.connect(masterGain);
      masterGain.connect(offlineCtx.destination);

      const maxOffset = Math.max(0, srcBuffer.duration - grainSize);
      const offset = Math.random() * maxOffset;

      source.start(t, offset, grainSize);
    }

    return offlineCtx.startRendering();
  }

  audioUpload?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    ensureAudioSetup();

    try {
      const arrayBuffer = await file.arrayBuffer();
      buffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
    } catch (err) {
      console.error('Audio upload error:', err);
    }
  });

  generateBtn?.addEventListener('click', async () => {
    ensureAudioSetup();

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    if (!buffer) {
      buffer = createNoiseBuffer(audioCtx, 2);
    }

    if (!isPlaying) {
      isPlaying = true;
      generateBtn.textContent = 'stop';
      startGranular();
    } else {
      isPlaying = false;
      generateBtn.textContent = 'generate';
      stopGranular();
    }
  });

  downloadBtn?.addEventListener('click', async () => {
  try {
    if (isPlaying) {
      isPlaying = false;
      if (generateBtn) generateBtn.textContent = 'generate';
      stopGranular();
    }

    showRenderStatus();

    const renderedBuffer = await renderOfflineTexture(8);
    const wavBlob = audioBufferToWav(renderedBuffer);

    hideRenderStatus();
    downloadBlob(wavBlob, 'acousmatic-texture.wav');
  } catch (err) {
    hideRenderStatus();
    console.error('Download render error:', err);
  }
});
}

/* ==================== PRELOAD ==================== */

function preloadCriticalImages() {
  siteData.filmsScenes?.forEach((film) => {
    const all = [];
    if (film.cover) all.push(film.cover);
    if (film.scenes?.length) all.push(...film.scenes);

    all.forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  });
}

/* ==================== START ==================== */

document.addEventListener('DOMContentLoaded', () => {
  generateWorksList();
  generateFilmSidebars();
  generateVideoSidebars();
  initEventListeners();
  initAudioSystem();
  preloadCriticalImages();
  initSceneSystem();
  syncPanels();
  window.addEventListener('resize', () => window.setTimeout(syncPanels, 100));
});