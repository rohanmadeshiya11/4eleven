// 4—11 STUDIO® x Brand Appart Engine: Indian Desi Theme, Interactive Pop-Art Physics, Orbit Wheel, Sticky Process, FAQ & Bouncing Badges

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. FLOATING RETRO HINDI POP-ART PARALLAX & SCATTER PHYSICS ("PLAY WITH ELEMENTS")
  // ========================================================
  const retroElements = document.querySelectorAll('.retro-element');
  
  if (!window.__MAIN_ENGINE_ACTIVE__ && retroElements.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const ease = 0.06;

    // Track state for each element
    const elementStates = Array.from(retroElements).map(() => ({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 0.08
    }));

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    }, { passive: true });

    // Gyroscope tilt on mobile
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          mouseX = (e.gamma || 0) * 8;
          mouseY = ((e.beta || 0) - 45) * 8;
        }
      }, { passive: true });
    }

    // Physics animation loop
    function renderParallax() {
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      retroElements.forEach((el, i) => {
        const state = elementStates[i];
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

    // Scatter elements when clicked ("Play with elements!")
    function scatterAllElements(clickedElement) {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const padding = Math.min(60, screenW * 0.06);

      const isMobile = screenW <= 768;
      const safeCenterW = isMobile ? screenW * 0.75 : Math.min(680, screenW * 0.6);
      const safeCenterH = isMobile ? screenH * 0.65 : Math.min(380, screenH * 0.5);
      const centerMinX = (screenW - safeCenterW) / 2;
      const centerMaxX = (screenW + safeCenterW) / 2;
      const centerMinY = (screenH - safeCenterH) / 2;
      const centerMaxY = (screenH + safeCenterH) / 2;

      const isWorkPage = document.body.classList.contains('work-page');

      retroElements.forEach((el, i) => {
        const state = elementStates[i];
        const rect = el.getBoundingClientRect();
        const elW = rect.width || 140;
        const elH = rect.height || 60;

        const originX = rect.left - state.x;
        const originY = rect.top - state.y;

        let destX, destY;
        if (isWorkPage && screenW > 900) {
          const minDestX = screenW * 0.56;
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

          if (destX + elW > centerMinX && destX < centerMaxX && destY + elH > centerMinY && destY < centerMaxY) {
            if (Math.random() > 0.5) {
              destX = Math.random() > 0.5 ? padding : screenW - elW - padding;
            } else {
              destY = Math.random() > 0.5 ? padding : screenH - elH - padding;
            }
          }
        }

        state.targetX = destX - originX;
        state.targetY = destY - originY;
        state.speed = (el === clickedElement) ? 0.14 : 0.06 + Math.random() * 0.05;
      });

      if (clickedElement) {
        clickedElement.classList.add('element-clicked-burst');
        setTimeout(() => {
          clickedElement.classList.remove('element-clicked-burst');
        }, 500);
      }
    }

    retroElements.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        scatterAllElements(el);
      });
    });
  }

  // ========================================================
  // 2. 4—11 ROCKET SHIP VOYAGER (AUTONOMOUS FLIGHT + TURBO BOOST ON CLICK)
  // ========================================================
  const rocket = document.getElementById('rocket-411');

  if (!window.__MAIN_ENGINE_ACTIVE__ && rocket) {
    let screenW = window.innerWidth;
    const isWorkPage = document.body.classList.contains('work-page');
    let minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.56 : 30;

    let posX = (isWorkPage && screenW > 900)
      ? screenW * 0.62 + Math.random() * (screenW * 0.25)
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
      minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.56 : 30;
    }, { passive: true });

    function pickRandomWaypoint() {
      const margin = 70;
      minBoundX = (isWorkPage && screenW > 900) ? screenW * 0.56 : margin;
      targetX = minBoundX + Math.random() * (screenW - minBoundX - margin);
      targetY = margin + Math.random() * (screenH - margin * 2);
    }
    pickRandomWaypoint();

    function updateRocket() {
      const dx = targetX - posX;
      const dy = targetY - posY;
      const dist = Math.hypot(dx, dy);

      const desiredAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      let diffAngle = (desiredAngle - currentAngle + 180) % 360 - 180;
      currentAngle += diffAngle * 0.045;

      const rad = currentAngle * (Math.PI / 180);
      const currentSpeed = isBoosting ? speed * 2.8 : speed;
      posX += Math.cos(rad) * currentSpeed;
      posY += Math.sin(rad) * currentSpeed;

      if (dist < 90) {
        pickRandomWaypoint();
      }

      if (posX < minBoundX) { posX = minBoundX; pickRandomWaypoint(); }
      if (posX > screenW - 30) { posX = screenW - 30; pickRandomWaypoint(); }
      if (posY < 30) { posY = 30; pickRandomWaypoint(); }
      if (posY > screenH - 30) { posY = screenH - 30; pickRandomWaypoint(); }

      rocket.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0) rotate(${currentAngle.toFixed(1)}deg)`;
      requestAnimationFrame(updateRocket);
    }
    requestAnimationFrame(updateRocket);

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
  // 3. STICKY HEADER SCROLL DETECTION
  // ========================================================
  const header = document.querySelector('.top-header') || document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // ========================================================
  // 4. ORBITING ROTATING PROJECT CIRCLE (#seemore)
  // ========================================================
  const circleList = document.querySelector('.project_circle_list');
  const circleItems = document.querySelectorAll('.project_circle_item');
  const seeMoreSection = document.getElementById('seemore');

  if (circleList && circleItems.length > 0) {
    let currentRotation = -120;
    let targetRotation = -120;
    let autoSpeed = 0.08;
    let isDragging = false;
    let startX = 0;
    let dragStartRotation = 0;
    let isHovered = false;
    let lastScrollY = window.scrollY;

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

    window.addEventListener('scroll', () => {
      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetRotation += deltaY * 0.12;
    }, { passive: true });

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
  // 5. MAGNETIC PROCESS CURSOR
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
    }, { passive: true });

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
  // 6. PROCESS STACK CARDS (MANAGED VIA BRAND APPART DECK CONTROLLER IN MAIN.JS)
  // ========================================================

  // ========================================================
  // 7. INDUSTRY VIDEO PLAYER & AUDIO MUTE TOGGLE
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
  // 8. ACCORDION FAQ (INTERACTIVE EXPAND / COLLAPSE)
  // ========================================================
  const faqItems = document.querySelectorAll('.faq-question-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = question.classList.contains('--open');

        faqItems.forEach(other => {
          const q = other.querySelector('.faq-question');
          const a = other.querySelector('.faq-answer');
          if (q && a) {
            q.classList.remove('--open');
            a.style.height = '0px';
          }
        });

        if (!isOpen) {
          question.classList.add('--open');
          answer.style.height = `${answer.scrollHeight}px`;
        }
      });
    }
  });

  // ========================================================
  // 9. BOUNCING KEYCHAIN BADGES (PHYSICS SIMULATION IN FOOTER)
  // ========================================================
  const keysContainer = document.querySelector('.c-keys-bounce');
  const keyItems = document.querySelectorAll('.keys-bounce-items img, .keys-bounce-items .desi-key-badge');

  if (keysContainer && keyItems.length > 0) {
    const itemsData = Array.from(keyItems).map((img, i) => {
      return {
        el: img,
        x: Math.random() * 200 + 45 * i,
        y: Math.random() * 80 + 20,
        vx: (Math.random() * 2 - 1) * 1.5,
        vy: (Math.random() * 2 - 1) * 1.5,
        rot: Math.random() * 360,
        vRot: (Math.random() * 2 - 1) * 0.8,
        width: 130,
        height: 130
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

          if (item.x <= 0) {
            item.x = 0;
            item.vx *= -1;
          } else if (item.x + item.width >= maxX) {
            item.x = maxX - item.width;
            item.vx *= -1;
          }

          if (item.y <= 0) {
            item.y = 0;
            item.vy *= -1;
          } else if (item.y + item.height >= maxY) {
            item.y = maxY - item.height;
            item.vy *= -1;
          }

          item.el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) rotate(${item.rot.toFixed(1)}deg)`;
        });
      }

      requestAnimationFrame(stepPhysics);
    }
    requestAnimationFrame(stepPhysics);

    keyItems.forEach((el, index) => {
      el.addEventListener('click', () => {
        const item = itemsData[index];
        if (item) {
          item.vx = (Math.random() * 2 - 1) * 7;
          item.vy = -Math.abs(Math.random() * 7 + 4);
          item.vRot = (Math.random() * 2 - 1) * 12;
        }
      });
    });
  }

  // ========================================================
  // 10. CASE STUDY DETAIL MODAL (FOR ALL 12 PROJECTS)
  // ========================================================
  const projectModal = document.getElementById('project-detail-modal');
  const modalClose = document.querySelector('.modal-close-btn');

  const caseData = {
    'Faizan Bhatt': {
      title: 'Faizan Bhatt — Stand-up Comedy',
      client: 'Faizan Bhatt',
      year: '2025–2026',
      cat: 'Artist & Comedy Content // कलाकार',
      image: 'assets/projects/faizan-bhatt.png',
      desc: 'Supporting his creative journey through engaging video edits, high-retention comedy reels, and eye-catching promotional poster designs for live shows.',
      tags: ['Video Editing', 'Poster Design', 'Reels Strategy', 'Show Branding', 'सुपरहिट Comedy']
    },
    'Sushmita Mukherjee': {
      title: 'Sushmita Mukherjee — Media Presence & PR',
      client: 'Sushmita Mukherjee',
      year: '2025–2026',
      cat: 'Celebrity & Entertainment // स्टार पीआर',
      image: 'assets/projects/sushmita-mukherjee.jpg',
      desc: 'Managing her social media presence, coordinating strategic brand collaborations, and supporting event publicity and high-visibility PR activities.',
      tags: ['Social Media Management', 'Brand Collaborations', 'Event PR', 'Publicity', 'Entertainment']
    },
    'Pronto': {
      title: 'Pronto — Brand Content & Platforms',
      client: 'Pronto Digital',
      year: '2025',
      cat: 'Brand & Commercial // 100% खरा',
      image: 'assets/projects/pronto.png',
      desc: 'Creating polished video content and visual artwork to support brand communication, promotional releases, and multi-channel digital platforms.',
      tags: ['Video Editing', 'Artwork Design', 'Brand Communication', 'Digital Assets']
    },
    'Nashia Kondia': {
      title: 'Nashia Kondia — Podcast Post-Production',
      client: 'Nashia Kondia Project',
      year: '2025–2026',
      cat: 'Podcast & Long-Form Production // पॉडकास्ट',
      image: 'assets/projects/nashia-kondia.jpg',
      desc: 'Transforming recorded conversations into polished, engaging podcast episodes through professional multi-cam editing, audio mastering, and episodic artwork.',
      tags: ['Podcast Editing', 'Post-Production', 'Audio Mastering', 'Episodic Content']
    },
    'Traya Health': {
      title: 'Traya Health — Digital Content Production',
      client: 'Traya Health',
      year: '2025',
      cat: 'Health & Wellness // वेलनेस',
      image: 'assets/projects/traya-health.png',
      desc: 'Supporting digital content production through high-converting video editing, brand storytelling, and agile creative execution.',
      tags: ['Video Editing', 'Digital Content', 'Health & Wellness', 'Creative Execution']
    },
    'Kibo Hair Science': {
      title: 'Kibo Hair Science — YouTube & Visual Production',
      client: 'Kibo Hair Science',
      year: '2025–2026',
      cat: 'Healthcare & Hair Science // यूट्यूब ग्रोथ',
      image: 'assets/projects/kibo-hair-science.png',
      desc: 'Creating authoritative YouTube content with long-form and short-form video editing, clickable thumbnail engineering, and content production.',
      tags: ['Video Editing', 'Thumbnail Design', 'Content Production', 'YouTube Growth']
    },
    'mCaffeine': {
      title: 'mCaffeine — Visual Content & Campaigns',
      client: 'mCaffeine D2C',
      year: '2025',
      cat: 'Beauty & Skincare // D2C अभियान',
      image: 'assets/projects/mcaffeine.jpg',
      desc: 'Creative content and visual assets crafted for impactful digital communication, product campaigns, and brand presence.',
      tags: ['Creative Design', 'Social Media Creatives', 'D2C Campaigns', 'Brand Visuals']
    },
    'Dr. Pal': {
      title: 'Dr. Pal — Digital Video & Content',
      client: 'Dr. Pal Digital',
      year: '2025–2026',
      cat: 'Digital Video Content // वायरल एडिट',
      image: 'assets/projects/dr-pal.webp',
      desc: 'Supporting digital video content through fast-paced editing, visual creative assets, and high-CTR thumbnail designs.',
      tags: ['Video Editing', 'Thumbnail Design', 'Visual Assets', 'Educational Video']
    },
    'Dr. Kumar Vishwas': {
      title: 'Dr. Kumar Vishwas — Media & Entertainment',
      client: 'Dr. Kumar Vishwas',
      year: '2025–2026',
      cat: 'Media & Entertainment // साहित्य & कला',
      image: 'assets/projects/dr-kumar-vishwas.jpg',
      desc: 'Creative and promotional media work for cultural entertainment, televised appearances, and digital platforms.',
      tags: ['Creative Content', 'Promotional Artwork', 'Stage & Digital PR', 'Media Work']
    },
    'Himeya': {
      title: 'Himeya — Product Visuals & Identity',
      client: 'Himeya Living & Personal Care',
      year: '2025',
      cat: 'Beauty & Personal Care // लक्ज़री डिजाइन',
      image: 'assets/projects/himeya.jpg',
      desc: 'Visual content and bespoke creative design supporting product communication, digital storytelling, and brand identity.',
      tags: ['Creative Design', 'Product Visuals', 'Brand Identity', 'Product Communication']
    },
    'Rock Paper Rum': {
      title: 'Rock Paper Rum — Lifestyle & Artwork',
      client: 'Rock Paper Rum',
      year: '2025',
      cat: 'Lifestyle & Beverage // लाइफस्टाइल',
      image: 'assets/projects/rock-paper-rum.jpg',
      desc: 'Creative artwork and promotional visuals engineered for distinctive brand communication and product launches.',
      tags: ['Graphic Design', 'Promotional Artwork', 'Lifestyle & Beverage', 'Brand Identity']
    },
    'Halwa Tour Poster': {
      title: 'Halwa Tour Poster — Campaign Typography',
      client: 'Halwa Tour Productions',
      year: '2025',
      cat: 'Poster & Campaign Design // टूर पोस्टर मास्टर',
      image: 'assets/projects/halwa-tour.jpg',
      desc: 'Poster design focused on expressive typography, dynamic visual composition, and promotional communication across tour stops.',
      tags: ['Poster Design', 'Typography', 'Artwork Design', 'Campaign Identity']
    }
  };

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
        const modalImg = document.getElementById('modal-proj-image');
        const modalImgBox = document.getElementById('modal-proj-image-container');
        if (modalImg && data.image) {
          modalImg.src = data.image;
          modalImg.alt = data.title;
          if (modalImgBox) modalImgBox.style.display = 'block';
        } else if (modalImgBox) {
          modalImgBox.style.display = 'none';
        }
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
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('open')) {
        projectModal.classList.remove('open');
      }
    });
  }

  // ========================================================
  // 11. PORTFOLIO CATEGORY FILTER TABS
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

  // ========================================================
  // 12. LIVE MUMBAI IST CLOCK (SYNCHRONIZED ACROSS STUDIO)
  // ========================================================
  const clockElements = document.querySelectorAll('#mumbaiClockWork, #mumbaiClockHero, #about-ist-clock, #live-ist-time');
  function updateWorkClock() {
    if (clockElements.length === 0) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const timeStr = formatter.format(now);
    clockElements.forEach(el => {
      if (el.id === 'about-ist-clock') {
        el.textContent = `${timeStr} IST`;
      } else {
        el.textContent = `MUMBAI, IN ${timeStr} IST`;
      }
    });
  }
  updateWorkClock();
  setInterval(updateWorkClock, 1000);

  // ========================================================
  // 13. DRAWER AUTO-CLOSE & MODAL INQUIRE NAVIGATION
  // ========================================================
  const drawerLinks = document.querySelectorAll('#menu-drawer .drawer-nav-item');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menuDrawer = document.getElementById('menu-drawer');
      if (menuDrawer) menuDrawer.classList.remove('open');
    });
  });

  const modalInquireBtn = document.getElementById('modal-inquire-btn');
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      if (projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================================
  // 14. SINGLE-PAGE SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
  // ========================================================
  const navSections = document.querySelectorAll('section[id], div[id="top"]');
  const navLinks = document.querySelectorAll('.desktop_nav_links .nav_text_link');

  function updateActiveNavLink() {
    let currentId = '';
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    navSections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}` || (currentId === 'top' && href === '#top')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ========================================================
  // 15. KEYBOARD (ESC) LISTENER FOR MODAL & DRAWER
  // ========================================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.style.display === 'flex') {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
      }
      const menuDrawer = document.getElementById('menu-drawer');
      if (menuDrawer && menuDrawer.classList.contains('open')) {
        menuDrawer.classList.remove('open');
      }
    }
  });

});
