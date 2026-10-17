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
  // 2. RETRO HINDI POP-ART ELEMENTS PARALLAX & PHYSICS
  // ========================================================
  const retroElements = document.querySelectorAll('.retro-element');
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const ease = 0.06; // Smooth inertia

  // Listen to mouse movement
  window.addEventListener('mousemove', (e) => {
    // Distance from window center
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
    // Lerp towards target
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    retroElements.forEach((el) => {
      const parallaxFactor = parseFloat(el.getAttribute('data-parallax') || '0.05');
      const px = currentX * parallaxFactor;
      const py = currentY * parallaxFactor;

      el.style.setProperty('--mx', `${px.toFixed(2)}px`);
      el.style.setProperty('--my', `${py.toFixed(2)}px`);
    });

    requestAnimationFrame(renderParallax);
  }
  renderParallax();

  // Playful click interaction on retro badges
  retroElements.forEach((el) => {
    el.addEventListener('click', () => {
      el.style.transform = 'scale(1.15) rotate(0deg)';
      setTimeout(() => {
        el.style.transform = '';
      }, 300);
    });
  });

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
  // 4. DYNAMIC CHANGING WORD (INDIAN STYLES: HINDI <-> ENGLISH)
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

    setInterval(() => {
      // 1. Transition out current word
      dynamicWordEl.classList.add('morph-out');

      setTimeout(() => {
        // 2. Remove all style classes
        wordStyles.forEach(w => dynamicWordEl.classList.remove(w.styleClass));

        // Advance index
        currentIdx = (currentIdx + 1) % wordStyles.length;
        const next = wordStyles[currentIdx];

        // 3. Update text & apply new Indian design style
        dynamicWordEl.textContent = next.text;
        dynamicWordEl.classList.add(next.styleClass);

        // Prep morph in from below
        dynamicWordEl.classList.remove('morph-out');
        dynamicWordEl.classList.add('morph-in');

        // Force browser layout repaint
        void dynamicWordEl.offsetWidth;

        // 4. Animate to neutral state smoothly
        dynamicWordEl.classList.remove('morph-in');
      }, 350);
    }, 2400);
  }

});
