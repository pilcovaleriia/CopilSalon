/* =============================================
   COPIL SALON — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 500); // Slight delay for smoother feel
    });
  }

  // ---- Scroll Progress Bar ----
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const addScrollProgress = () => {
    if (scrollProgressBar) {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}%`;
      scrollProgressBar.style.width = scroll;
    }
  }
  window.addEventListener('scroll', addScrollProgress);

  // ---- Set minimum date to today ----
  const dateInput = document.getElementById('book-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---- Mobile Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Service Tabs ----
  const tabs = document.querySelectorAll('.service-tab');
  const contents = document.querySelectorAll('.service-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
          content.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
          const carouselTrack = content.querySelector('.carousel-track');
          if (carouselTrack) {
            initCarousel(carouselTrack.id);
          }
        }
      });
    });
  });

  // ---- Image Carousels ----
  const carouselState = {};

  function initCarousel(carouselId) {
    const track = document.getElementById(carouselId);
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;

    if (!carouselState[carouselId]) {
      carouselState[carouselId] = { currentIndex: 0, totalSlides, autoplayTimer: null };
    }

    const dotsContainer = document.querySelector(`.carousel-dots[data-carousel="${carouselId}"]`);
    if (dotsContainer && dotsContainer.children.length === 0) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(carouselId, i));
        dotsContainer.appendChild(dot);
      }
    }

    const prevBtn = document.querySelector(`.carousel-prev[data-carousel="${carouselId}"]`);
    const nextBtn = document.querySelector(`.carousel-next[data-carousel="${carouselId}"]`);

    if (prevBtn && !prevBtn.dataset.initialized) {
      prevBtn.addEventListener('click', () => {
        const state = carouselState[carouselId];
        const newIndex = (state.currentIndex - 1 + state.totalSlides) % state.totalSlides;
        goToSlide(carouselId, newIndex);
      });
      prevBtn.dataset.initialized = 'true';
    }

    if (nextBtn && !nextBtn.dataset.initialized) {
      nextBtn.addEventListener('click', () => {
        const state = carouselState[carouselId];
        const newIndex = (state.currentIndex + 1) % state.totalSlides;
        goToSlide(carouselId, newIndex);
      });
      nextBtn.dataset.initialized = 'true';
    }

    startAutoplay(carouselId);
  }

  function goToSlide(carouselId, index) {
    const track = document.getElementById(carouselId);
    const state = carouselState[carouselId];
    if (!track || !state) return;

    state.currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;

    const dotsContainer = document.querySelector(`.carousel-dots[data-carousel="${carouselId}"]`);
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    startAutoplay(carouselId);
  }

  function startAutoplay(carouselId) {
    const state = carouselState[carouselId];
    if (!state) return;

    if (state.autoplayTimer) clearInterval(state.autoplayTimer);
    state.autoplayTimer = setInterval(() => {
      const newIndex = (state.currentIndex + 1) % state.totalSlides;
      goToSlide(carouselId, newIndex);
    }, 4000);
  }

  // Init visible carousels
  document.querySelectorAll('.carousel-track').forEach(track => {
    const parent = track.closest('.service-content');
    if (!parent || parent.classList.contains('active')) {
      initCarousel(track.id);
    }
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Parallax on hero shapes and background ----
  const shapes = document.querySelectorAll('.shape');
  const heroBgImg = document.querySelector('.hero-bg-img');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Shapes parallax
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.3;
      shape.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });

    // Hero Background parallax
    if (heroBgImg && scrolled < window.innerHeight) {
      heroBgImg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
  });

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }, 16);
  }

  // ---- Booking Form → WhatsApp ----
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value || '';
      const phone = document.getElementById('book-phone').value || '';
      const service = document.getElementById('book-service').value || '';
      const date = document.getElementById('book-date').value || '';
      const time = document.getElementById('book-time').value || '';
      const message = document.getElementById('book-message').value || '';

      // Format date nicely
      let formattedDate = date;
      if (date) {
        const d = new Date(date + 'T00:00:00');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        formattedDate = d.toLocaleDateString('es-PE', options);
      }

      // Format time
      let formattedTime = time;
      if (time) {
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        formattedTime = h > 12 ? `${h - 12}:${minutes} PM` : (h === 12 ? `12:${minutes} PM` : `${h}:${minutes} AM`);
      }

      let whatsappMsg = `✨ *Nueva Reserva — Copil Salon* ✨\n\n`;
      whatsappMsg += `👤 *Nombre:* ${name}\n`;
      whatsappMsg += `📞 *Teléfono:* ${phone}\n`;
      if (service) whatsappMsg += `💅 *Servicio:* ${service}\n`;
      if (date) whatsappMsg += `📅 *Fecha:* ${formattedDate}\n`;
      if (time) whatsappMsg += `🕐 *Hora:* ${formattedTime}\n`;
      if (message) whatsappMsg += `💬 *Mensaje:* ${message}\n`;
      whatsappMsg += `\n💖 Enviado desde la web de Copil Salon`;

      const encodedMsg = encodeURIComponent(whatsappMsg);
      window.open(`https://wa.me/51929024013?text=${encodedMsg}`, '_blank');
    });
  }

});
