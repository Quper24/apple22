import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

new Swiper('.goods__block', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: '.goods__arrow_next',
    prevEl: '.goods__arrow_prev',
  },
})