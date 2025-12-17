import { getRandomInteger } from './utils.js';

const MAX_RANDOM_PHOTO = 10;

export const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = getRandomInteger(0, i);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, MAX_RANDOM_PHOTO);
};

export const resetActiveButtons = (arr) => {
  arr.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

export const sortedByArray = (data) =>
  [...data].sort((a, b) => b.comments.length - a.comments.length);
