// 4—11 STUDIO® x Brand Appart Engine: Exact Animations, Reactions, Orbit Wheel, Sticky Process, FAQ & Bouncing Keychain Physics

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. SCROLL PROGRESS INDICATOR (VERTICAL TRACKER ON RIGHT)
  // ========================================================
  const progressLine = document.querySelector('.page_scroll_progress');
  const progressCursor = document.querySelector('.scroll_progress_cursor');

  function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressCursor) {
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      progressCursor.style.transform = `translateY(${progress * 60}px)`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ========================================================
  // 2. ORBITING ROTATING PROJECT CIRCLE (#seemore)
  // ========================================================
  const circleList = document.querySelector('.project_circle_list');
  const circleItems = document.querySelectorAll('.project_circle_item');
  const seeMoreSection = document.getElementById('seemore');

  if (circleList && circleItems.length > 0) {
    let currentRotation = -120;
    let targetRotation = -120;
    let autoSpeed = 0.08; // ambient continuous drift
    let isDragging = false;
    let startX = 0;
    let dragStartRotation = 0;
    let isHovered = false;
    let lastScrollY = window.scrollY;

    // Distribute items radially around 360 degrees
    const totalItems = circleItems.length;
    const angleStep = 360 / totalItems;

    circleItems.forEach((item, idx) => {
      const angle = angleStep * idx;
      item.style.transform = `rotate(${angle}deg)`;
      const card = item.querySelector('.projects_circle_card');
      if (card) {
        card.addEventListener('mouseenter', () => { isHovered = true; });
        card.addEventListener('mouseleave', () => { isHovered = false; });
      }
    });

    // Accelerated rotation on scroll
    window.addEventListener('scroll', () => {
      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetRotation += deltaY * 0.12;
    }, { passive: true });

    // Drag to spin with mouse / touch
    if (seeMoreSection) {
      seeMoreSection.addEventListener('mousedown', (e) => {
        if (e.target.closest('a')) return;
        isDragging = true;
        startX = e.clientX;
        dragStartRotation = targetRotation;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.clientX - startX;
        targetRotation = dragStartRotation + diffX * 0.35;
      });

      window.addEventListener('mouseup', () => { isDragging = false; });

      seeMoreSection.addEventListener('touchstart', (e) => {
        if (e.target.closest('a')) return;
        isDragging = true;
        startX = e.touches[0].clientX;
        dragStartRotation = targetRotation;
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diffX = e.touches[0].clientX - startX;
        targetRotation = dragStartRotation + diffX * 0.4;
      }, { passive: true });

      window.addEventListener('touchend', () => { isDragging = false; });
    }

    // Animation Loop
    function renderOrbit() {
      if (!isHovered && !isDragging) {
        targetRotation += autoSpeed;
      }
      currentRotation += (targetRotation - currentRotation) * 0.08;
      circleList.style.transform = `rotate(${currentRotation}deg)`;
      requestAnimationFrame(renderOrbit);
    }
    renderOrbit();
  }

  // ========================================================
  // 3. MAGNETIC PROCESS CURSOR ("SEE OUR CASE STUDIES ->")
  // ========================================================
  const processSection = document.getElementById('services');
  const magneticCursor = document.querySelector('.c-tiles-stack .cursor');

  if (processSection && magneticCursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isInside = false;

    processSection.addEventListener('mouseenter', () => {
      isInside = true;
      magneticCursor.style.opacity = '1';
      magneticCursor.style.visibility = 'visible';
    });

    processSection.addEventListener('mouseleave', () => {
      isInside = false;
      magneticCursor.style.opacity = '0';
      magneticCursor.style.visibility = 'hidden';
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderMagneticCursor() {
      if (isInside) {
        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;
        magneticCursor.style.transform = `translate3d(${cursorX + 16}px, ${cursorY + 16}px, 0)`;
      }
      requestAnimationFrame(renderMagneticCursor);
    }
    renderMagneticCursor();
  }

  // ========================================================
  // 4. STICKY PROCESS STACK CARDS SCROLL EFFECT
  // ========================================================
  const stackItems = document.querySelectorAll('.tiles_stack_item');
  if (stackItems.length > 0) {
    function updateStacking() {
      const vh = window.innerHeight;
      stackItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const topProgress = rect.top / vh;
        if (topProgress < 0.25 && topProgress > -0.6) {
          const depth = Math.max(0, (0.25 - topProgress) * 20);
          const scale = Math.max(0.92, 1 - (0.25 - topProgress) * 0.08);
          item.style.transform = `scale(${scale}) translateY(-${depth}px)`;
        } else if (topProgress >= 0.25) {
          item.style.transform = `scale(1) translateY(0)`;
        }
      });
    }
    window.addEventListener('scroll', updateStacking, { passive: true });
    updateStacking();
  }

  // ========================================================
  // 5. INDUSTRY VIDEO PLAYER & AUDIO MUTE TOGGLE
  // ========================================================
  const muteBtn = document.querySelector('.industry_video_mute');
  const vimeoFrame = document.querySelector('.industry_video_plyr iframe');
  let isMuted = true;

  if (muteBtn && vimeoFrame) {
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      const vol = isMuted ? 0 : 1;
      vimeoFrame.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: vol }), '*');
      muteBtn.innerHTML = isMuted
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="icon"><path d="M11 5 6 9H2v6h4l5 4V5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="m16 9 5 6m0-6-5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="icon"><path d="M11 5 6 9H2v6h4l5 4V5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>`;
    });
  }

  // ========================================================
  // 6. ACCORDION FAQ (INTERACTIVE EXPAND / COLLAPSE)
  // ========================================================
  const faqItems = document.querySelectorAll('.faq-question-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = question.classList.contains('--open');

        // Close all others
        faqItems.forEach(other => {
          const q = other.querySelector('.faq-question');
          const a = other.querySelector('.faq-answer');
          if (q && a) {
            q.classList.remove('--open');
            a.style.height = '0px';
          }
        });

        // Toggle current
        if (!isOpen) {
          question.classList.add('--open');
          answer.style.height = `${answer.scrollHeight}px`;
        }
      });
    }
  });

  // ========================================================
  // 7. BOUNCING KEYCHAIN BADGES (PHYSICS SIMULATION IN FOOTER)
  // ========================================================
  const keysContainer = document.querySelector('.c-keys-bounce');
  const keyImages = document.querySelectorAll('.keys-bounce-items img');

  if (keysContainer && keyImages.length > 0) {
    const itemsData = Array.from(keyImages).map((img, i) => {
      return {
        el: img,
        x: Math.random() * 200 + 40 * i,
        y: Math.random() * 80 + 20,
        vx: (Math.random() * 2 - 1) * 1.5,
        vy: (Math.random() * 2 - 1) * 1.5,
        rot: Math.random() * 360,
        vRot: (Math.random() * 2 - 1) * 0.8,
        width: 140,
        height: 140
      };
    });

    function stepPhysics() {
      const containerRect = keysContainer.getBoundingClientRect();
      const maxX = containerRect.width;
      const maxY = containerRect.height;

      if (maxX > 0 && maxY > 0) {
        itemsData.forEach((item) => {
          item.x += item.vx;
          item.y += item.vy;
          item.rot += item.vRot;

          // Wall collision left / right
          if (item.x <= 0) {
            item.x = 0;
            item.vx *= -1;
            item.vRot = (Math.random() - 0.5) * 1.5;
          } else if (item.x + item.width >= maxX) {
            item.x = maxX - item.width;
            item.vx *= -1;
            item.vRot = (Math.random() - 0.5) * 1.5;
          }

          // Wall collision top / bottom
          if (item.y <= 0) {
            item.y = 0;
            item.vy *= -1;
            item.vRot = (Math.random() - 0.5) * 1.5;
          } else if (item.y + item.height >= maxY) {
            item.y = maxY - item.height;
            item.vy *= -1;
            item.vRot = (Math.random() - 0.5) * 1.5;
          }

          item.el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) rotate(${item.rot.toFixed(1)}deg)`;
        });
      }
      requestAnimationFrame(stepPhysics);
    }
    requestAnimationFrame(stepPhysics);
  }

  // ========================================================
  // 8. FLYOUT NAVIGATION DRAWERS (INDUSTRIES, SERVICES, MENU)
  // ========================================================
  const navButtons = document.querySelectorAll('[aria-controls^="nav-flyout"]');
  const flyouts = document.querySelectorAll('.nav_flyout');
  const overlay = document.querySelector('.nav_overlay');
  const mobileToggle = document.querySelector('.menu_toggle');

  function closeAllFlyouts() {
    flyouts.forEach(f => f.removeAttribute('data-state'));
    navButtons.forEach(b => b.setAttribute('aria-expanded', 'false'));
    if (overlay) overlay.style.display = 'none';
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const flyoutId = btn.getAttribute('aria-controls');
      const targetFlyout = document.getElementById(flyoutId);
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeAllFlyouts();
      } else {
        closeAllFlyouts();
        btn.setAttribute('aria-expanded', 'true');
        if (targetFlyout) {
          targetFlyout.setAttribute('data-state', 'open');
        }
        if (overlay) overlay.style.display = 'block';
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const menuFlyout = document.getElementById('nav-flyout-menu');
      if (menuFlyout) {
        const isOpen = menuFlyout.getAttribute('data-state') === 'open';
        if (isOpen) {
          closeAllFlyouts();
        } else {
          closeAllFlyouts();
          menuFlyout.setAttribute('data-state', 'open');
          if (overlay) overlay.style.display = 'block';
        }
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeAllFlyouts);
  }

  // ========================================================
  // 9. CASE STUDY MODAL DETAILS (CLICK ANY CASE/CARD)
  // ========================================================
  const projectModal = document.getElementById('project-detail-modal');
  const modalClose = document.querySelector('.modal-close-btn');

  const caseData = {
    'Bricks': {
      title: 'Bricks — Real Estate Tokenization',
      client: 'Bricks Technologies',
      year: '2025',
      cat: 'Fintech & Investment Deck',
      desc: 'Institutional fundraising deck that transformed fractional real estate mechanics into an airtight, high-conviction narrative for Tier-1 European funds.',
      tags: ['Narrative Strategy', 'Slide Architecture', 'Data Viz', 'Series A Pitch']
    },
    'Gostan': {
      title: 'Gostan — Maritime AI Logistics',
      client: 'Gostan Autonomous',
      year: '2026',
      cat: 'Deep Tech & AI Deck',
      desc: 'Engineered an investor narrative showing freight efficiency through computer vision, structuring complex technical claims into instant visual clarity.',
      tags: ['Deep Tech Strategy', '3D Graphics', 'Seed Round', 'Investor Pitch']
    },
    'Forbes': {
      title: 'Forbes — Media & Scale Narrative',
      client: 'Forbes Media Group',
      year: '2025',
      cat: 'Media & Keynote Presentation',
      desc: 'Designed high-stakes presentation deck communicating global audience scale, brand legacy, and scalable multi-channel monetization pathways.',
      tags: ['Executive Presentation', 'Editorial Design', 'Brand Coherence']
    },
    'Incard': {
      title: 'Incard — Next-Gen Corporate Finance',
      client: 'Incard FinTech',
      year: '2025',
      cat: 'Fintech & Product Suite',
      desc: 'From brand positioning to fundraising materials, created a cohesive visual language that helped secure major institutional funding rounds.',
      tags: ['Fintech Suite', 'Investor Deck', 'Visual Identity', 'Series A']
    },
    'Sobry': {
      title: 'Sobry — Cognitive Audio Intelligence',
      client: 'Sobry Audio',
      year: '2026',
      cat: 'Consumer Tech & Pitch Deck',
      desc: 'Custom kinetic presentation deck crafted to show acoustic AI synthesis for international venture syndicates.',
      tags: ['Acoustic AI', 'Keynote Deck', 'Venture Round']
    },
    'Notez-Nous': {
      title: 'Notez-Nous — Trust & Verification Protocol',
      client: 'Notez-Nous SAS',
      year: '2025',
      cat: 'B2B SaaS Platform',
      desc: 'Comprehensive B2B investor presentation making complex compliance, customer acquisition metrics, and viral loops crystal clear.',
      tags: ['B2B SaaS', 'Financial Modeling Viz', 'Seed to Series A']
    }
  };

  document.querySelectorAll('[data-case-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetName = trigger.getAttribute('data-case-target');
      const data = caseData[targetName] || caseData['Bricks'];
      if (projectModal && data) {
        document.getElementById('modal-proj-title').textContent = data.title;
        document.getElementById('modal-proj-client').textContent = data.client;
        document.getElementById('modal-proj-year').textContent = data.year;
        document.getElementById('modal-proj-cat').textContent = data.cat;
        document.getElementById('modal-proj-desc').textContent = data.desc;
        const tagsBox = document.getElementById('modal-proj-tags');
        if (tagsBox) {
          tagsBox.innerHTML = data.tags.map(t => `<span class="pillar-tag">${t}</span>`).join('');
        }
        projectModal.classList.add('open');
      }
    });
  });

  if (modalClose && projectModal) {
    modalClose.addEventListener('click', () => projectModal.classList.remove('open'));
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.remove('open');
    });
  }

});
