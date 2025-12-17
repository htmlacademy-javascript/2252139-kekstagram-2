import './gallery.js';
import './fullscreen-picture.js';
import './upload-picture.js';
import './form.js';
import './api.js';
import './utils.js';

import { errorMessageGetPhotos } from './dialogs.js';
import {renderGallery, setGalleryData, clearGallery} from './gallery.js';
import { getPhotos } from './api.js';
import { shuffleArray, resetActiveButtons, sortedByArray } from './filter.js';

try {
  const gallery = await getPhotos();
  renderGallery(gallery);
  setGalleryData(gallery);

  const filtersContainer = document.querySelector('.img-filters');
  const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');
  const filterRandom = filtersContainer.querySelector('#filter-random');
  const defaultFilter = filtersContainer.querySelector('#filter-default');
  const filterDiscussed = filtersContainer.querySelector('#filter-discussed');

  filtersContainer.classList.remove('img-filters--inactive');

  if (filterRandom) {
    filterRandom.addEventListener('click', (evt) => {
      clearGallery();
      resetActiveButtons(filterButtons);

      evt.target.classList.add('img-filters__button--active');

      const shuffledGallery = shuffleArray(gallery);
      renderGallery(shuffledGallery);
    });
  }

  if (defaultFilter) {
    defaultFilter.addEventListener('click', (evt) => {
      clearGallery();
      resetActiveButtons(filterButtons);

      evt.target.classList.add('img-filters__button--active');

      renderGallery(gallery);
    });
  }

  if (filterDiscussed) {
    filterDiscussed.addEventListener('click', (evt) => {
      clearGallery();
      resetActiveButtons(filterButtons);

      evt.target.classList.add('img-filters__button--active');

      const sortedByComments = sortedByArray(gallery);
      renderGallery(sortedByComments);
    });
  }

} catch (err) {
  errorMessageGetPhotos(err.message);
}
