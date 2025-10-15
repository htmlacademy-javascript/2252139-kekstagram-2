import {NAMES, COMMENTS, DESCRIPTIONS, MIN_LIKES, MAX_LIKES, MIN_AVATAR_ID, MAX_AVATAR_ID, MIN_COMMENTS, MAX_COMMENTS, ID_INCREMENT} from './data.js';
import {getRandomInteger, getRandomArrayElement} from './utils.js';
import {openBigPicture} from './fullscreen-picture.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const generateComments = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + ID_INCREMENT,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  }));

const createPhoto = (id) => ({
  id: id + ID_INCREMENT,
  url: `photos/${id + ID_INCREMENT}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  name: getRandomArrayElement(NAMES),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  comments: generateComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)),
});

const createGallery = (maxPhotos) =>
  Array.from({ length: maxPhotos }, (_, index) => createPhoto(index));

const gallery = createGallery(20);

const createPictureEl = (pictureData) => {
  const galleryElement = pictureTemplate.cloneNode(true);

  galleryElement.querySelector('.picture__img').src = pictureData.url;
  galleryElement.querySelector('.picture__img').alt = pictureData.description;
  galleryElement.querySelector('.picture__likes').textContent = pictureData.likes;
  galleryElement.querySelector('.picture__comments').textContent = pictureData.comments.length;
  galleryElement.dataset.id = pictureData.id;

  return galleryElement;
};

const getPhotoById = (id) => gallery.find((photo) => photo.id === id);

const renderGallery = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const pictureElement = createPictureEl(picture);
    fragment.appendChild(pictureElement);
  });

  pictureList.appendChild(fragment);
};

renderGallery(gallery);

pictureList.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (!pictureElement || !pictureElement.dataset.id) {
    return;
  }

  const photoId = parseInt(pictureElement.dataset.id, 10);
  const photoData = getPhotoById(photoId);

  openBigPicture(photoData);
});
