//////////////////////////////////
// ANIMATION SCROLING

const about = document.querySelector('.about');
const sections = document.querySelectorAll('.section');
const projects = document.querySelectorAll('.projects__project');
const services = document.querySelectorAll('.services__service');

const breakPointSmall = '31.25em';
let x = window.matchMedia(`(min-width: ${breakPointSmall})`);

export const sectionAnimation = function () {
  projects.forEach(project => {
    project.classList.add('popup');
    const delay = project.dataset.delay;
    project.style.transition = `all 1s ease ${delay}s`;
  });

  services.forEach(service => {
    service.classList.add('popup');
    const delay = service.dataset.delay;
    service.style.transition = `all 1s ease ${delay}s`;
  });

  const observeSection = function (entries) {
    const [entrie] = entries;
    if (!entrie.isIntersecting) return;
    const currSection = entrie.target;
    currSection.classList.remove('section--hidden');

    if (currSection.classList.contains('skills')) {
      const status = [...currSection.querySelectorAll('.skills__percantage')];
      const headingSecondary = currSection.querySelector('.heading--secondary');
      const headingTertiary = currSection.querySelector('.heading--tertairy');
      const paragraphe = currSection.querySelector('.paragraphe--description');
      const btn = currSection.querySelector('.btn');
      if (x.matches) {
        headingSecondary.classList.add('animation--moveRight');
        headingTertiary.classList.add('animation--moveLeft');
        paragraphe.classList.add('animation--moveLeft');
        btn.classList.add('animation--moveDown');
      }
      status.forEach(status => {
        status.classList.remove('percantage-animate');
      });
    }

    if (currSection.classList.contains('projects')) {
      projects.forEach(project => {
        project.classList.remove('popup');
      });
    }

    if (currSection.classList.contains('services')) {
      services.forEach(service => {
        service.classList.remove('popup');
      });
    }

    sectionObserver.unobserve(currSection);
  };

  const sectionObserver = new IntersectionObserver(observeSection, {
    root: null,
    threshold: 0.15,
  });
  sections.forEach(sec => {
    sectionObserver.observe(sec);
    sec.classList.add('section--hidden');
  });

  ///////////////////////////////////////////////
  // ABOUT OBSERVER

  const observeAbout = function (entries) {
    const [entrie] = entries;
    if (entrie.isIntersecting) {
      entrie.target
        .querySelector('.side--left')
        .classList.remove('side--left-hidden');
      entrie.target
        .querySelector('.side--right')
        .classList.remove('side--right-hidden');
      if (entrie.target.classList.contains('section--hidden')) {
        entrie.target.classList.remove('section--hidden');
      }
    }
  };
  const aboutObserver = new IntersectionObserver(observeAbout, {
    root: null,
    threshold: 0.15,
  });
  aboutObserver.observe(about);
};
