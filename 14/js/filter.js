import { renderGallery, clearGallery, getGalleryData } from './gallery.js';

const filtersContainer = document.querySelector('.img-filters');
let activeFilterButton = filtersContainer.querySelector('.img-filters__button--active');

const shuffleArray = (data) =>
  data.toSorted(() => Math.random() - 0.5);

const sortByCommentsCount = (data) =>
  data.toSorted((a, b) => b.comments.length - a.comments.length);

const getFilteredData = (filterId) => {
  const galleryData = getGalleryData();

  switch (filterId) {
    case 'filter-random':
      return shuffleArray([...galleryData]);

    case 'filter-discussed':
      return sortByCommentsCount([...galleryData]);

    case 'filter-default':
    default:
      return galleryData;
  }
};

const handleFilterClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button || button === activeFilterButton) {
    return;
  }

  if (activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }

  button.classList.add('img-filters__button--active');
  activeFilterButton = button;

  const filteredData = getFilteredData(button.id);

  clearGallery();
  renderGallery(filteredData);
};

export const initFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', handleFilterClick);
};
