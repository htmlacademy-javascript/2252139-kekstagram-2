import { renderGallery, clearGallery, getGalleryData } from './gallery.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;

const filterName = {
  FILTER_RANDOM: 'filter-random',
  FILTER_DISCUSSED: 'filter-discussed',
  FILTER_DEFAULT: 'filter-default'
};

const filtersContainer = document.querySelector('.img-filters');
let activeFilterButton = filtersContainer.querySelector('.img-filters__button--active');

const shuffleArray = (data) =>
  data.toSorted(() => Math.random() - 0.5);

const sortByCommentsCount = (data) =>
  data.toSorted((a, b) => b.comments.length - a.comments.length);

const getFilteredData = (filterId) => {
  const galleryData = getGalleryData();

  switch (filterId) {
    case filterName.FILTER_RANDOM:
      return shuffleArray(galleryData);

    case filterName.FILTER_DISCUSSED:
      return sortByCommentsCount(galleryData);

    default:
      return galleryData;
  }
};

const debouncedRenderGallery = debounce((filterId) => {
  const filteredData = getFilteredData(filterId);
  clearGallery();
  renderGallery(filteredData);
}, RERENDER_DELAY);

const onFilterClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button) {
    return;
  }

  activeFilterButton?.classList.remove('img-filters__button--active');

  button.classList.add('img-filters__button--active');
  activeFilterButton = button;

  debouncedRenderGallery(button.id);
};

export const initFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};
