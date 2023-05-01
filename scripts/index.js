import Swiper from '../lib/swiper-bundle.esm.browser.min.js';

// simplebar

new SimpleBar(document.querySelector('.country__list'), {
  classNames: {
    scrollbar: 'country__scrollbar',
    track: 'country__track',
  },
});

// slider
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
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    prevEl: '.goods__arrow_prev',
    nextEl: '.goods__arrow_next',
  },
  preventClicks: true,
  a11y: false,
});

// modal

const productMore = document.querySelectorAll('.product__more');
const modal = document.querySelector('.modal');

productMore.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.add('modal_open');
  });
});

modal.addEventListener('click', ({ target }) => {
  if (target === modal) {
    modal.classList.remove('modal_open');
  }
});

const formPlaceloder = document.querySelectorAll('.form__placeholder');
const formInput = document.querySelectorAll('.form__input');

formInput.forEach((input, i) => {
  input.addEventListener('focus', () => {
    formPlaceloder[i].classList.add('form__placeholder_active');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      formPlaceloder[i].classList.remove('form__placeholder_active');
    }
  });
});

// currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('EU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = 'USD') => {
  const priceElems = document.querySelectorAll('[data-price]');

  priceElems.forEach(elem => {
    elem.textContent = formatCurrency(
      elem.dataset.price * dataCurrency[currency],
      currency,
    );
  });
};

const myHeaders = new Headers();
myHeaders.append('apikey', 'J5gtDFgL5KbjBrQKi74XKL3fCetO27Fn');

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders,
};

fetch('https://api.apilayer.com/fixer/latest?base=USD', requestOptions)
  .then(response => response.json())
  .then(result => {
    Object.assign(dataCurrency, result.rates);
    showPrice();
  })
  .catch(error => console.log('error', error));

// choices

const countryBtn = document.querySelector('.country__btn');
const countryWrapper = document.querySelector('.country__wrapper');

countryBtn.addEventListener('click', () => {
  countryWrapper.classList.toggle('country__wrapper_open');
});

countryWrapper.addEventListener('click', ({ target }) => {
  if (target.classList.contains('country__choise')) {
    countryWrapper.classList.remove('country__wrapper_open');
    showPrice(target.dataset.currency);
  }
});

const addLeadingZero = num => (num < 10 ? `0${num}` : num);

const declOfNum = (n, titles) =>
  titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];


const timer = deadline => {
  const unitDay = document.querySelector('.timer__unit_hour');
  const unitHour = document.querySelector('.timer__unit_min');
  const unitMin = document.querySelector('.timer__unit_sec');
  const descriptionDay = document.querySelector('.timer__unit-description_hour');
  const descriptionHour = document.querySelector(
    '.timer__unit-description_min',
  );
  const descriptionMin = document.querySelector('.timer__unit-description_sec');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return { timeRemaining, seconds, minutes, hours };
  };

  const start = () => {
    const timer = getTimeRemaining();

    unitDay.textContent = addLeadingZero(timer.hours);
    unitHour.textContent = addLeadingZero(timer.minutes);
    unitMin.textContent = addLeadingZero(timer.seconds);

    descriptionDay.textContent = declOfNum(timer.hours, [
      'час',
      'часа',
      'часов',
    ]);
    descriptionHour.textContent = declOfNum(timer.minutes, [
      'минута',
      'минуты',
      'минут',
    ]);
    descriptionMin.textContent = declOfNum(timer.seconds, [
      'секунда',
      'секунды',
      'секунд',
    ]);

    const intervalId = setTimeout(start, 1000);
    if (timer.timeRemaining < 0) {
      clearTimeout(intervalId);
      unitDay.textContent = '00';
      unitHour.textContent = '00';
      unitMin.textContent = '00';
    }
  };

  start();
};

let now = new Date();
let next_20;

if (now.getHours() >= 20) {
  next_20 = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    20,
    0,
  );
} else {
  next_20 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0);
}

timer(next_20);
