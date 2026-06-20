// ============================================
// EFMI — Elshaddai Fire Ministries International
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav   = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 12
        ? '0 4px 24px rgba(15,31,92,0.1)'
        : 'none';
    }, { passive: true });
  }

  /* ---------- Ministry accordion ---------- */
  const ministryToggles = document.querySelectorAll('.ministry-toggle');

  ministryToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const targetId = toggle.getAttribute('data-target');
      const panel    = document.getElementById(targetId);
      const isOpen   = toggle.getAttribute('aria-expanded') === 'true';

      // Close all other panels
      ministryToggles.forEach(function (other) {
        if (other !== toggle) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('data-target');
          const otherPanel = document.getElementById(otherId);
          if (otherPanel) otherPanel.classList.remove('open');
        }
      });

      // Toggle clicked panel
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (panel) {
        panel.classList.toggle('open', !isOpen);
        if (!isOpen) {
          setTimeout(function () {
            toggle.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        }
      }
    });
  });

  /* ---------- Prayer form — Netlify AJAX ---------- */
  const prayerForm = document.getElementById('prayer-form');
  if (prayerForm) {
    prayerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(prayerForm);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function () {
        const card = prayerForm.closest('.prayer-form-card');
        card.innerHTML =
          '<div class="form-success">' +
            '<h3>Your prayer request has been received.</h3>' +
            '<p>Thank you for trusting us with this. Our team will carry it before the Lord in prayer.<br><em>"The prayer of a righteous person is powerful and effective." — James 5:16</em></p>' +
          '</div>';
      })
      .catch(function (err) {
        alert('Something went wrong. Please try again or email us at efmi.ministries@gmail.com');
        console.error(err);
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    '.section h2, .verse-band blockquote, .leader-card, .pillar, .history-block, .about-text-card'
  );

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

});
