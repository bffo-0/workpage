  //Touch Events//
document.addEventListener('DOMContentLoaded', function() {
  const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
  
  if (window.innerWidth <= 785) {
    movieImages.forEach(img => {
      let initialX = 0;
      let initialY = 0;
      let currentX = 0;
      let currentY = 0;
      let xOffset = 0;
      let yOffset = 0;
      let active = false;
      let isDragging = false;
      let touchStartTime = 0;
      let lastTapTime = 0;
      
      function dragStart(e) {
        e.preventDefault();
        const currentTime = Date.now();
        touchStartTime = currentTime;
        
        // Check for double tap
        if (currentTime - lastTapTime < 300) {
          // Double tap detected - open sidebar
          const mainDiv = img.closest('[id^="main"]');
          if (mainDiv) {
            const sidebarId = mainDiv.querySelector('[data-film]').getAttribute('data-film');
            const sidebarElement = document.querySelector(`[data-film="${sidebarId}"]`);
            if (sidebarElement) {
              toggleFilmInfoSidebar(sidebarElement);
            }
          }
          active = false;
          return;
        }
        lastTapTime = currentTime;
        
        if (e.type === "touchstart") {
          initialX = e.touches[0].clientX - xOffset;
          initialY = e.touches[0].clientY - yOffset;
        }
        
        if (e.target === img) {
          active = true;
          isDragging = false;
          
          // Reset all images to base z-index
          movieImages.forEach(image => {
            if (image !== img) {
              image.style.zIndex = "1";
            }
          });
          
          // Set high z-index for selected image
          img.style.zIndex = "999999";
        }
      }
      
      function drag(e) {
        if (!active) return;
        
        e.preventDefault();
        isDragging = true;
        
        if (e.type === "touchmove") {
          const touch = e.touches[0];
          currentX = touch.clientX - initialX;
          currentY = touch.clientY - initialY;
        }
        
        // Apply movement with smooth boundary constraints
        const rect = img.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const resistance = 0.3;
        
        // Smooth boundary constraints
        if (rect.left < 0) {
          currentX += Math.abs(rect.left) * resistance;
        }
        if (rect.right > windowWidth) {
          currentX -= (rect.right - windowWidth) * resistance;
        }
        if (rect.top < 0) {
          currentY += Math.abs(rect.top) * resistance;
        }
        if (rect.bottom > windowHeight) {
          currentY -= (rect.bottom - windowHeight) * resistance;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(() => {
          img.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        });
      }
      
      function dragEnd(e) {
        if (!active) return;
        
        // Smooth boundary spring back
        const rect = img.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (rect.left < 0) {
          currentX = 0;
        }
        if (rect.right > windowWidth) {
          currentX = windowWidth - rect.width;
        }
        if (rect.top < 0) {
          currentY = 0;
        }
        if (rect.bottom > windowHeight) {
          currentY = windowHeight - rect.height;
        }
        
        // Apply final position with animation
        requestAnimationFrame(() => {
          img.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        });
        
        // Reset variables
        initialX = currentX;
        initialY = currentY;
        active = false;
      }
      
      // Function to get corresponding video
      function getVideoForImage(img) {
        const imageClass = img.className;
        const sidebarId = imageClass === 'imgmovie' ? 'mySidebar' :
                         imageClass === 'imgmovie2' ? 'mySidebar2' :
                         imageClass === 'imgmovie3' ? 'mySidebar3' :
                         imageClass === 'imgmovie4' ? 'mySidebar4' :
                         imageClass === 'imgmovie5' ? 'mySidebar5' :
                         imageClass === 'imgmovie6' ? 'mySidebar6' :
                         imageClass === 'imgmovie7' ? 'mySidebar7' : null;
        
        if (sidebarId) {
          const sidebar = document.getElementById(sidebarId);
          return sidebar ? sidebar.querySelector('video') : null;
        }
        return null;
      }
      
      // Touch events
      img.addEventListener("touchstart", dragStart, false);
      img.addEventListener("touchend", dragEnd, false);
      img.addEventListener("touchmove", drag, false);
    });
  }
});

  //Touch Events//
  document.addEventListener('DOMContentLoaded', function() {
    const movieImages = document.querySelectorAll('.imgmovie, .imgmovie2, .imgmovie3, .imgmovie4, .imgmovie5, .imgmovie6, .imgmovie7');
    
    if (window.innerWidth <= 785) {
      movieImages.forEach(img => {
        let initialX = 0;
        let initialY = 0;
        let currentX = 0;
        let currentY = 0;
        let xOffset = 0;
        let yOffset = 0;
        let active = false;
        let isDragging = false;
        let touchStartTime = 0;
        let lastTapTime = 0;
        
        function dragStart(e) {
          e.preventDefault();
          const currentTime = Date.now();
          touchStartTime = currentTime;
          
          // Check for double tap
          if (currentTime - lastTapTime < 300) {
            // Double tap detected - open sidebar
            const mainDiv = img.closest('[id^="main"]');
            if (mainDiv) {
              const sidebarId = mainDiv.querySelector('[data-film]').getAttribute('data-film');
              const sidebarElement = document.querySelector(`[data-film="${sidebarId}"]`);
              if (sidebarElement) {
                toggleFilmInfoSidebar(sidebarElement);
              }
            }
            active = false;
            return;
          }
          lastTapTime = currentTime;
          
          if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
          }
          
          if (e.target === img) {
            active = true;
            isDragging = false;
            
            // Reset all images to base z-index
            movieImages.forEach(image => {
              if (image !== img) {
                image.style.zIndex = "1";
              }
            });
            
            // Set high z-index for selected image
            img.style.zIndex = "999999";
          }
        }
        
        function drag(e) {
          if (!active) return;
          
          e.preventDefault();
          isDragging = true;
          
          if (e.type === "touchmove") {
            const touch = e.touches[0];
            currentX = touch.clientX - initialX;
            currentY = touch.clientY - initialY;
          }
          
          // Apply movement with smooth boundary constraints
          const rect = img.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const resistance = 0.3;
          
          // Smooth boundary constraints
          if (rect.left < 0) {
            currentX += Math.abs(rect.left) * resistance;
          }
          if (rect.right > windowWidth) {
            currentX -= (rect.right - windowWidth) * resistance;
          }
          if (rect.top < 0) {
            currentY += Math.abs(rect.top) * resistance;
          }
          if (rect.bottom > windowHeight) {
            currentY -= (rect.bottom - windowHeight) * resistance;
          }
          
          xOffset = currentX;
          yOffset = currentY;
          
          // Use requestAnimationFrame for smooth animation
          requestAnimationFrame(() => {
            img.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          });
        }
        
        function dragEnd(e) {
          if (!active) return;
          
          // Smooth boundary spring back
          const rect = img.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          if (rect.left < 0) {
            currentX = 0;
          }
          if (rect.right > windowWidth) {
            currentX = windowWidth - rect.width;
          }
          if (rect.top < 0) {
            currentY = 0;
          }
          if (rect.bottom > windowHeight) {
            currentY = windowHeight - rect.height;
          }
          
          // Apply final position with animation
          requestAnimationFrame(() => {
            img.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          });
          
          // Reset variables
          initialX = currentX;
          initialY = currentY;
          active = false;
        }
        
        // Function to get corresponding video
        function getVideoForImage(img) {
          const imageClass = img.className;
          const sidebarId = imageClass === 'imgmovie' ? 'mySidebar' :
                           imageClass === 'imgmovie2' ? 'mySidebar2' :
                           imageClass === 'imgmovie3' ? 'mySidebar3' :
                           imageClass === 'imgmovie4' ? 'mySidebar4' :
                           imageClass === 'imgmovie5' ? 'mySidebar5' :
                           imageClass === 'imgmovie6' ? 'mySidebar6' :
                           imageClass === 'imgmovie7' ? 'mySidebar7' : null;
          
          if (sidebarId) {
            const sidebar = document.getElementById(sidebarId);
            return sidebar ? sidebar.querySelector('video') : null;
          }
          return null;
        }
        
        // Touch events
        img.addEventListener("touchstart", dragStart, false);
        img.addEventListener("touchend", dragEnd, false);
        img.addEventListener("touchmove", drag, false);
      });
    }
  });