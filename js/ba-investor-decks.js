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
    'Faizan Bhatt': {
      title: 'Faizan Bhatt — Stand-up Comedy',
      client: 'Faizan Bhatt',
      year: '2025–2026',
      cat: 'Artist & Comedy Content',
      desc: 'Supporting his creative journey through engaging video edits, high-retention comedy reels, and eye-catching promotional poster designs for live shows.',
      tags: ['Video Editing', 'Poster Design', 'Reels Strategy', 'Show Branding']
    },
    'Sushmita Mukherjee': {
      title: 'Sushmita Mukherjee — Media Presence & PR',
      client: 'Sushmita Mukherjee',
      year: '2025–2026',
      cat: 'Celebrity & Entertainment',
      desc: 'Managing her social media presence, coordinating strategic brand collaborations, and supporting event publicity and high-visibility PR activities.',
      tags: ['Social Media Management', 'Brand Collaborations', 'Event PR', 'Publicity']
    },
    'Pronto': {
      title: 'Pronto — Brand Content & Platforms',
      client: 'Pronto Digital',
      year: '2025',
      cat: 'Brand & Commercial',
      desc: 'Creating polished video content and visual artwork to support brand communication, promotional releases, and multi-channel digital platforms.',
      tags: ['Video Editing', 'Artwork Design', 'Brand Communication', 'Digital Assets']
    },
    'Nashia Kondia': {
      title: 'Nashia Kondia — Podcast Post-Production',
      client: 'Nashia Kondia Project',
      year: '2025–2026',
      cat: 'Podcast & Long-Form Production',
      desc: 'Transforming recorded conversations into polished, engaging podcast episodes through professional multi-cam editing, audio mastering, and episodic artwork.',
      tags: ['Podcast Editing', 'Post-Production', 'Audio Mastering', 'Episodic Content']
    },
    'Traya Health': {
      title: 'Traya Health — Digital Content Production',
      client: 'Traya Health',
      year: '2025',
      cat: 'Health & Wellness',
      desc: 'Supporting digital content production through high-converting video editing, brand storytelling, and agile creative execution.',
      tags: ['Video Editing', 'Digital Content', 'Health & Wellness', 'Creative Execution']
    },
    'Kibo Hair Science': {
      title: 'Kibo Hair Science — YouTube & Visual Production',
      client: 'Kibo Hair Science',
      year: '2025–2026',
      cat: 'Healthcare & Hair Science',
      desc: 'Creating authoritative YouTube content with long-form and short-form video editing, clickable thumbnail engineering, and content production.',
      tags: ['Video Editing', 'Thumbnail Design', 'Content Production', 'YouTube Growth']
    },
    'mCaffeine': {
      title: 'mCaffeine — Visual Content & Campaigns',
      client: 'mCaffeine D2C',
      year: '2025',
      cat: 'Beauty & Skincare',
      desc: 'Creative content and visual assets crafted for impactful digital communication, product campaigns, and brand presence.',
      tags: ['Creative Design', 'Social Media Creatives', 'D2C Campaigns', 'Brand Visuals']
    },
    'Dr. Pal': {
      title: 'Dr. Pal — Digital Video & Content',
      client: 'Dr. Pal Digital',
      year: '2025–2026',
      cat: 'Digital Video Content',
      desc: 'Supporting digital video content through fast-paced editing, visual creative assets, and high-CTR thumbnail designs.',
      tags: ['Video Editing', 'Thumbnail Design', 'Visual Assets', 'Educational Video']
    },
    'Dr. Kumar Vishwas': {
      title: 'Dr. Kumar Vishwas — Media & Entertainment',
      client: 'Dr. Kumar Vishwas',
      year: '2025–2026',
      cat: 'Media & Entertainment',
      desc: 'Creative and promotional media work for cultural entertainment, televised appearances, and digital platforms.',
      tags: ['Creative Content', 'Promotional Artwork', 'Stage & Digital PR', 'Media Work']
    },
    'Himeya': {
      title: 'Himeya — Product Visuals & Identity',
      client: 'Himeya Living & Personal Care',
      year: '2025',
      cat: 'Beauty & Personal Care',
      desc: 'Visual content and bespoke creative design supporting product communication, digital storytelling, and brand identity.',
      tags: ['Creative Design', 'Product Visuals', 'Brand Identity', 'Product Communication']
    },
    'Rock Paper Rum': {
      title: 'Rock Paper Rum — Lifestyle & Artwork',
      client: 'Rock Paper Rum',
      year: '2025',
      cat: 'Lifestyle & Beverage',
      desc: 'Creative artwork and promotional visuals engineered for distinctive brand communication and product launches.',
      tags: ['Graphic Design', 'Promotional Artwork', 'Lifestyle & Beverage', 'Brand Identity']
    },
    'Halwa Tour Poster': {
      title: 'Halwa Tour Poster — Campaign Typography',
      client: 'Halwa Tour Productions',
      year: '2025',
      cat: 'Poster & Campaign Design',
      desc: 'Poster design focused on expressive typography, dynamic visual composition, and promotional communication across tour stops.',
      tags: ['Poster Design', 'Typography', 'Artwork Design', 'Campaign Identity']
    }
  };

  // Backwards compatibility aliases
  caseData['Bricks'] = caseData['Traya Health'];
  caseData['Gostan'] = caseData['Kibo Hair Science'];
  caseData['Forbes'] = caseData['Dr. Kumar Vishwas'];
  caseData['Incard'] = caseData['mCaffeine'];
  caseData['Sobry'] = caseData['Faizan Bhatt'];
  caseData['Notez-Nous'] = caseData['Pronto'];

  document.querySelectorAll('[data-case-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetName = trigger.getAttribute('data-case-target');
      const data = caseData[targetName] || caseData['Faizan Bhatt'];
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

  // ========================================================
  // 10. PORTFOLIO CATEGORY FILTER TABS
  // ========================================================
  const filterPills = document.querySelectorAll('.filter_pill');
  const portfolioCards = document.querySelectorAll('.portfolio_card');

  if (filterPills.length > 0 && portfolioCards.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterValue = pill.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCat === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => { card.style.display = 'none'; }, 200);
          }
        });
      });
    });
  }

});

