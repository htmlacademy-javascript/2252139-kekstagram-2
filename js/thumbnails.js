import {createGallery} from './data';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const gallery = createGallery(3);

const createPictureEl = (pictureData) => {
  const galleryElement = pictureTemplate.cloneNode(true);

  galleryElement.querySelector('.picture__img').src = pictureData.url;
  galleryElement.querySelector('.picture__img').alt = pictureData.description;
  galleryElement.querySelector('.picture__likes').textContent = pictureData.likes;
  galleryElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  return galleryElement;
};

const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureEl(picture);
    fragment.appendChild(pictureElement);
  });

  pictureList.appendChild(fragment);
};

renderGallery(gallery);
