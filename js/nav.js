/**
 * APPLE DESIGN SYSTEM — Navigation
 * Hamburger menu toggle, mobile tray, and active page highlight.
 */

(function () {
  'use strict';

  const hamburger = document.getElementById('nav-hamburger');
  const mobileTray = document.getElementById('mobile-tray');

  if (!hamburger || !mobileTray) return;

  let isOpen = false;

  hamburger.addEventListener('click', function () {
    isOpen = !isOpen;
    hamburger.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      mobileTray.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Update hamburger icon to X
      hamburger.innerHTML = `
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M2.636 2.636l12.728 12.728M15.364 2.636L2.636 15.364" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        </svg>
      `;
    } else {
      mobileTray.classList.remove('is-open');
      document.body.style.overflow = '';
      // Restore hamburger icon
      hamburger.innerHTML = `
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M0 3h18v1.5H0zM0 8.25h18v1.5H0zM0 13.5h18V15H0z" fill="currentColor"/>
        </svg>
      `;
    }
  });

  // Close mobile tray on window resize past breakpoint
  window.addEventListener('resize', function () {
    if (window.innerWidth > 833 && isOpen) {
      isOpen = false;
      mobileTray.classList.remove('is-open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = `
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path d="M0 3h18v1.5H0zM0 8.25h18v1.5H0zM0 13.5h18V15H0z" fill="currentColor"/>
        </svg>
      `;
    }
  });

  // Close mobile tray on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      hamburger.click();
    }
  });
})();
