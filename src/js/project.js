import blogr from 'url:../img/blogr.svg';
import bankistApp from 'url:../img/bankist-app.png';
import myTeam from 'url:../img/my-team.png';
import multiForm from 'url:../img/multiform.png';
import nexter from 'url:../img/nexter.png';
import diceGame from 'url:../img/dice-game.png';

const projectsNav = document.querySelector('.projects__nav');

export const showSpinner = function () {
  return `<span class="loader"></span>`;
};

export const projectFilter = function () {
  const projectsContainer = document.querySelector('.projects__container');
  const btnShowMore = document.querySelector('.projects__link--more');
  const btnShowLess = document.querySelector('.projects__link--less');

  let moreLevel = 0;
  let currlink = document.querySelector('.projects__list[data-type="all"]');

  const filter = function (list) {
    const projects = document.querySelectorAll('.projects__project--filter');
    projects.forEach(project => {
      project.style.transition = 'all .5s';
      project.classList.remove('hidden');
    });
    const filterType = list.dataset.type;
    if (filterType === 'all') return;
    console.log(filterType);
    projects.forEach(project => {
      if (!project.classList.contains(`projects__project--${filterType}`)) {
        project.classList.add('hidden');
      }
    });
  };

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
    console.log(currlink);
    filter(currlink);
  });

  const showMoreProject = function (src, type, link = '#') {
    const markup = `
      <a href="${link}" target="_blank" class="projects__project--${type} projects__project--more projects__project--filter">
        <div class="projects__content-hover">
          <svg class="projects__icon">
            <use xlink:href="./symbol-defs.svg#icon-search" />
          </svg>
           See Preview
        </div>
      </a>
      `;
    projectsContainer.insertAdjacentHTML('beforeend', markup);
    const currProject = projectsContainer.lastElementChild;
    currProject.insertAdjacentHTML('beforeend', showSpinner());
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.classList.add('projects__img', 'projects__img--loading');
    img.onload = function () {
      currProject.classList.add('projects__project');
      currProject.querySelector('.loader').remove();
      currProject.appendChild(img);
    };
  };

  const showLessProjects = function () {
    moreLevel = 0;
    const projectsMore = projectsContainer.querySelectorAll(
      '.projects__project--more'
    );
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
        `${blogr}`,
        'marketing',
        'https://sohaib-bn.github.io/bogr/'
      );
      showMoreProject(
        `${bankistApp}`,
        'app',
        'https://bankist-sohaib.netlify.app/bank.html'
      );
      showMoreProject(
        `${myTeam}`,
        'marketing',
        'https://sohaib-bn.github.io/myTeam/'
      );
    }

    if (moreLevel === 2) {
      showMoreProject(
        `${multiForm}`,
        'app',
        'https://sohaib-bn.github.io/multi-form-steps/'
      );
      showMoreProject(
        `${nexter}`,
        'marketing',
        'https://sohaib-bn.github.io/Nexter/'
      );
      showMoreProject(
        `${diceGame}`,
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
