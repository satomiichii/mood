import anime from 'animejs/lib/anime.es.js';

export const moop = anime({
  targets: '.anime',
  translateX: [0, -9000],
  duration: 3000,
  easing: 'easeInOutSine',
  direction: 'reverse',
  autoplay: false,
});

export const smile = anime({
  targets: '.anime',
  translateX: [0, -9000],
  duration: 3000,
  easing: 'easeInOutSine',
  autoplay: false,
});

export const frownAppear = anime({
  targets: '.frown',
  opacity: [0, 1],
  duration: 3000,
  delay: 1000,
  easing: 'easeInOutSine',
  autoplay: false,
});

export const frownFade = anime({
  targets: '.frown',
  opacity: [0, 1],
  duration: 1500,
  easing: 'easeInOutSine',
  direction: 'reverse',
  autoplay: false,
});

export const smileAppear = anime({
  targets: '.smile',
  opacity: 1,
  duration: 3000,
  delay: 1000,
  easing: 'easeInOutSine',
  autoplay: false,
});

export const smileFade = anime({
  targets: '.smile',
  opacity: 1,
  duration: 1500,
  easing: 'easeInOutSine',
  direction: 'reverse',
  autoplay: false,
});
