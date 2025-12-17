import {openBigPicture} from './fullscreen-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureEl = (pictureData) => {
  const galleryElement = pictureTemplate.cloneNode(true);

  galleryElement.querySelector('.picture__img').src = pictureData.url;
  galleryElement.querySelector('.picture__img').alt = pictureData.description;
  galleryElement.querySelector('.picture__likes').textContent = pictureData.likes;
  galleryElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  galleryElement.dataset.id = pictureData.id;

  return galleryElement;
};

let galleryData = [];

export const setGalleryData = (data) => {
  galleryData = data;
};

export const getGalleryData = () => galleryData;

const getPhotoById = (id) => galleryData.find((photo) => photo.id === id);

export const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const pictureElement = createPictureEl(picture);
    fragment.appendChild(pictureElement);
  });

  pictureList.appendChild(fragment);
};

pictureList.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (!pictureElement || !pictureElement.dataset.id) {
    return;
  }

  const photoId = parseInt(pictureElement.dataset.id, 10);
  const photoData = getPhotoById(photoId);

  openBigPicture(photoData);
});

export const clearGallery = () => {
  const galleryItems = document.querySelectorAll('.picture');

  galleryItems.forEach((item) => item.remove());
};
