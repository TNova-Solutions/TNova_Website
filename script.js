/* TNova Solutions — script.js */

(function () {
  'use strict';

  // ── Navigation ──────────────────────────────────────────────
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('is-open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Scroll Reveal ────────────────────────────────────────────
  var revealTargets = document.querySelectorAll(
    '.service-card, .case-card, .testimonial, ' +
    '.about-content, .about-visual, ' +
    '.contact-info, .contact-form, ' +
    '.pillar, .work-header, .section-header'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          // Stagger siblings in the same grid
          var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.is-visible)'));
          var delay = siblings.indexOf(entry.target) * 80;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, Math.min(delay, 240));
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ── Counter Animation ─────────────────────────────────────────
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el, target, duration) {
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      el.textContent = Math.floor(easeOutCubic(progress) * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var statsEl = document.querySelector('.hero-stats');
  var countersRan = false;

  if (statsEl && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !countersRan) {
        countersRan = true;
        statsEl.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
          animateCounter(el, parseInt(el.dataset.target, 10), 1800);
        });
        statsObserver.disconnect();
      }
    }, { threshold: 0.4 });
    statsObserver.observe(statsEl);
  }

  // ── Contact Form ──────────────────────────────────────────────
  var form       = document.getElementById('contactForm');
  var submitBtn  = document.getElementById('submitBtn');
  var formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFieldError(inputId, errorId, msg) {
    var input = document.getElementById(inputId);
    var err   = document.getElementById(errorId);
    if (!input || !err) return;
    if (msg) {
      err.textContent = msg;
      input.classList.add('is-error');
    } else {
      err.textContent = '';
      input.classList.remove('is-error');
    }
  }

  function validateForm() {
    var valid = true;

    var nameVal = document.getElementById('name').value.trim();
    if (!nameVal) {
      setFieldError('name', 'nameError', 'Please enter your name.');
      valid = false;
    } else if (nameVal.length < 2) {
      setFieldError('name', 'nameError', 'Name must be at least 2 characters.');
      valid = false;
    } else {
      setFieldError('name', 'nameError', '');
    }

    var emailVal = document.getElementById('email').value.trim();
    if (!EMAIL_RE.test(emailVal)) {
      setFieldError('email', 'emailError', 'Please enter a valid work email.');
      valid = false;
    } else {
      setFieldError('email', 'emailError', '');
    }

    var msgVal = document.getElementById('message').value.trim();
    if (msgVal.length < 20) {
      setFieldError('message', 'messageError', 'Please describe your project (at least 20 characters).');
      valid = false;
    } else {
      setFieldError('message', 'messageError', '');
    }

    return valid;
  }

  // Live validation on blur
  ['name', 'email', 'message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', validateForm);
      el.addEventListener('input', function () {
        if (el.classList.contains('is-error')) validateForm();
      });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) {
      // Focus first errored field
      var firstErr = form.querySelector('.is-error');
      if (firstErr) firstErr.focus();
      return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    // Simulate async submission — replace with real fetch() in production
    setTimeout(function () {
      submitBtn.classList.remove('is-loading');
      submitBtn.style.display = 'none';
      formSuccess.classList.add('is-visible');

      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        el.disabled = true;
      });
    }, 1500);
  });

  // ── Smooth anchor offset (account for fixed nav) ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70) - 16;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });
})();
