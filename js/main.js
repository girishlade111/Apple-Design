/**
 * APPLE DESIGN SYSTEM — Main
 * Intersection Observer for fade-in animations,
 * sticky bar scroll behavior, and category filtering.
 */

(function () {
  'use strict';

  // ─── Fade-in animation via Intersection Observer ───

  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ─── Sticky bar: show when configurator scrolls past ───

  const stickyBar = document.getElementById('sticky-bar');
  const configurator = document.getElementById('configurator');

  if (stickyBar && configurator) {
    const stickyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            stickyBar.classList.add('is-visible');
          } else {
            stickyBar.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-96px 0px 0px 0px',
      }
    );

    stickyObserver.observe(configurator);
  }

  // ─── Category filtering (Accessories page) ───

  const categoryPills = document.querySelectorAll('.category-pill');
  const accessoryCards = document.querySelectorAll('.accessory-card');

  if (categoryPills.length > 0 && accessoryCards.length > 0) {
    categoryPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        // Update active state
        categoryPills.forEach(function (p) {
          p.classList.remove('category-pill--active');
        });
        pill.classList.add('category-pill--active');

        const category = pill.dataset.category;

        accessoryCards.forEach(function (card) {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
            // Re-trigger fade-in
            requestAnimationFrame(function () {
              card.classList.add('is-visible');
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ─── Search filtering (Accessories page) ───

  const searchField = document.getElementById('search-field');

  if (searchField && accessoryCards.length > 0) {
    searchField.addEventListener('input', function () {
      const query = searchField.value.toLowerCase().trim();

      accessoryCards.forEach(function (card) {
        const name = (card.querySelector('.accessory-card__name') || {}).textContent || '';
        const category = (card.querySelector('.accessory-card__category') || {}).textContent || '';
        const searchText = (name + ' ' + category).toLowerCase();

        if (!query || searchText.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // Reset category pills to "All" when searching
      if (query) {
        categoryPills.forEach(function (p) {
          p.classList.remove('category-pill--active');
        });
        var allPill = document.getElementById('filter-all');
        if (allPill) allPill.classList.add('category-pill--active');
      }
    });
  }

  // ─── Smooth scroll for anchor links ───

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Stats counter animation (Environment page) ───

  const statNumbers = document.querySelectorAll('.editorial__stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    var statsSection = document.getElementById('env-stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  function animateStats() {
    statNumbers.forEach(function (el) {
      const text = el.textContent.trim();
      const numMatch = text.match(/(\d+)/);

      if (!numMatch) return;

      const target = parseInt(numMatch[1], 10);
      const suffix = text.replace(numMatch[1], '');
      let current = 0;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;

      const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.round(current) + suffix;
      }, stepTime);
    });
  }
})();
