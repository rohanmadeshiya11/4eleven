// 4—11 STUDIO® — Interactive Core Scripts
document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Mumbai Time
  function updateTime() {
    const timeEl = document.getElementById('live-time');
    if (!timeEl) return;
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeEl.textContent = `${now.toLocaleTimeString('en-GB', options)} IST`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // 2. Navbar Scroll Glass Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // 4. Accordion Toggle (Services / FAQ)
  const accordions = document.querySelectorAll('.service-row, .faq-item');
  accordions.forEach(row => {
    const trigger = row.querySelector('.service-head, .faq-head');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isCurrentActive = row.classList.contains('active');
        // optional: collapse others
        accordions.forEach(r => r.classList.remove('active'));
        if (!isCurrentActive) {
          row.classList.add('active');
        }
      });
    }
  });

  // 5. Work Filter
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
          if (filter === 'all' || category === filter || (category && category.includes(filter))) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Interactive Contact Form Handler
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
            submitBtn.innerHTML = "Let's Make It Matter <span>↗</span>";
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }
        }, 5000);
      }, 900);
    });
  }
});
