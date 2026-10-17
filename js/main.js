// 4—11 STUDIO® — Interactive Engine (Preloader, Retro Pop-Art Parallax, Drawer & Modals)
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. ANIMATED PRELOADER (OFFICIAL 4—11 LOGO & COUNTER)
  // ========================================================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('loader-counter');
  const progressFill = document.getElementById('loader-progress-fill');

  let count = 0;
  const counterInterval = setInterval(() => {
    const increment = Math.floor(Math.random() * 8) + 4;
    count = Math.min(count + increment, 100);
    
    if (counterEl) counterEl.textContent = `${count}%`;
    if (progressFill) progressFill.style.width = `${count}%`;

    if (count >= 100) {
      clearInterval(counterInterval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('loaded');
        }
      }, 350);
    }
  }, 35);

  // ========================================================
  // 2. RETRO HINDI POP-ART ELEMENTS PARALLAX & SCATTER PHYSICS
  // ========================================================
  const retroElements = document.querySelectorAll('.retro-element');
  const retroCanvas = document.getElementById('retro-bg-canvas');
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const ease = 0.06; // Smooth mouse inertia

  // Track each element's dynamic scatter target and position
  const elementStates = Array.from(retroElements).map(() => ({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    speed: 0.08
  }));

  // Listen to mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
  });

  // Mobile / Gyroscope tilt support (if supported)
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouseX = (e.gamma || 0) * 8;
        mouseY = ((e.beta || 0) - 45) * 8;
      }
    });
  }

  // Physics animation loop using requestAnimationFrame
  function renderParallax() {
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    retroElements.forEach((el, i) => {
      const state = elementStates[i];
      // Smoothly lerp towards scatter position
      state.x += (state.targetX - state.x) * state.speed;
      state.y += (state.targetY - state.y) * state.speed;

      const parallaxFactor = parseFloat(el.getAttribute('data-parallax') || '0.05');
      const totalPx = (currentX * parallaxFactor) + state.x;
      const totalPy = (currentY * parallaxFactor) + state.y;

      el.style.setProperty('--mx', `${totalPx.toFixed(2)}px`);
      el.style.setProperty('--my', `${totalPy.toFixed(2)}px`);
    });

    requestAnimationFrame(renderParallax);
  }
  renderParallax();

  // Function to scatter all elements to brand-new places across the screen
  function scatterAllElements(clickedElement) {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const padding = Math.min(60, screenW * 0.06);

    // Protected center zone so text stays legible
    const isMobile = screenW <= 768;
    const safeCenterW = isMobile ? screenW * 0.75 : Math.min(680, screenW * 0.6);
    const safeCenterH = isMobile ? screenH * 0.65 : Math.min(380, screenH * 0.5);
    const centerMinX = (screenW - safeCenterW) / 2;
    const centerMaxX = (screenW + safeCenterW) / 2;
    const centerMinY = (screenH - safeCenterH) / 2;
    const centerMaxY = (screenH + safeCenterH) / 2;

    retroElements.forEach((el, i) => {
      const state = elementStates[i];
      const rect = el.getBoundingClientRect();
      const elW = rect.width || 140;
      const elH = rect.height || 60;

      // Base un-shifted position of element
      const originX = rect.left - state.x;
      const originY = rect.top - state.y;

      // Pick a random destination on the screen
      let destX, destY;
      let attempts = 0;
      do {
        destX = padding + Math.random() * (screenW - elW - padding * 2);
        destY = padding + Math.random() * (screenH - elH - padding * 2);
        attempts++;
      } while (
        !isMobile &&
        destX + elW > centerMinX &&
        destX < centerMaxX &&
        destY + elH > centerMinY &&
        destY < centerMaxY &&
        attempts < 25
      );

      // If attempts exhausted or inside center, push to perimeter quadrant
      if (destX + elW > centerMinX && destX < centerMaxX && destY + elH > centerMinY && destY < centerMaxY) {
        if (Math.random() > 0.5) {
          destX = Math.random() > 0.5 ? padding : screenW - elW - padding;
        } else {
          destY = Math.random() > 0.5 ? padding : screenH - elH - padding;
        }
      }

      // Assign target offset
      state.targetX = destX - originX;
      state.targetY = destY - originY;
      
      // Springy staggered speed
      state.speed = (el === clickedElement) 
        ? 0.14 
        : 0.06 + Math.random() * 0.05;
    });

    // If a specific element was clicked, trigger visual shockwave burst
    if (clickedElement) {
      clickedElement.classList.add('element-clicked-burst');
      setTimeout(() => {
        clickedElement.classList.remove('element-clicked-burst');
      }, 500);
    }
  }

  // Bind click on all retro badges
  retroElements.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      scatterAllElements(el);
    });
  });

  // Also bind click on retro canvas for background tapping
  if (retroCanvas) {
    retroCanvas.addEventListener('click', () => {
      scatterAllElements(null);
    });
  }

  // ========================================================
  // 3. MENU DRAWER & MODAL INTERACTIONS
  // ========================================================
  const menuBtn = document.getElementById('menu-btn');
  const menuDrawer = document.getElementById('menu-drawer');
  const drawerClose = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (menuDrawer) menuDrawer.classList.add('open');
  }
  function closeDrawer() {
    if (menuDrawer) menuDrawer.classList.remove('open');
  }
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Modals
  const servicesModal = document.getElementById('services-modal');
  const workModal = document.getElementById('work-modal');
  const whatWeDoBtn = document.getElementById('what-we-do-btn');
  const viewWorksBtn = document.getElementById('view-works-btn');
  const scrollBadgeBtn = document.getElementById('scroll-badge-btn');

  function openModal(modal) {
    if (modal) modal.classList.add('open');
  }
  function closeModal(modal) {
    if (modal) modal.classList.remove('open');
  }

  if (whatWeDoBtn) {
    whatWeDoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(servicesModal);
    });
  }

  if (viewWorksBtn) {
    viewWorksBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(workModal);
    });
  }

  if (scrollBadgeBtn) {
    scrollBadgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(servicesModal);
    });
  }

  // Close buttons inside modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close on clicking backdrop overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // ESC key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (servicesModal) closeModal(servicesModal);
      if (workModal) closeModal(workModal);
    }
  });

  // Drawer Nav Links
  document.querySelectorAll('.drawer-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const target = item.getAttribute('data-target');
      if (target === 'services') {
        closeDrawer();
        openModal(servicesModal);
      } else if (target === 'work') {
        closeDrawer();
        openModal(workModal);
      }
    });
  });

  // ========================================================
  // 4. DYNAMIC CHANGING WORD (5 INDIAN STYLES: HINDI <-> ENGLISH)
  // ========================================================
  const dynamicWordEl = document.getElementById('dynamic-ignore');

  if (dynamicWordEl) {
    const wordStyles = [
      { text: "Ignore", styleClass: "style-bollywood" },
      { text: "नज़रअंदाज़", styleClass: "style-truck-art" },
      { text: "अनदेखा", styleClass: "style-royal-saffron" },
      { text: "इग्नोर", styleClass: "style-matchbox-pop" },
      { text: "IGNORE", styleClass: "style-street-neon" }
    ];

    let currentIdx = 0;
    let isMorphing = false;

    function morphToNext() {
      if (isMorphing) return;
      isMorphing = true;

      // Phase 1: Slide up and fade out current word
      dynamicWordEl.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, filter 0.35s ease';
      dynamicWordEl.style.transform = 'translateY(-24px) scale(0.92)';
      dynamicWordEl.style.opacity = '0';
      dynamicWordEl.style.filter = 'blur(4px)';

      setTimeout(() => {
        // Phase 2: Advance and swap style class & text content while invisible
        wordStyles.forEach(w => dynamicWordEl.classList.remove(w.styleClass));
        currentIdx = (currentIdx + 1) % wordStyles.length;
        const next = wordStyles[currentIdx];

        dynamicWordEl.textContent = next.text;
        dynamicWordEl.classList.add(next.styleClass);

        // Instantly position below before animating in
        dynamicWordEl.style.transition = 'none';
        dynamicWordEl.style.transform = 'translateY(24px) scale(0.92)';
        dynamicWordEl.style.opacity = '0';
        dynamicWordEl.style.filter = 'blur(4px)';

        // Force browser layout repaint
        void dynamicWordEl.offsetWidth;

        // Phase 3: Animate into neutral position smoothly
        requestAnimationFrame(() => {
          dynamicWordEl.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease';
          dynamicWordEl.style.transform = 'translateY(0) scale(1)';
          dynamicWordEl.style.opacity = '1';
          dynamicWordEl.style.filter = 'blur(0)';

          setTimeout(() => {
            isMorphing = false;
          }, 450);
        });
      }, 350);
    }

    // Auto-cycle in loop every 2.2 seconds
    let morphInterval = setInterval(morphToNext, 2200);

    // Also allow user to click on the word directly to cycle instantly
    dynamicWordEl.style.cursor = 'pointer';
    dynamicWordEl.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(morphInterval);
      morphToNext();
      morphInterval = setInterval(morphToNext, 2200);
    });
  }

});
