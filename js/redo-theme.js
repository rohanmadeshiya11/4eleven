/* ==========================================================================
   4ELEVEN STUDIO × REDO MEDIA THEME JAVASCRIPT
   Interactions: 3D Flipping Cards, Scroll-Scrub Text Reveal, 3D Carousel,
                 Fanned Testimonials Slider, Copy Email Toast, Modal Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Indian Standard Time (IST) Clock
  const clockEl = document.getElementById('studio-live-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. 3D Flipping Cards Interaction (Click & Hover)
  const flipCards = document.querySelectorAll('.redo-flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  // 3. Scroll-Scrub Word Illumination (Section 02)
  const scrubSection = document.getElementById('scrub-section');
  const scrubWords = document.querySelectorAll('.redo-scrub-word');
  
  function handleScrollScrub() {
    if (!scrubSection || !scrubWords.length) return;
    const rect = scrubSection.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    const startY = windowH * 0.85;
    const endY = -rect.height * 0.2;
    const currentY = rect.top;
    
    let progress = (startY - currentY) / (startY - endY);
    progress = Math.max(0, Math.min(1, progress));
    
    const activeWordCount = Math.floor(progress * scrubWords.length);
    scrubWords.forEach((word, index) => {
      if (index <= activeWordCount) {
        word.classList.add('active');
      } else {
        word.classList.remove('active');
      }
    });
  }

  // 4. Featured Work 3D Carousel
  const slides = document.querySelectorAll('.redo-carousel-slide');
  const prevBtn = document.querySelector('.redo-carousel-btn-prev');
  const nextBtn = document.querySelector('.redo-carousel-btn-next');
  let currentSlide = 0;

  function updateCarousel() {
    if (!slides.length) return;
    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev', 'next', 'hidden-slide');
      const total = slides.length;
      const prevIdx = (currentSlide - 1 + total) % total;
      const nextIdx = (currentSlide + 1) % total;

      if (idx === currentSlide) {
        slide.classList.add('active');
      } else if (idx === prevIdx) {
        slide.classList.add('prev');
      } else if (idx === nextIdx) {
        slide.classList.add('next');
      } else {
        slide.classList.add('hidden-slide');
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });

    slides.forEach((slide, idx) => {
      slide.addEventListener('click', () => {
        if (idx !== currentSlide) {
          currentSlide = idx;
          updateCarousel();
        }
      });
    });
  }
  updateCarousel();

  // 5. Testimonials Slider
  const testimonials = [
    {
      quote: "The site looks flawless. We really appreciate the maturity and patience to see things through the rounds of iteration. Quality work, very responsive!",
      name: "Siim Säinas",
      role: "Founder, SUMA",
      brand: "SUMA",
      avatar: "assets/ba/avatar-yoann.jpg"
    },
    {
      quote: "Working with 4Eleven on our website and digital revamp was one of the best decisions we've made. The final product gives our brand undeniable authority.",
      name: "Fateh Singh",
      role: "Marketing Manager, Clearbridge",
      brand: "CLEARBRIDGE",
      avatar: "assets/ba/avatar-david.avif"
    },
    {
      quote: "Your contribution has been very valuable to us, hope you know how important you are to the team. All the ruckus in your absence proved it! Haha :')",
      name: "Paritosh Anand",
      role: "Founder & Creator, 650K+ Followers",
      brand: "WESMILE MEDIA",
      avatar: "assets/ba/avatar-sebastien.jpg"
    },
    {
      quote: "Thank you so much, we are thrilled with the brand narrative and pitch deck! It has a sense of professionalism, elegance, and clarity that fits our vision wonderfully.",
      name: "Christian Lowery",
      role: "Operations Director, BrainyAct",
      brand: "BRAINYACT",
      avatar: "assets/ba/avatar-mathilde.jpg"
    },
    {
      quote: "Just wrapped up our second venture together and it looks exceptional. Fast turnaround, world-class taste, and strategic sharpness at every step.",
      name: "Graham Thompson",
      role: "Founder, Greeter",
      brand: "GREETER",
      avatar: "assets/ba/avatar-theo.avif"
    }
  ];

  let currentTestimonial = 0;
  const quoteEl = document.getElementById('testi-quote');
  const nameEl = document.getElementById('testi-name');
  const roleEl = document.getElementById('testi-role');
  const brandEl = document.getElementById('testi-brand');
  const avatarEl = document.getElementById('testi-avatar');
  const dotsEl = document.getElementById('testi-dots');

  function renderTestimonial(index) {
    if (!quoteEl) return;
    const t = testimonials[index];
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = `"${t.quote}"`;
      if (nameEl) nameEl.textContent = t.name;
      if (roleEl) roleEl.textContent = t.role;
      if (brandEl) brandEl.textContent = t.brand;
      if (avatarEl) avatarEl.src = t.avatar;
      quoteEl.style.opacity = '1';
    }, 180);

    if (dotsEl) {
      dotsEl.innerHTML = '';
      testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `redo-dot ${i === index ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          currentTestimonial = i;
          renderTestimonial(currentTestimonial);
        });
        dotsEl.appendChild(dot);
      });
    }
  }
  renderTestimonial(currentTestimonial);

  // 6. 1-Click Copy Email to Clipboard
  const copyBtn = document.getElementById('redo-copy-email');
  const copyToast = document.getElementById('redo-copy-toast');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'ssup@4eleven.in';
      navigator.clipboard.writeText(email).then(() => {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(() => {
            copyToast.classList.remove('show');
          }, 2400);
        }
      });
    });
  }

  // 7. Modal Intake Form (Get In Touch)
  const modal = document.getElementById('redo-contact-modal');
  const openBtns = document.querySelectorAll('.open-redo-contact, a[href="#contact"]');
  const closeBtn = document.getElementById('redo-modal-close');
  const contactForm = document.getElementById('redo-intake-form');

  function openModal(e) {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.redo-form-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Transmitting inquiry...';
        submitBtn.disabled = true;
        setTimeout(() => {
          submitBtn.textContent = '✓ Message Sent! We will reply within 24h.';
          submitBtn.style.background = '#22c55e';
          submitBtn.style.color = '#ffffff';
          setTimeout(() => {
            closeModal();
            contactForm.reset();
            submitBtn.textContent = 'Send Inquiry';
            submitBtn.style.background = '#ffffff';
            submitBtn.style.color = '#0c0a09';
            submitBtn.disabled = false;
          }, 2000);
        }, 1000);
      }
    });
  }

  // 8. Sticky Nav Docking / Reveal on Scroll & Hero Header Handover
  const navWrapper = document.querySelector('.redo-nav-wrapper');
  const siteHeader = document.getElementById('siteHeader');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    handleScrollScrub();

    const currentScrollY = window.scrollY;
    if (navWrapper) {
      if (currentScrollY > 280) {
        navWrapper.classList.add('visible');
        if (siteHeader) {
          siteHeader.style.opacity = '0';
          siteHeader.style.pointerEvents = 'none';
          siteHeader.style.transform = 'translateY(-20px)';
        }
      } else {
        navWrapper.classList.remove('visible');
        if (siteHeader) {
          siteHeader.style.opacity = '1';
          siteHeader.style.pointerEvents = 'auto';
          siteHeader.style.transform = 'translateY(0)';
        }
      }
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // 9. Mobile Docked Nav Drawer Toggle
  const mobileNavToggle = document.getElementById('redo-mobile-nav-toggle');
  const menuDrawer = document.getElementById('menu-drawer');
  if (mobileNavToggle && menuDrawer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuDrawer.classList.toggle('open');
      menuDrawer.setAttribute('aria-hidden', menuDrawer.classList.contains('open') ? 'false' : 'true');
    });
  }

  handleScrollScrub();
});
