// 4—11 STUDIO® — Interactive Core Scripts (Single-Page Experience)
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Day and Date Banner for Hero
  const dayEl = document.getElementById('hero-current-day');
  const dateEl = document.getElementById('hero-current-date');
  if (dayEl && dateEl) {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dayEl.textContent = days[now.getDay()];
    dateEl.textContent = `${now.getDate()} ${months[now.getMonth()]} — 4—11 Studio ${now.getFullYear()}`;
  }

  // 2. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.innerHTML = '☰';
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Service Row Accordion
  const serviceRows = document.querySelectorAll('.service-row');
  serviceRows.forEach(row => {
    const head = row.querySelector('.service-row-head');
    if (head) {
      head.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        serviceRows.forEach(r => r.classList.remove('active'));
        if (!isActive) {
          row.classList.add('active');
        }
      });
    }
  });

  // 4. Portfolio Filter Bar
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');
  if (filterBtns.length > 0 && workItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        workItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || (category && category.includes(filter))) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. Interactive Contact Form Submission
  const contactForm = document.getElementById('studio-contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Sending... <span>⏳</span>';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = 'Enquiry Sent! <span>✓</span>';
          submitBtn.style.background = '#22c55e';
        }
        if (formSuccess) {
          formSuccess.style.display = 'block';
        }
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = "Start a Project <span>↗</span>";
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }
        }, 5000);
      }, 800);
    });
  }

  // 6. Smooth In-Page Anchor Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
