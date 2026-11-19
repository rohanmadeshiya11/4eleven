/**
 * Kreative Interactive Engine - Four Eleven Studio
 * Complete shared navigation, mobile drawer, accordion, lead modal, and video lightbox
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileBtn = document.getElementById('mobileMenuBtn') || document.querySelector('.kreative-mobile-toggle, .mobile-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer') || document.querySelector('.kreative-mobile-drawer, .mobile-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('is-open');
      const isOpen = mobileDrawer.classList.contains('is-open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('is-open') && !mobileDrawer.contains(e.target) && !mobileBtn.contains(e.target)) {
        mobileDrawer.classList.remove('is-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.innerHTML = '☰';
      }
    });
  }

  // Close drawer on link click
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
    const trigger = item.querySelector('.faq-question, .faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('is-open');
          const t = i.querySelector('.faq-toggle-icon, .faq-icon');
          if (t) t.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('is-open');
          const t = item.querySelector('.faq-toggle-icon, .faq-icon');
          if (t) t.textContent = '✕';
        }
      });
    }
  });

  // 3. Lead Inquiry Modal
  const leadModal = document.getElementById('leadModal');
  const leadTriggers = document.querySelectorAll('[data-open-lead-modal], .open-lead-modal, [href="#leadModal"], .cta-butter-btn, .book-call-btn');
  const leadClose = document.getElementById('leadModalClose');

  window.openLeadModal = function(e) {
    if (e) e.preventDefault();
    if (leadModal) {
      leadModal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      const firstInput = leadModal.querySelector('input:not([type="hidden"])');
      if (firstInput) setTimeout(() => firstInput.focus(), 120);
    }
  };

  window.closeLeadModal = function() {
    if (leadModal) {
      leadModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  leadTriggers.forEach(btn => btn.addEventListener('click', window.openLeadModal));
  if (leadClose) leadClose.addEventListener('click', window.closeLeadModal);

  if (leadModal) {
    leadModal.addEventListener('click', (e) => {
      if (e.target === leadModal) window.closeLeadModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (window.closeLeadModal) window.closeLeadModal();
      if (window.closeProjectModal) window.closeProjectModal();
      else if (window.closeVideoModal) window.closeVideoModal();
    }
  });

  // Scope & Budget Chips
  document.querySelectorAll('#leadServicesChips .lead-chip, #contactServicesChips .lead-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-active');
      chip.classList.toggle('is-selected');
      updateLeadSelections();
    });
  });

  document.querySelectorAll('#leadBudgetChips .lead-chip, #contactBudgetChips .lead-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const parent = chip.closest('#leadBudgetChips, #contactBudgetChips');
      if (parent) {
        parent.querySelectorAll('.lead-chip').forEach(c => {
          c.classList.remove('is-active');
          c.classList.remove('is-selected');
        });
      }
      chip.classList.add('is-active');
      chip.classList.add('is-selected');
      updateLeadSelections();
    });
  });

  function updateLeadSelections() {
    const selectedServices = Array.from(document.querySelectorAll('#leadServicesChips .lead-chip.is-active, #leadServicesChips .lead-chip.is-selected'))
      .map(c => c.dataset.val || c.innerText.trim());
    const selectedBudget = document.querySelector('#leadBudgetChips .lead-chip.is-active, #leadBudgetChips .lead-chip.is-selected')?.dataset.val || '';

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
            window.closeLeadModal();
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
        window.closeLeadModal();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = origText;
        }
      }
    });
  }

  // 4. Project Detail & Video Lightbox Modal (Shared across all pages)
  const projModal = document.getElementById('projModalOverlay');
  const projModalClose = document.getElementById('projModalClose') || document.querySelector('.proj-modal-close-btn, .proj-modal-close');
  const projVideo = document.getElementById('projModalVideo') || document.getElementById('modalVideo') || document.querySelector('.proj-modal-video');
  const projImg = document.getElementById('projModalImg') || document.getElementById('modalImg');
  const projTitle = document.getElementById('projModalTitle') || document.getElementById('modalTitle');
  const projClient = document.getElementById('projModalClient') || document.getElementById('modalClient');
  const projDesc = document.getElementById('projModalDesc') || document.getElementById('modalDesc');
  const projTags = document.getElementById('projModalTags') || document.getElementById('modalTags');
  const projExtLink = document.getElementById('projModalExternalLink') || document.getElementById('modalExternalLink');
  const projInquireBtn = document.getElementById('projModalInquireBtn') || document.getElementById('modalInquireBtn');

  window.openProjectModal = function(card) {
    if (!projModal) return;
    const title = card.getAttribute('data-title') || card.dataset.projectTitle || card.querySelector('h3, .proj-card-title, .project-card-title')?.innerText || 'Featured Work';
    const client = card.getAttribute('data-client') || 'Four Eleven Studio';
    const desc = card.getAttribute('data-desc') || card.querySelector('p')?.innerText || '';
    const videoSrc = card.getAttribute('data-video') || card.dataset.videoSrc || '';
    const imgSrc = card.getAttribute('data-img') || card.getAttribute('data-video-poster') || card.querySelector('img')?.getAttribute('src') || '';
    const tags = (card.getAttribute('data-tags') || '').split(',').map(s => s.trim()).filter(Boolean);
    const extUrl = card.getAttribute('data-video-url') || '';

    if (projTitle) projTitle.innerText = title;
    if (projClient) projClient.innerText = client;
    if (projDesc) projDesc.innerText = desc;

    if (projTags) {
      projTags.innerHTML = '';
      tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'proj-pill-badge';
        span.textContent = tag;
        projTags.appendChild(span);
      });
    }

    if (projExtLink) {
      if (extUrl) {
        projExtLink.href = extUrl;
        projExtLink.style.display = 'inline-flex';
      } else {
        projExtLink.style.display = 'none';
      }
    }

    if (videoSrc && projVideo) {
      projVideo.src = videoSrc;
      projVideo.style.display = 'block';
      if (projImg) projImg.style.display = 'none';
      projVideo.play().catch(e => console.log('Autoplay deferred:', e));
    } else if (imgSrc && projImg) {
      if (projVideo) {
        try { projVideo.pause(); projVideo.removeAttribute('src'); } catch(e){}
        projVideo.style.display = 'none';
      }
      projImg.src = imgSrc;
      projImg.alt = title;
      projImg.style.display = 'block';
    }

    projModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    if (projModal) {
      if (projVideo) {
        try {
          projVideo.pause();
          projVideo.removeAttribute('src');
          projVideo.load();
        } catch (e) {}
        projVideo.style.display = 'none';
      }
      if (projImg) {
        projImg.removeAttribute('src');
        projImg.style.display = 'none';
      }
      projModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  window.openVideoModal = function(src, title) {
    if (!projModal) return;
    if (projTitle) projTitle.innerText = title || 'Four Eleven Studio Project';
    if (projVideo) {
      projVideo.src = src;
      projVideo.style.display = 'block';
      if (projImg) projImg.style.display = 'none';
      projVideo.play().catch(e => console.log('Autoplay deferred:', e));
    }
    projModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = window.closeProjectModal;

  document.querySelectorAll('.kreative-project-card, .project-card, .project-card-full, [data-video], [data-video-src]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') && !e.target.closest('.play-pill, .proj-play-overlay')) return;
      e.preventDefault();
      window.openProjectModal(card);
    });
  });

  if (projModalClose) projModalClose.addEventListener('click', window.closeProjectModal);
  if (projModal) {
    projModal.addEventListener('click', (e) => {
      if (e.target === projModal) window.closeProjectModal();
    });
  }

  if (projInquireBtn) {
    projInquireBtn.addEventListener('click', () => {
      window.closeProjectModal();
      if (window.openLeadModal) window.openLeadModal();
    });
  }

  // 5. Projects Filter Tabs (for projects.html)
  const filterBtns = document.querySelectorAll('.projects-filter-bar .filter-btn');
  const projectItems = document.querySelectorAll('.project-card-full, .project-card, .kreative-project-card');
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
            item.style.transform = 'translateY(0)';
          } else {
            const itemCat = item.dataset.category || item.getAttribute('data-tags') || '';
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
  const heroStickers = document.querySelectorAll('.hero-sticker, .hero-sticker-wrap');
  if (heroStickers.length > 0 && window.innerWidth > 900) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      heroStickers.forEach((st, idx) => {
        const factor = (idx + 1) * 5;
        st.style.transform = 'translate(' + (dx * factor) + 'px, ' + (dy * factor) + 'px)';
      });
    });
  }
});
