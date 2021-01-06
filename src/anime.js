import anime from 'animejs/lib/anime.es.js';

export const moop = anime({
  targets: '.anime',
  translateX: [-100, -8000],
  duration: 3000,
  easing: 'easeInOutSine',
  direction: 'reverse',
  autoplay: false,
});

export const smile = anime({
  targets: '.anime',
  translateX: [-100, -8000],
  duration: 3000,
  easing: 'easeInOutSine',
  autoplay: false,
});
