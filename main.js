/* ============================================================
   Patrick Lower Photography — Shared JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──────────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '' || currentPath.endsWith('/')))) {
      a.classList.add('active');
    }
  });

  // ── Mobile nav toggle ────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // ── Scroll reveal ────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));

  // ── Lightbox ─────────────────────────────────────────
  const lightbox   = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg      = lightbox.querySelector('.lb-img');
  const lbCaption  = lightbox.querySelector('.lightbox-caption');
  const lbClose    = lightbox.querySelector('.lightbox-close');
  const lbPrev     = lightbox.querySelector('.lb-prev');
  const lbNext     = lightbox.querySelector('.lb-next');

  let galleryItems = [];
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    lbImg.src = item.src;
    lbImg.alt = item.caption;
    lbCaption.textContent = item.caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  // Collect gallery triggers
  document.querySelectorAll('[data-lightbox]').forEach((el, i) => {
    galleryItems.push({
      src:     el.dataset.src || el.src || el.style.backgroundImage.slice(5,-2),
      caption: el.dataset.caption || ''
    });
    el.addEventListener('click', () => openLightbox(i));
    el.style.cursor = 'zoom-in';
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', showNext);
  lbPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  showNext();
    if (e.key === 'ArrowLeft')   showPrev();
  });

});
