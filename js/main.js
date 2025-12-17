import './gallery.js';
import './fullscreen-picture.js';
import './upload-picture.js';
import './form.js';
import './api.js';

import { errorMessageGetPhotos } from './dialogs.js';
import {renderGallery, setGalleryData} from './gallery.js';
import { getPhotos } from './api.js';

try {
  const gallery = await getPhotos();
  renderGallery(gallery);
  setGalleryData(gallery);
} catch (err) {
  errorMessageGetPhotos(err.message);
}
