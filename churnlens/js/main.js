/**
 * ChurnLens — main.js
 * Navigation, scroll effects, animations, cursor, back-to-top
 */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const backToTop = document.querySelector('.back-to-top');
  const currentPage = document.body.dataset.page;

  /* Active nav link */
  document.querySelectorAll(`[data-nav="${currentPage}"]`).forEach((link) => {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  });

  /* Sticky header blur on scroll */
  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Hamburger menu */
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Back to top */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Custom cursor */
  const cursor = document.querySelector('.cursor-dot');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .btn, .chip, .image-card, input, select, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
    document.body.classList.add('no-custom-cursor');
  }

  /* Scroll-triggered fade-in */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* Hero particles */
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      p.style.animationDuration = `${6 + Math.random() * 6}s`;
      particlesContainer.appendChild(p);
    }
  }

  /* Animated counters */
  function animateCounter(el, target, suffix = '') {
    const duration = 2000;
    const start = performance.now();
    const isPercent = String(target).includes('%');
    const isArrow = String(target).includes('↓') || String(target).includes('↑');
    const numeric = parseFloat(String(target).replace(/[^\d.]/g, '')) || 0;
    const prefix = String(target).match(/^[^\d]*/)?.[0] || '';
    const endSuffix = String(target).match(/[^\d.]*$/)?.[0] || suffix;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      if (isArrow) {
        el.textContent = target;
      } else if (isPercent) {
        el.textContent = `${current.toFixed(0)}%`;
      } else if (String(target).includes('x')) {
        el.textContent = `${current.toFixed(0)}x`;
      } else {
        el.textContent = `${prefix}${current.toFixed(0)}${endSuffix}`;
      }
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  const statValues = document.querySelectorAll('[data-counter]');
  if (statValues.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, el.dataset.counter);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statValues.forEach((el) => counterObserver.observe(el));
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', !wasOpen);
    });
  });

  /* Contact form toast */
  const contactForm = document.getElementById('contact-form');
  const toast = document.querySelector('.toast');
  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      contactForm.reset();
    });
  }

  /* Funnel animation */
  const funnelFills = document.querySelectorAll('.funnel-fill');
  if (funnelFills.length && 'IntersectionObserver' in window) {
    const funnelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width || '100%';
          }
        });
      },
      { threshold: 0.3 }
    );
    funnelFills.forEach((fill) => funnelObserver.observe(fill));
  }

  /* Portfolio: video controls */
  const video = document.getElementById('churn-video');
  const videoFallback = document.querySelector('.video-fallback');
  const btnPlay = document.getElementById('video-play');
  const btnPause = document.getElementById('video-pause');
  const btnFullscreen = document.getElementById('video-fullscreen');

  if (video) {
    video.addEventListener('error', () => {
      if (videoFallback) videoFallback.style.display = 'flex';
    });
    video.addEventListener('loadeddata', () => {
      if (videoFallback) videoFallback.style.display = 'none';
    });

    btnPlay?.addEventListener('click', () => video.play());
    btnPause?.addEventListener('click', () => video.pause());
    btnFullscreen?.addEventListener('click', () => {
      if (video.requestFullscreen) video.requestFullscreen();
    });
  }

  /* Portfolio: audio player */
  const audio = document.getElementById('ai-music');
  const audioPlayer = document.querySelector('.audio-player');
  const audioPlay = document.getElementById('audio-play');
  const audioPause = document.getElementById('audio-pause');
  const volumeSlider = document.getElementById('volume-slider');

  if (audio && audioPlayer) {
    audioPlay?.addEventListener('click', () => {
      audio.play();
      audioPlayer.classList.add('playing');
    });
    audioPause?.addEventListener('click', () => {
      audio.pause();
      audioPlayer.classList.remove('playing');
    });
    volumeSlider?.addEventListener('input', () => {
      audio.volume = volumeSlider.value / 100;
    });
    audio.addEventListener('ended', () => audioPlayer.classList.remove('playing'));
  }

  console.log('[ChurnLens] main.js loaded — page:', currentPage);
})();
