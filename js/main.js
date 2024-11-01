(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      navbarlink.classList.toggle('active', position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight));
    });
  };

  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on('click', '.mobile-nav-toggle', function() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      const body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  const typed = select('.typed');
  if (typed) {
    const typedStrings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  const skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function() {
        const progress = select('.progress .progress-bar', true);
        progress.forEach(el => {
          el.style.transition = 'width 1.5s ease-in-out';
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  // Add animation to project cards
  const projectCards = select('.feature-card', true);
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 1s ease, transform 1s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 300); // Increased delay for better staggering
  });

  // Initialize AOS (Animate On Scroll)
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1200,  // Slower animations
      easing: 'ease-in-out',
      once: true,      // Animation will only happen once
      mirror: false    // No repeat of animations on scroll up
    });
  });
})();

