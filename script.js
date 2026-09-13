(function () {
  'use strict';

  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('site-header');

  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  if (header) {
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('navToggle');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Hero parallax (subtle, disabled on reduced motion) ---------- */
  var heroBg = document.getElementById('heroBg');

  if (heroBg && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var offset = Math.min(window.scrollY, 900) * 0.15;
          heroBg.style.transform = 'translateY(' + offset + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Count-up stats ---------- */
  var statEls = document.querySelectorAll('.stat-num');

  function formatStat(value, format) {
    if (format === 'percent') return value + '%';
    if (format === 'days') return value + '/7';
    return String(value);
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var format = el.getAttribute('data-format') || 'plain';

    if (reduceMotion) {
      el.textContent = formatStat(target, format);
      return;
    }

    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = formatStat(current, format);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  if (statEls.length && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statEls.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statEls.forEach(function (el) {
      el.textContent = formatStat(parseInt(el.getAttribute('data-count'), 10) || 0, el.getAttribute('data-format'));
    });
  }

  /* ---------- Scrollspy nav ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  var navSections = Array.prototype.map.call(navLinks, function (link) {
    return { link: link, section: document.querySelector(link.getAttribute('href')) };
  }).filter(function (entry) { return entry.section; });

  if (navSections.length) {
    var spyTicking = false;

    function updateActiveNav() {
      var center = window.innerHeight / 2;
      var closest = null;
      var closestDistance = Infinity;

      navSections.forEach(function (entry) {
        var rect = entry.section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        var sectionCenter = rect.top + rect.height / 2;
        var distance = Math.abs(sectionCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = entry;
        }
      });

      navLinks.forEach(function (l) { l.classList.remove('active'); });
      if (closest) closest.link.classList.add('active');
    }

    updateActiveNav();
    window.addEventListener('scroll', function () {
      if (!spyTicking) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          spyTicking = false;
        });
        spyTicking = true;
      }
    }, { passive: true });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    lightboxClose.focus();
    document.addEventListener('keydown', onLightboxKeydown);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.removeEventListener('keydown', onLightboxKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
  }

  document.querySelectorAll('.galerie-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      openLightbox(btn.getAttribute('data-full'), img ? img.alt : '');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ---------- Reservation form -> mailto ---------- */
  var reservationForm = document.getElementById('reservationForm');

  if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('resName').value.trim();
      var date = document.getElementById('resDate').value;
      var guests = document.getElementById('resGuests').value;
      var email = document.getElementById('resEmail').value.trim();

      var subject = 'Demande de réservation — Le Biscotto';
      var body = 'Nom : ' + name + '\n' +
        'Date souhaitée : ' + date + '\n' +
        'Nombre de convives : ' + guests + '\n' +
        'E-mail de contact : ' + email;

      window.location.href = 'mailto:contact@lebiscotto-nancy.fr' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
