import { getRandomInteger } from './utils.js';
import { renderGallery, clearGallery, getGalleryData } from './gallery.js';

const MAX_RANDOM_PHOTO = 10;

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = getRandomInteger(0, i);
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, MAX_RANDOM_PHOTO);
};

const sortedByArray = (data) =>
  [...data].sort((a, b) => b.comments.length - a.comments.length);

export const initFilters = () => {
  const filtersContainer = document.querySelector('.img-filters');

  let activeFilterButton = filtersContainer.querySelector('.img-filters__button--active');

  filtersContainer.classList.remove('img-filters--inactive');

  filtersContainer.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button || button === activeFilterButton) {
      return;
    }

    if (activeFilterButton) {
      activeFilterButton.classList.remove('img-filters__button--active');
    }

    button.classList.add('img-filters__button--active');
    activeFilterButton = button;

    const galleryData = getGalleryData();
    let filteredData = [];

    switch (button.id) {
      case 'filter-random':
        filteredData = shuffleArray(galleryData);
        break;

      case 'filter-discussed':
        filteredData = sortedByArray(galleryData);
        break;

      case 'filter-default':
      default:
        filteredData = galleryData;
        break;
    }

    clearGallery();
    renderGallery(filteredData);
  });
};
