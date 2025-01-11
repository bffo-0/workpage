// Funzioni helper per manipolazione DOM
export function hideContainers() {
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    
    if (infoContainer) infoContainer.classList.add('hidden');
    if (navContainer) navContainer.classList.add('hidden');
}

export function showContainers() {
    const infoContainer = document.querySelector('.info-container');
    const navContainer = document.querySelector('.nav-container');
    
    if (infoContainer) infoContainer.classList.remove('hidden');
    if (navContainer) navContainer.classList.remove('hidden');
}

export function isMobileOrTablet() {
    return window.innerWidth <= 785;
}