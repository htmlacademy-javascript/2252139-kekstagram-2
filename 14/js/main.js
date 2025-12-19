import './gallery.js';
import './fullscreen-picture.js';
import './upload-picture.js';
import './form.js';
import './api.js';

import { showDataError } from './dialogs.js';
import { renderGallery, setGalleryData } from './gallery.js';
import { getPhotos } from './api.js';
import { initFilters } from './filter.js';

try {
  const gallery = await getPhotos();
  renderGallery(gallery);
  setGalleryData(gallery);

  initFilters();
} catch (err) {
  showDataError(err.message);
}
