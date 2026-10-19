// 4—11 STUDIO® — Interactive Engine (Preloader, Retro Pop-Art Parallax, Drawer & Modals)
window.__MAIN_ENGINE_ACTIVE__ = true;
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
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 1100);
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

    // Protected text zone so text stays legible
    const isMobile = screenW <= 768;
    const heroContent = document.querySelector('.service_hero_content');
    let centerMinX, centerMaxX, centerMinY, centerMaxY;
    if (heroContent) {
      const hRect = heroContent.getBoundingClientRect();
      centerMinX = hRect.left;
      centerMaxX = hRect.right;
      centerMinY = hRect.top;
      centerMaxY = hRect.bottom;
    } else {
      const safeCenterW = isMobile ? screenW * 0.75 : Math.min(680, screenW * 0.6);
      const safeCenterH = isMobile ? screenH * 0.65 : Math.min(380, screenH * 0.5);
      centerMinX = (screenW - safeCenterW) / 2;
      centerMaxX = (screenW + safeCenterW) / 2;
      centerMinY = (screenH - safeCenterH) / 2;
      centerMaxY = (screenH + safeCenterH) / 2;
    }

    const isWorkPage = document.body.classList.contains('work-page');

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
      if (isWorkPage && screenW > 900) {
        const minDestX = screenW * 0.55;
        destX = minDestX + Math.random() * (screenW - minDestX - elW - padding);
        destY = padding + Math.random() * (screenH - elH - padding * 2);
      } else {
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
      const href = whatWeDoBtn.getAttribute('href');
      if (href && href.includes('.html')) {
        return; // Allow standard page navigation
      }
      const targetSec = document.getElementById('what-we-ship') || document.getElementById('capabilities');
      if (targetSec) {
        e.preventDefault();
        targetSec.scrollIntoView({ behavior: 'smooth' });
      } else if (servicesModal) {
        e.preventDefault();
        openModal(servicesModal);
      }
    });
  }

  if (viewWorksBtn) {
    viewWorksBtn.addEventListener('click', (e) => {
      const href = viewWorksBtn.getAttribute('href');
      if (href && href.includes('.html')) {
        return; // Allow standard page navigation
      }
      const targetSec = document.getElementById('selected-work');
      if (targetSec) {
        e.preventDefault();
        targetSec.scrollIntoView({ behavior: 'smooth' });
      } else if (workModal) {
        e.preventDefault();
        openModal(workModal);
      }
    });
  }

  if (scrollBadgeBtn) {
    scrollBadgeBtn.addEventListener('click', (e) => {
      const href = scrollBadgeBtn.getAttribute('href');
      if (href && href.includes('.html')) {
        return; // Allow standard page navigation
      }
      const targetSec = document.getElementById('what-we-ship');
      if (targetSec) {
        e.preventDefault();
        targetSec.scrollIntoView({ behavior: 'smooth' });
      } else if (servicesModal) {
        e.preventDefault();
        openModal(servicesModal);
      }
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

  // Services (What We Do) Page Rotator
  setupWordRotator('dynamic-services', [
    { text: "विशेषज्ञता", styleClass: "style-bollywood" },
    { text: "Capabilities", styleClass: "style-street-neon" },
    { text: "कौशल", styleClass: "style-royal-saffron" },
    { text: "Excellence", styleClass: "style-truck-art" },
    { text: "कारीगरी", styleClass: "style-matchbox-pop" }
  ]);

  // ========================================================
  // 5. 4—11 ROCKET SHIP VOYAGER (AUTONOMOUS FLIGHT + SIDE FLAMES)
  // ========================================================
  const rocket = document.getElementById('rocket-411');

  if (rocket) {
    let screenW = window.innerWidth;
    let screenH = window.innerHeight;
    const isWorkPage = document.body.classList.contains('work-page');

    let minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.55 : 30;
    let posX = (isWorkPage && screenW > 900)
      ? screenW * 0.6 + Math.random() * (screenW * 0.28)
      : Math.random() * (screenW * 0.4) + screenW * 0.1;
    let posY = Math.random() * (screenH * 0.4) + screenH * 0.2;
    let targetX = (isWorkPage && screenW > 900) ? screenW * 0.78 : screenW * 0.7;
    let targetY = screenH * 0.6;
    let currentAngle = 0;
    let speed = 2.4;
    let isBoosting = false;

    window.addEventListener('resize', () => {
      screenW = window.innerWidth;
      screenH = window.innerHeight;
      minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.55 : 30;
    });

    function pickRandomWaypoint() {
      const margin = 70;
      minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.55 : margin;
      targetX = minBoundX + Math.random() * (screenW - minBoundX - margin);
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

      // Keep within boundaries
      if (posX < minBoundX) { posX = minBoundX; pickRandomWaypoint(); }
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
  const liveClockEls = document.querySelectorAll('#live-ist-time, #ba-live-time');
  if (liveClockEls.length) {
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
        liveClockEls.forEach(el => {
          el.textContent = `${istTimeStr} IST`;
        });
      } catch (err) {
        const now = new Date();
        liveClockEls.forEach(el => {
          el.textContent = now.toLocaleTimeString();
        });
      }
    }
    updateIST();
    setInterval(updateIST, 1000);
  }

  // ========================================================
  // 7. WORK PAGE: CATEGORY FILTERING & PROJECT MODALS
  // ========================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card, .project_card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCat = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          const parentItem = card.closest('.projects_mosaique_item, .work-item-col-12, .work-item-col-7, .work-item-col-5');
          if (selectedCat === 'All' || cardCat === selectedCat) {
            if (parentItem) parentItem.style.display = '';
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            if (parentItem) parentItem.style.display = 'none';
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Brand Appart Showreel Video Scrubber Interactive Timeline
  const timelineThumbs = document.querySelectorAll('.ba-timeline-thumb-item');
  const scrubProgress = document.querySelector('.ba-timeline-scrub-progress');
  const mainVideoFrame = document.getElementById('ba-showreel-media');

  if (timelineThumbs.length && scrubProgress) {
    timelineThumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        timelineThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const percent = ((idx + 1) / timelineThumbs.length) * 100;
        scrubProgress.style.width = `${percent}%`;

        const newMediaSrc = thumb.getAttribute('data-preview-src');
        if (newMediaSrc && mainVideoFrame) {
          mainVideoFrame.src = newMediaSrc;
        }
      });
    });
  }

  // Project Detail Modals
  const projectModal = document.getElementById('project-detail-modal');
  if (projectModal) {
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a[href^="tel:"], a[href^="mailto:"]')) return;
        e.preventDefault();
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
  function updateLiveBriefSummary() {
    const briefServicesEl = document.getElementById('brief-live-services');
    const briefTimelineEl = document.getElementById('brief-live-timeline');
    if (briefServicesEl) {
      const active = Array.from(document.querySelectorAll('.chip-toggle.active[data-group="service"]'))
        .map(c => c.textContent.trim());
      briefServicesEl.textContent = active.length ? active.join(' + ') : 'None selected';
    }
    if (briefTimelineEl) {
      const activeT = document.querySelector('.chip-toggle.active[data-group="timeline"]');
      briefTimelineEl.textContent = activeT ? activeT.textContent.trim() : 'Flexible';
    }
  }

  chipToggles.forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.getAttribute('data-group');
      if (group === 'timeline' || group === 'budget') {
        document.querySelectorAll(`.chip-toggle[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      } else {
        chip.classList.toggle('active');
      }
      updateLiveBriefSummary();
    });
  });
  updateLiveBriefSummary();

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

  // ========================================================
  // 9. WORK PAGE: BRAND APPART STACKED CARDS CONTROLLER
  // ========================================================
  const stackContainer = document.getElementById('tiles-stack-container');
  const stackItems = document.querySelectorAll('.tiles_stack_item');
  const shipNavBtns = document.querySelectorAll('.ship-nav-btn');
  const bottomTabsWrap = document.getElementById('bottom-stack-tabs');
  const magneticCursor = document.getElementById('magnetic-case-cursor');

  if (stackContainer && stackItems.length) {
    const cardDefs = [
      { idx: 0, title: '(01) Branding & Identity', color: '#3b35ba' },
      { idx: 1, title: '(02) Film & Motion', color: '#ff493b' },
      { idx: 2, title: '(03) Digital Flagships', color: '#df2626' },
      { idx: 3, title: '(04) Decks & Campaigns', color: '#785f47' }
    ];

    let currentActiveIdx = 0;

    function renderBottomTabs(activeIdx) {
      if (!bottomTabsWrap) return;
      bottomTabsWrap.innerHTML = '';
      
      // Collect cards that are not active
      const underCards = [];
      for (let i = 0; i < cardDefs.length; i++) {
        if (i !== activeIdx) {
          underCards.push(cardDefs[i]);
        }
      }

      underCards.forEach((card, order) => {
        const tab = document.createElement('div');
        tab.className = `stack-tab-layer layer-${order + 1}`;
        tab.style.backgroundColor = card.color;
        tab.setAttribute('data-target-idx', card.idx);
        tab.title = `Switch to ${card.title}`;

        const label = document.createElement('span');
        label.className = 'tab-pill-label';
        label.textContent = card.title;
        tab.appendChild(label);

        tab.addEventListener('click', (e) => {
          e.stopPropagation();
          activateStackCard(card.idx);
        });

        bottomTabsWrap.appendChild(tab);
      });
    }

    function activateStackCard(targetIdx) {
      currentActiveIdx = targetIdx;

      // Update Nav buttons
      shipNavBtns.forEach((btn, idx) => {
        if (idx === targetIdx) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update Stack items
      const underIndices = [];
      for (let i = 0; i < stackItems.length; i++) {
        if (i !== targetIdx) underIndices.push(i);
      }

      stackItems.forEach((item, idx) => {
        item.classList.remove('active', 'under-1', 'under-2', 'under-3');

        if (idx === targetIdx) {
          item.classList.add('active');
          item.style.zIndex = '10';
        } else {
          const underPos = underIndices.indexOf(idx);
          if (underPos === 0) {
            item.classList.add('under-1');
            item.style.zIndex = '8';
          } else if (underPos === 1) {
            item.classList.add('under-2');
            item.style.zIndex = '6';
          } else {
            item.classList.add('under-3');
            item.style.zIndex = '4';
          }
        }
      });

      renderBottomTabs(targetIdx);
    }

    // Nav button event listeners
    shipNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-deck-index'), 10);
        activateStackCard(idx);
      });
    });

    // Magnetic Cursor Badge
    if (magneticCursor) {
      stackContainer.addEventListener('mousemove', (e) => {
        const rect = stackContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        magneticCursor.style.left = `${x}px`;
        magneticCursor.style.top = `${y}px`;
      });
    }

    // Clicking "SEE OUR CASE STUDIES →" pill
    const casePills = document.querySelectorAll('.service-card-case-pill');
    casePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const targetCat = pill.getAttribute('data-open-cat');
        const archiveSection = document.getElementById('work-archive');
        
        // Filter archive
        if (targetCat) {
          const matchingBtn = document.querySelector(`.filter-btn[data-filter="${targetCat}"]`);
          if (matchingBtn) matchingBtn.click();
        }

        if (archiveSection) {
          archiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Clicking individual visual tiles opens the case study modal
    const galleryTiles = document.querySelectorAll('.service-gallery-tile');
    galleryTiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetTitle = tile.getAttribute('data-project-target');
        if (!targetTitle) return;

        const matchingCard = Array.from(document.querySelectorAll('.project-card')).find(card => {
          const cardTitle = card.getAttribute('data-title');
          return cardTitle && cardTitle.toLowerCase().includes(targetTitle.toLowerCase());
        });

        if (matchingCard) {
          matchingCard.click();
        } else {
          // If no specific card, scroll to archive
          const archiveSection = document.getElementById('work-archive');
          if (archiveSection) archiveSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Smooth horizontal dragging on visual galleries
    const galleryWraps = document.querySelectorAll('.service-gallery-wrapper');
    galleryWraps.forEach(wrap => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      wrap.addEventListener('mousedown', (e) => {
        isDown = true;
        wrap.style.cursor = 'grabbing';
        startX = e.pageX - wrap.offsetLeft;
        scrollLeft = wrap.scrollLeft;
      });

      wrap.addEventListener('mouseleave', () => {
        isDown = false;
        wrap.style.cursor = 'grab';
      });

      wrap.addEventListener('mouseup', () => {
        isDown = false;
        wrap.style.cursor = 'grab';
      });

      wrap.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrap.offsetLeft;
        const walk = (x - startX) * 1.8;
        wrap.scrollLeft = scrollLeft - walk;
      });
    });

    // Initialize bottom tabs on load
    renderBottomTabs(0);
  }

});

