/**
 * Kreative Interactive Engine - Four Eleven Studio
 * Shared navigation, accordion, lead modal, video lightbox, and animation physics
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-open');
      const isOpen = mobileDrawer.classList.contains('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Close mobile drawer when clicking any link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('is-open');
        if (mobileBtn) {
          mobileBtn.setAttribute('aria-expanded', 'false');
          mobileBtn.innerHTML = '☰';
        }
      }
    });
  });

  // 2. FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        // Close siblings for clean accordion
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    }
  });

  // 3. Lead Inquiry Modal
  const leadModal = document.getElementById('leadModal');
  const leadTriggers = document.querySelectorAll('.open-lead-modal, [href="#leadModal"], .book-call-btn');
  const leadClose = document.getElementById('leadModalClose');

  function openLeadModal(e) {
    if (e) e.preventDefault();
    if (leadModal) {
      leadModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const firstInput = leadModal.querySelector('input:not([type="hidden"])');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeLeadModal() {
    if (leadModal) {
      leadModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  leadTriggers.forEach(btn => btn.addEventListener('click', openLeadModal));
  if (leadClose) leadClose.addEventListener('click', closeLeadModal);

  if (leadModal) {
    leadModal.addEventListener('click', (e) => {
      if (e.target === leadModal) closeLeadModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLeadModal();
      closeVideoModal();
    }
  });

  // Scope & Budget Chips
  document.querySelectorAll('#leadServicesChips .lead-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-selected');
      updateLeadSelections();
    });
  });

  document.querySelectorAll('#leadBudgetChips .lead-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#leadBudgetChips .lead-chip').forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      updateLeadSelections();
    });
  });

  function updateLeadSelections() {
    const selectedServices = Array.from(document.querySelectorAll('#leadServicesChips .lead-chip.is-selected'))
      .map(c => c.dataset.val || c.innerText.trim());
    const selectedBudget = document.querySelector('#leadBudgetChips .lead-chip.is-selected')?.dataset.val || '';

    const svcInput = document.getElementById('leadSelectedServices');
    const bgtInput = document.getElementById('leadSelectedBudget');
    if (svcInput) svcInput.value = selectedServices.join(', ');
    if (bgtInput) bgtInput.value = selectedBudget;
  }

  // Lead Form Submission
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerText : 'Send';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending Inquiry...';
      }

      const formData = new FormData(leadForm);
      try {
        const resp = await fetch('https://formsubmit.co/ajax/ssup@4eleven.in', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if (resp.ok) {
          const formView = document.getElementById('leadFormView');
          const successView = document.getElementById('leadSuccessView');
          if (formView && successView) {
            formView.style.display = 'none';
            successView.style.display = 'block';
          } else {
            alert('Thank you! Your project inquiry has been sent directly to ssup@4eleven.in.');
            closeLeadModal();
          }
        } else {
          throw new Error('Server returned ' + resp.status);
        }
      } catch (err) {
        console.warn('AJAX submit fallback to mailto:', err);
        const name = encodeURIComponent(formData.get('name') || '');
        const email = encodeURIComponent(formData.get('email') || '');
        const phone = encodeURIComponent(formData.get('phone') || '');
        const company = encodeURIComponent(formData.get('company') || '');
        const services = encodeURIComponent(formData.get('services_requested') || '');
        const budget = encodeURIComponent(formData.get('budget_range') || '');
        const notes = encodeURIComponent(formData.get('project_notes') || '');

        const body = 'Name: ' + name + '%0D%0AEmail: ' + email + '%0D%0APhone: ' + phone + '%0D%0ACompany: ' + company + '%0D%0AServices: ' + services + '%0D%0ABudget: ' + budget + '%0D%0A%0D%0AProject Brief:%0D%0A' + notes;
        window.location.href = 'mailto:ssup@4eleven.in?subject=New%20Project%20Inquiry%20from%20' + name + '&body=' + body;
        closeLeadModal();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = origText;
        }
      }
    });
  }

  // 4. Video Lightbox Modal
  const videoModal = document.getElementById('projModalOverlay');
  const videoPlayer = document.getElementById('projModalVideo');
  const videoTitle = document.getElementById('projModalTitle');
  const videoClose = document.getElementById('projModalClose');

  function openVideoModal(videoSrc, title) {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.src = videoSrc;
    if (videoTitle) videoTitle.innerText = title || 'Four Eleven Studio Project';
    videoModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    videoPlayer.play().catch(e => console.log('Autoplay deferred:', e));
  }

  function closeVideoModal() {
    if (videoModal && videoPlayer) {
      videoPlayer.pause();
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
      videoModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-video-src]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a:not(.play-pill)') && !e.target.closest('.play-pill')) return;
      e.preventDefault();
      const src = card.dataset.videoSrc;
      const title = card.dataset.projectTitle || card.querySelector('h3, .project-card-title')?.innerText || '';
      if (src) openVideoModal(src, title);
    });
  });

  if (videoClose) videoClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // 5. Projects Filter Tabs (for projects.html)
  const filterBtns = document.querySelectorAll('.projects-filter-bar .filter-btn');
  const projectItems = document.querySelectorAll('.project-card-full, .project-card');
  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter || 'all';

        projectItems.forEach(item => {
          if (cat === 'all') {
            item.style.display = '';
            item.style.opacity = '1';
          } else {
            const itemCat = item.dataset.category || '';
            if (itemCat.toLowerCase().includes(cat.toLowerCase())) {
              item.style.display = '';
              item.style.opacity = '1';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // 6. Scroll Reveal with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 7. Subtle interactive mouse tilt on hero stickers
  const heroStickers = document.querySelectorAll('.hero-sticker');
  if (heroStickers.length > 0 && window.innerWidth > 900) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      heroStickers.forEach((st, idx) => {
        const factor = (idx + 1) * 6;
        st.style.transform = 'translate(' + (dx * factor) + 'px, ' + (dy * factor) + 'px)';
      });
    });
  }
});
