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

  // Initialize Intersection Observer for project cards, heading, and contact section
  const projectCards = select('.feature-card', true);
  const projectsHeading = select('#projects-heading'); // Adjust this selector to match your HTML structure
  const contactSection = select('#contact'); // Adjust this selector to match your HTML structure
  const observerOptions = {
    root: null, // use the viewport as the container
    rootMargin: '0px',
    threshold: 0.1 // trigger when at least 10% of the card or section is visible
  };

  const animateElement = (element) => {
    element.style.transition = 'opacity 1s ease, transform 1s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the element when it is in view
        animateElement(entry.target);
        // Stop observing the element once it has been animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initial setup for project cards
  projectCards.forEach((card) => {
    card.style.opacity = '0'; // Initially hidden
    card.style.transform = 'translateY(30px)'; // Shifted down
    observer.observe(card); // Observe each card
  });

  // Initial setup for the projects heading
  if (projectsHeading) {
    projectsHeading.style.opacity = '0'; // Initially hidden
    projectsHeading.style.transform = 'translateY(30px)'; // Shifted down
    observer.observe(projectsHeading); // Observe the heading
  }

  // Initial setup for the contact section
  if (contactSection) {
    contactSection.style.opacity = '0'; // Initially hidden
    contactSection.style.transform = 'translateY(30px)'; // Shifted down
    observer.observe(contactSection); // Observe the contact section
  }
})();
