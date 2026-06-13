(function () {
  // ── Scroll fade-in for book cards ─────────────────────────────────────
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function init() {
    document.querySelectorAll('.book-card').forEach(function (card, i) {
      card.style.transitionDelay = (i % 3) * 0.08 + 's';
      observer.observe(card);
    });

    // ── Nav scroll shadow ────────────────────────────────────────────────
    var nav = document.querySelector('.site-nav');

    // ── Parallax bookshelf ───────────────────────────────────────────────
    var shelf = document.querySelector('.hero-shelf');

    // ── Back-to-top button ───────────────────────────────────────────────
    var btn = document.createElement('a');
    btn.id = 'back-to-top';
    btn.href = '#';
    btn.setAttribute('aria-label', 'Nach oben');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Single rAF-throttled scroll handler ─────────────────────────────
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var y = window.scrollY;
          if (nav)   nav.classList.toggle('scrolled', y > 40);
          if (shelf) shelf.style.transform = 'translateY(' + (y * 0.12) + 'px)';
          btn.classList.toggle('visible', y > 300);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // ── Site-switcher click toggle ───────────────────────────────────────
    var siteSwitcher = document.querySelector('.site-switcher');
    if (siteSwitcher) {
      var switchBtn = siteSwitcher.querySelector('.site-switcher__btn');
      switchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        siteSwitcher.classList.toggle('is-open');
      });
      siteSwitcher.querySelector('.site-switcher__card').addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.addEventListener('click', function () {
        siteSwitcher.classList.remove('is-open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
