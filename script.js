/* ============================================
   C-FOUR WEBSITE - Interactive JavaScript
   Theme: රැයම සොඳුරු සිහිනයක්...
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2200);
  });
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, 4000);

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.contains('active') ? closeMobileNav() : openMobileNav();
  });
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNav.addEventListener('click', (e) => { if (e.target === mobileNav) closeMobileNav(); });
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ============================================
  // HERO BANNER CAROUSEL
  // ============================================
  const heroSlides = document.querySelectorAll('#heroBannerSlider .hero-slide');
  const heroDots = document.querySelectorAll('#heroBannerSlider .hero-dot');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  let currentHeroSlide = 0;
  let heroTimer = null;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      if (heroDots[i]) heroDots[i].classList.toggle('active', i === index);
    });
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
  }

  function prevHeroSlide() {
    showHeroSlide((currentHeroSlide - 1 + heroSlides.length) % heroSlides.length);
  }

  if (heroNextBtn) heroNextBtn.addEventListener('click', () => { nextHeroSlide(); resetHeroTimer(); });
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => { prevHeroSlide(); resetHeroTimer(); });
  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => { showHeroSlide(idx); resetHeroTimer(); });
  });

  function resetHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
    if (heroSlides.length > 1) {
      heroTimer = setInterval(nextHeroSlide, 5000);
    }
  }
  resetHeroTimer();

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // STATS DISPLAY (Always show real values immediately)
  // ============================================
  const counterNumbers = document.querySelectorAll('.counter-number');
  counterNumbers.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    if (target === 1000000) counter.textContent = '1 Million+';
    else if (target === 500) counter.textContent = '500+';
    else if (target === 15) counter.textContent = '15+';
    else if (target === 12) counter.textContent = '12+';
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        window.scrollTo({
          top: targetEl.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // SCROLL INDICATOR
  // ============================================
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        window.scrollTo({
          top: productsSection.offsetTop - header.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // ============================================
  // ACTIVE NAV HIGHLIGHTING
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  });

  // ============================================
  // PRODUCT CARD 3D TILT EFFECT
  // ============================================
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 25;
      const rotateY = (rect.width / 2 - x) / 25;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-dealer, .btn-view-all');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ============================================
  // PARALLAX HERO
  // ============================================
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrollY < heroHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
      }
    });
  }

  // ============================================
  // CURSOR GLOW ON AWARDS
  // ============================================
  const awardsSection = document.querySelector('.awards-section');
  if (awardsSection) {
    awardsSection.addEventListener('mousemove', (e) => {
      const rect = awardsSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      awardsSection.style.background = `
        radial-gradient(circle at ${x}px ${y}px, rgba(124, 58, 237, 0.3), transparent 40%),
        linear-gradient(180deg, #3b0764 0%, #1a0533 100%)
      `;
    });
    awardsSection.addEventListener('mouseleave', () => { awardsSection.style.background = ''; });
  }

  // ============================================
  // TESTIMONIALS SLIDER CAROUSEL & HOVER EFFECTS
  // ============================================
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let slideInterval;

  function goToSlide(index) {
    if (!track) return;
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  if (prevBtn && nextBtn && track) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetSlideTimer();
    });
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetSlideTimer();
    });
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetSlideTimer();
      });
    });

    function startSlideTimer() {
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }
    function resetSlideTimer() {
      clearInterval(slideInterval);
      startSlideTimer();
    }
    startSlideTimer();

    // Touch Swipe Support
    let startX = 0;
    let endX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; clearInterval(slideInterval); }, {passive: true});
    track.addEventListener('touchend', e => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) goToSlide(currentSlide + 1);
      else if (endX - startX > 50) goToSlide(currentSlide - 1);
      startSlideTimer();
    }, {passive: true});
  }

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('.testimonial-avatar-img');
      if (img) {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.testimonial-avatar-img');
      if (img) img.style.transform = '';
    });
  });

  // ============================================
  // RATINGS ANIMATION
  // ============================================
  const ratingBigs = document.querySelectorAll('.rating-big');
  let ratingsAnimated = false;

  function animateRatings() {
    if (ratingsAnimated) return;
    ratingsAnimated = true;
    ratingBigs.forEach(score => {
      const text = score.textContent;
      const targetValue = parseFloat(text);
      const duration = 1500;
      const startTime = performance.now();
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        score.innerHTML = `${(eased * targetValue).toFixed(1)}<span>/5</span>`;
        if (progress < 1) requestAnimationFrame(update);
      }
      score.innerHTML = `0.0<span>/5</span>`;
      requestAnimationFrame(update);
    });
  }

  const testimonialsSection = document.querySelector('.testimonials-section');
  if (testimonialsSection) {
    const ratingsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateRatings(); ratingsObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    ratingsObserver.observe(testimonialsSection);
  }

  // ============================================
  // FEATURE ICON ANIMATION
  // ============================================
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.feature-icon svg');
      if (icon) {
        icon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        icon.style.transform = 'rotate(10deg) scale(1.1)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.feature-icon svg');
      if (icon) icon.style.transform = '';
    });
  });

  // ============================================
  // TYPEWRITER CURSOR
  // ============================================
  const style = document.createElement('style');
  style.textContent = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
  document.head.appendChild(style);
  setTimeout(() => {
    const heroEnglish = document.querySelector('.hero-english');
    if (heroEnglish) {
      heroEnglish.innerHTML = heroEnglish.textContent + '<span style="animation: blink 1s step-end infinite; color: var(--accent-gold-light);">|</span>';
    }
  }, 2500);

  // ============================================
  // KEYBOARD
  // ============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  // ============================================
  // IMAGE FADE-IN
  // ============================================
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.6s ease';
          if (img.complete) {
            img.style.opacity = '1';
          } else {
            img.onload = () => { img.style.opacity = '1'; };
          }
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // SIZE PILL SELECTOR & BUY NOW INTERACTIVITY
  // ============================================
  document.querySelectorAll('.size-selector').forEach(selector => {
    const pills = selector.querySelectorAll('.size-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.btn-buy-now').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const name = card ? card.querySelector('.product-name').textContent.trim() : 'Product';
      const activeSizeEl = card ? card.querySelector('.size-pill.active') : null;
      const size = activeSizeEl ? activeSizeEl.textContent.trim() : 'Standard';
      
      const origText = btn.innerHTML;
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ADDED (${size.toUpperCase()})!`;
      btn.style.background = '#059669';
      
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
      }, 2000);
    });
  });

  // Console branding
  console.log(
    '%c🛡️ C-Four® %c Award-Winning Mosquito Nets %c\nරැයම සොඳුරු සිහිනයක්...',
    'color: #e53935; font-size: 20px; font-weight: bold;',
    'color: #7c3aed; font-size: 14px;',
    'color: #6d28d9; font-size: 12px; font-style: italic;'
  );
});
