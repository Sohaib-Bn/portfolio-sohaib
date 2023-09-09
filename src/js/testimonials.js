const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnNext = document.querySelector('.slide__btn--next');
const btnPrev = document.querySelector('.slide__btn--prev');
const dotsContainer = document.querySelector('.slide__dots');

export const testimonials = function () {
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="slide__dot" data-currSlide="${i}"></button>
    `
      );
    });
  };

  const activateDot = function (curSlide) {
    document.querySelectorAll('.slide__dot').forEach(dot => {
      dot.classList.remove('dot--active');
    });
    document
      .querySelector(`.slide__dot[data-currSlide="${curSlide}"]`)
      .classList.add('dot--active');
  };

  const sliderFunctionality = function (curSlide) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
  };

  const init = function () {
    sliderFunctionality(0);
    createDots();
    activateDot(0);
  };
  init();

  let curSlide = 0;
  let maxSlide = slides.length;

  const toNextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    sliderFunctionality(curSlide);
    activateDot(curSlide);
  };
  const toPrevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    sliderFunctionality(curSlide);
    activateDot(curSlide);
  };

  btnNext.addEventListener('click', toNextSlide);
  btnPrev.addEventListener('click', toPrevSlide);

  document.querySelectorAll('.slide__dot').forEach(dot => {
    dot.addEventListener('click', function () {
      const curSlide = this.dataset.currslide;
      sliderFunctionality(curSlide);
      activateDot(curSlide);
    });
  });
};
