const projectsNav = document.querySelector('.projects__nav');

export const projectFilter = function () {
  let currlink = document.querySelector('.projects__list[data-type="all"]');

  projectsNav.addEventListener('click', function (e) {
    // clear inputs
    currlink = e.target.closest('.projects__list');
    if (!currlink) return;
    const listSiblying = currlink
      .closest('.projects__nav')
      .querySelectorAll('.projects__list');
    listSiblying.forEach(list =>
      list.classList.remove('porjects__list--active')
    );
    currlink.classList.add('porjects__list--active');
    filter(currlink);
  });

  const filter = function (list) {
    const projects = document.querySelectorAll('.projects__project');
    projects.forEach(project => {
      project.style.transition = 'all .5s';
      project.classList.remove('hidden');
    });
    const filterType = list.dataset.type;
    if (filterType === 'all') return;
    projects.forEach(project => {
      if (!project.classList.contains(`projects__project--${filterType}`)) {
        project.classList.add('hidden');
      }
    });
  };

  const projectsContainer = document.querySelector('.projects__container');
  const btnShowMore = document.querySelector('.projects__link--more');
  const btnShowLess = document.querySelector('.projects__link--less');

  let moreLevel = 0;

  const showMoreProject = function (src, type, link = '#') {
    const markup = `
  <a href="${link}" target="_blank" class="projects__project projects__project--${type} projects__project--more">
    <div class="projects__content-hover">
      <svg class="projects__icon">
        <use xlink:href="./src/img/symbol-defs.svg#icon-search" />
      </svg>
       See Preview
    </div>
    <img src="${src}" alt="" class="projects__img projects__img--loading">
  </a>
  `;
    projectsContainer.insertAdjacentHTML('beforeend', markup);
  };

  const showLessProjects = function () {
    moreLevel = 0;
    const projectsMore = document.querySelectorAll('.projects__project--more');
    projectsMore.forEach(project => {
      project.remove();
    });
    btnShowLess.style.display = 'none';
    btnShowMore.style.display = 'inline-block';
  };

  btnShowMore.addEventListener('click', function (e) {
    e.preventDefault();
    moreLevel++;
    if (moreLevel === 1) {
      showMoreProject(
        './src/img/blogr.svg',
        'marketing',
        'https://sohaib-bn.github.io/bogr/'
      );
      showMoreProject(
        './src/img/bankist-app.png',
        'app',
        'https://bankist-sohaib.netlify.app/bank.html'
      );
      showMoreProject(
        './src/img/my-team.png',
        'marketing',
        'https://sohaib-bn.github.io/myTeam/'
      );
    }
    if (moreLevel === 2) {
      showMoreProject(
        './src/img/multiform.png',
        'app',
        'https://sohaib-bn.github.io/multi-form-steps/'
      );
      showMoreProject(
        './src/img/nexter.png',
        'marketing',
        'https://sohaib-bn.github.io/Nexter/'
      );
      showMoreProject(
        './src/img/dice-game.png',
        'app',
        'https://sohaib-bn.github.io/dicegame/'
      );
      this.style.display = 'none';
      btnShowLess.style.display = 'inline-block';
    }
    filter(currlink);
  });

  btnShowLess.addEventListener('click', function (e) {
    e.preventDefault();
    showLessProjects();
  });
};