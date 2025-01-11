document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 480) {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.className = 'grid-container swiper';
        
        const swiperWrapper = document.createElement('div');
        swiperWrapper.className = 'swiper-wrapper';
        
        const elements = Array.from(gridContainer.children);
        gridContainer.innerHTML = '';
        gridContainer.appendChild(swiperWrapper);
        
        elements.forEach((element, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.setAttribute('data-index', `${index + 1}/${elements.length}`);
            slide.appendChild(element);
            swiperWrapper.appendChild(slide);
        });

        // Configurazione Swiper più aggressiva
        const swiper = new Swiper('.swiper', {
            init: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            speed: 600,
            resistance: false,
            mousewheel: {
                enabled: true,
                sensitivity: 1
            },
            on: {
                setTransition: function(speed) {
                    if (speed > 0) {
                        const swiper = this;
                        document.querySelectorAll('.swiper-slide').forEach(slideEl => {
                            slideEl.style.transition = `${speed}ms`;
                        });
                    }
                }
            }
        });

        // Effetto gradiente al movimento
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let gradientX = mouseX;
        let gradientY = mouseY;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        document.addEventListener('touchmove', e => {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        });

        function animate() {
            gradientX += (mouseX - gradientX) * 0.1;
            gradientY += (mouseY - gradientY) * 0.1;
            
            gridContainer.style.setProperty('--mouse-x', `${gradientX}px`);
            gridContainer.style.setProperty('--mouse-y', `${gradientY}px`);
            
            requestAnimationFrame(animate);
        }
        
        animate();

        // Aggiungi effetto distorsione al movimento
        swiper.on('setTranslate', function() {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                const progress = slide.progress;
                const scale = 1 - Math.min(Math.abs(progress * 0.2), 0.2);
                const rotate = progress * 25;
                const translate = progress * 200;
                
                slide.style.transform = `perspective(1000px) 
                                       translateX(${translate}%) 
                                       rotateY(${rotate}deg) 
                                       scale(${scale})`;
            });
        });
    }
}); 

if (window.innerWidth <= 480) {
    const swiper = new Swiper('.grid-container', {
        direction: 'horizontal',
        slidesPerView: 1,
        centeredSlides: true,
        effect: 'slide',
        speed: 800,
        mousewheel: {
            enabled: true,
            sensitivity: 1
        }
    });

    // Collega lo scroll verticale al movimento orizzontale
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset;
        if (st > lastScrollTop) {
            // Scroll Down -> Next Slide
            swiper.slideNext();
        } else {
            // Scroll Up -> Prev Slide
            swiper.slidePrev();
        }
        lastScrollTop = st;
    });
} 