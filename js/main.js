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
  function setupWordRotator(elementId, wordStyles) {
    const el = document.getElementById(elementId);
    if (!el || !wordStyles || !wordStyles.length) return;

    let currentIdx = 0;
    let isMorphing = false;

    function morphToNext() {
      if (isMorphing) return;
      isMorphing = true;

      el.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, filter 0.35s ease';
      el.style.transform = 'translateY(-24px) scale(0.92)';
      el.style.opacity = '0';
      el.style.filter = 'blur(4px)';

      setTimeout(() => {
        wordStyles.forEach(w => el.classList.remove(w.styleClass));
        currentIdx = (currentIdx + 1) % wordStyles.length;
        const next = wordStyles[currentIdx];

        el.textContent = next.text;
        el.classList.add(next.styleClass);

        el.style.transition = 'none';
        el.style.transform = 'translateY(24px) scale(0.92)';
        el.style.opacity = '0';
        el.style.filter = 'blur(4px)';

        void el.offsetWidth;

        requestAnimationFrame(() => {
          el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.opacity = '1';
          el.style.filter = 'blur(0)';

          setTimeout(() => {
            isMorphing = false;
          }, 450);
        });
      }, 350);
    }

    let morphInterval = setInterval(morphToNext, 2200);

    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(morphInterval);
      morphToNext();
      morphInterval = setInterval(morphToNext, 2200);
    });
  }

  // Home Page Rotator
  setupWordRotator('dynamic-ignore', [
    { text: "Ignore", styleClass: "style-bollywood" },
    { text: "नज़रअंदाज़", styleClass: "style-truck-art" },
    { text: "अनदेखा", styleClass: "style-royal-saffron" },
    { text: "इग्नोर", styleClass: "style-matchbox-pop" },
    { text: "IGNORE", styleClass: "style-street-neon" }
  ]);

  // About Page Rotator
  setupWordRotator('dynamic-about', [
    { text: "उद्देश्यपूर्ण", styleClass: "style-royal-saffron" },
    { text: "Intentional", styleClass: "style-bollywood" },
    { text: "विशिष्ट", styleClass: "style-truck-art" },
    { text: "Unapologetic", styleClass: "style-street-neon" },
    { text: "प्रभावशाली", styleClass: "style-matchbox-pop" }
  ]);

  // Work Page Rotator
  setupWordRotator('dynamic-work', [
    { text: "कृतियाँ", styleClass: "style-truck-art" },
    { text: "Impossible", styleClass: "style-street-neon" },
    { text: "रचनाएं", styleClass: "style-royal-saffron" },
    { text: "Cinema", styleClass: "style-bollywood" },
    { text: "कलाकृति", styleClass: "style-matchbox-pop" }
  ]);

  // Contact Page Rotator
  setupWordRotator('dynamic-contact', [
    { text: "संपर्क", styleClass: "style-bollywood" },
    { text: "Connect", styleClass: "style-street-neon" },
    { text: "शुरुआत", styleClass: "style-royal-saffron" },
    { text: "Collaborate", styleClass: "style-truck-art" },
    { text: "साझेदारी", styleClass: "style-matchbox-pop" }
  ]);

  // ========================================================
  // 5. 4—11 ROCKET SHIP VOYAGER (AUTONOMOUS FLIGHT + SIDE FLAMES)
  // ========================================================
  const rocket = document.getElementById('rocket-411');

  if (rocket) {
    let screenW = window.innerWidth;
    let screenH = window.innerHeight;

    let posX = Math.random() * (screenW * 0.4) + screenW * 0.1;
    let posY = Math.random() * (screenH * 0.4) + screenH * 0.2;
    let targetX = screenW * 0.7;
    let targetY = screenH * 0.6;
    let currentAngle = 0;
    let speed = 2.4;
    let isBoosting = false;

    window.addEventListener('resize', () => {
      screenW = window.innerWidth;
      screenH = window.innerHeight;
    });

    function pickRandomWaypoint() {
      const margin = 80;
      targetX = margin + Math.random() * (screenW - margin * 2);
      targetY = margin + Math.random() * (screenH - margin * 2);
    }

    pickRandomWaypoint();

    function updateRocket() {
      const dx = targetX - posX;
      const dy = targetY - posY;
      const dist = Math.hypot(dx, dy);

      // Desired angle pointing towards destination
      const desiredAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Smooth shortest-path angle interpolation
      let diffAngle = (desiredAngle - currentAngle + 180) % 360 - 180;
      currentAngle += diffAngle * 0.045;

      // Move forward in direction of currentAngle
      const rad = currentAngle * (Math.PI / 180);
      const currentSpeed = isBoosting ? speed * 2.8 : speed;
      posX += Math.cos(rad) * currentSpeed;
      posY += Math.sin(rad) * currentSpeed;

      // If near waypoint, pick new random target
      if (dist < 90) {
        pickRandomWaypoint();
      }

      // Keep within screen boundaries
      if (posX < 30) { posX = 30; pickRandomWaypoint(); }
      if (posX > screenW - 30) { posX = screenW - 30; pickRandomWaypoint(); }
      if (posY < 30) { posY = 30; pickRandomWaypoint(); }
      if (posY > screenH - 30) { posY = screenH - 30; pickRandomWaypoint(); }

      // Apply coordinates and rotation
      rocket.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0) rotate(${currentAngle.toFixed(1)}deg)`;

      requestAnimationFrame(updateRocket);
    }

    requestAnimationFrame(updateRocket);

    // Click rocket for Turbo Boost!
    rocket.addEventListener('click', (e) => {
      e.stopPropagation();
      isBoosting = true;
      rocket.classList.add('rocket-turbo');
      pickRandomWaypoint();

      setTimeout(() => {
        isBoosting = false;
        rocket.classList.remove('rocket-turbo');
      }, 1500);
    });
  }

  // ========================================================
  // 6. LIVE IST CLOCK (MUMBAI COORDINATES)
  // ========================================================
  const liveClockEl = document.getElementById('live-ist-time');
  if (liveClockEl) {
    function updateIST() {
      try {
        const now = new Date();
        const istTimeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        liveClockEl.textContent = `${istTimeStr} IST`;
      } catch (err) {
        // Fallback
        const now = new Date();
        liveClockEl.textContent = now.toLocaleTimeString();
      }
    }
    updateIST();
    setInterval(updateIST, 1000);
  }

  // ========================================================
  // 7. WORK PAGE: CATEGORY FILTERING & PROJECT MODALS
  // ========================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCat = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (selectedCat === 'All' || cardCat === selectedCat) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Project Detail Modals
  const projectModal = document.getElementById('project-detail-modal');
  if (projectModal) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const client = card.getAttribute('data-client');
        const year = card.getAttribute('data-year');
        const cat = card.getAttribute('data-category');
        const desc = card.getAttribute('data-desc');
        const tags = card.getAttribute('data-tags');

        const mTitle = document.getElementById('modal-proj-title');
        const mClient = document.getElementById('modal-proj-client');
        const mYear = document.getElementById('modal-proj-year');
        const mCat = document.getElementById('modal-proj-cat');
        const mDesc = document.getElementById('modal-proj-desc');
        const mTags = document.getElementById('modal-proj-tags');

        if (mTitle) mTitle.textContent = title;
        if (mClient) mClient.textContent = client;
        if (mYear) mYear.textContent = year;
        if (mCat) mCat.textContent = cat;
        if (mDesc) mDesc.textContent = desc;

        if (mTags && tags) {
          mTags.innerHTML = '';
          tags.split(',').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'pillar-tag';
            span.textContent = tag.trim();
            mTags.appendChild(span);
          });
        }

        projectModal.classList.add('open');
      });
    });
  }

  // ========================================================
  // 8. CONTACT PAGE: SERVICE CHIP TOGGLES & INTAKE SUBMIT
  // ========================================================
  const chipToggles = document.querySelectorAll('.chip-toggle');
  chipToggles.forEach(chip => {
    chip.addEventListener('click', () => {
      // If single-choice in group (e.g. timeline) vs multi-choice (services)
      const group = chip.getAttribute('data-group');
      if (group === 'timeline') {
        document.querySelectorAll(`.chip-toggle[data-group="timeline"]`).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      } else {
        chip.classList.toggle('active');
      }
    });
  });

  const contactForm = document.getElementById('contact-form');
  const formSuccessCard = document.getElementById('form-success-card');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value || 'Ambitious Creator';
      const email = document.getElementById('contact-email')?.value || '';
      const brand = document.getElementById('contact-brand')?.value || 'Brand';
      const phone = document.getElementById('contact-phone')?.value || 'Not specified';
      const message = document.getElementById('contact-message')?.value || '';

      const activeServices = Array.from(document.querySelectorAll('.chip-toggle.active[data-group="service"]'))
        .map(c => c.textContent.trim())
        .join(', ') || 'General Creative Retainer';

      const activeTimeline = document.querySelector('.chip-toggle.active[data-group="timeline"]')?.textContent.trim() || 'Flexible';

      const subject = encodeURIComponent(`Project Brief: ${brand} × 4—11 Studio [${name}]`);
      const body = encodeURIComponent(
        `Hi 4—11 Studio Team,\n\n` +
        `Name: ${name}\n` +
        `Brand / Company: ${brand}\n` +
        `Email: ${email}\n` +
        `Phone / WhatsApp: ${phone}\n\n` +
        `Services Requested:\n${activeServices}\n\n` +
        `Desired Timeline:\n${activeTimeline}\n\n` +
        `Project Overview & Vision:\n${message}\n\n` +
        `---\nSent via 4eleven.in Project Intake`
      );

      // Open email client
      window.open(`mailto:hello@4-11.studio?subject=${subject}&body=${body}`, '_blank');

      // Display visual confirmation
      if (formSuccessCard) {
        contactForm.style.display = 'none';
        formSuccessCard.style.display = 'block';
        formSuccessCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

});
