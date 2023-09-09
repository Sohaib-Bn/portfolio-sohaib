export const navbarFunctionality = function () {
  /////////////////////////////////////////////////
  // NAVBAR SCROOLING
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const navItemsSmallScreen = document.querySelector(
    '.navbar__items--small-screen'
  );
  const navBtn = document.querySelector('.navbar__button');
  const navIcon = document.querySelector('.navbar__icon');
  const navBg = document.querySelector('.navbar__bg');

  const breakPointSmall = '50em';
  let x = window.matchMedia(`(min-width: ${breakPointSmall})`);

  navbar.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('navbar__link')) {
      const sectionID = e.target.getAttribute('href');
      if (sectionID !== '#') {
        document
          .querySelector(sectionID)
          .scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  ////////////////////////////////////////////////
  // NAVBAR EFFECT

  const handelMouse = function (e) {
    const currlink = e.target.closest('.navbar__link');
    if (!currlink) return;
    const linkSibling = currlink
      .closest('.navbar')
      .querySelectorAll('.navbar__link');
    const logo = currlink.closest('.navbar').querySelector('.logo__img');
    linkSibling.forEach(link => {
      if (link !== currlink) {
        link.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  };

  const navbarEffectLargeScreen = function (x) {
    if (x.matches) {
      navbar.addEventListener('mouseover', handelMouse.bind(0.5));
      navbar.addEventListener('mouseout', handelMouse.bind(1));
    } else {
      navbar.addEventListener('mouseover', handelMouse.bind(1));
      navbar.addEventListener('mouseout', handelMouse.bind(1));
    }
  };

  navbarEffectLargeScreen(x);
  x.addEventListener('change', navbarEffectLargeScreen);

  /////////////////////////////////////////////////////////////////
  // NAVBAR SMALL SCREEN

  navBtn.addEventListener('click', function () {
    navBg.classList.toggle('hidden-2');
    navItemsSmallScreen.classList.toggle('hidden-3');
    navIcon.classList.toggle('switchClose');
  });

  const navSmallScreen = document.querySelector('.navbar__items--small-screen');

  navSmallScreen.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('navbar__link')) {
      navBg.classList.add('hidden-2');
      navItemsSmallScreen.classList.add('hidden-3');
      navIcon.classList.remove('switchClose');
    }
  });

  /////////////////////////////////////////////////////////////////
  // NAVBAR STICKY
  const navHeight = navbar.getBoundingClientRect().height;
  const navSticky = function (entries) {
    entries.forEach(entrie => {
      if (!entrie.isIntersecting) navbar.classList.add('sticky');
      else navbar.classList.remove('sticky');
    });
  };

  const headerObserver = new IntersectionObserver(navSticky, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });

  headerObserver.observe(header);
};
