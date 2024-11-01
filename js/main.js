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

  // Navbar active state on scroll
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

  // Smooth scroll with an offset for mobile devices
  const scrollto = (el) => {
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - (window.innerWidth < 768 ? 50 : 0), // Offset for smaller screens
      behavior: 'smooth'
    });
  };

  // Back to top button visibility
  const backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // Mobile nav toggle
  on('click', '.mobile-nav-toggle', function() {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Smooth scroll for .scrollto links
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      if (select('body').classList.contains('mobile-nav-active')) {
        select('body').classList.remove('mobile-nav-active');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  // Preloader
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Typed.js for typing effect in header
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

  // Skills animation when scrolling into view
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

  // Intersection Observer for fade-in animations on project cards and sections
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger earlier for smoother effect on small devices
  };

  const animateElement = (element) => {
    element.style.transition = 'opacity 1s ease, transform 1s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe project cards, heading, and contact section
  const projectCards = select('.feature-card', true);
  projectCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });

  const projectsHeading = select('#projects-heading');
  if (projectsHeading) {
    projectsHeading.style.opacity = '0';
    projectsHeading.style.transform = 'translateY(30px)';
    observer.observe(projectsHeading);
  }

  const contactSection = select('#contact');
  if (contactSection) {
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'translateY(30px)';
    observer.observe(contactSection);
  }
})();
