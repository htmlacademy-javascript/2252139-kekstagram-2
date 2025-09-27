import {createGallery} from './data';

export const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
export const gallery = createGallery(20);

const createPictureEl = (pictureData) => {
  const galleryElement = pictureTemplate.cloneNode(true);

  galleryElement.querySelector('.picture__img').src = pictureData.url;
  galleryElement.querySelector('.picture__img').alt = pictureData.description;
  galleryElement.querySelector('.picture__likes').textContent = pictureData.likes;
  galleryElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  return galleryElement;
};

export const renderGallery = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureEl(picture);
    fragment.appendChild(pictureElement);
  });

  pictureList.appendChild(fragment);
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');

  commentElement.className = 'social__comment';

  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

export const createComments = (comments, limit) => {
  const socialComments = document.querySelector('.social__comments');

  socialComments.innerHTML = '';

  const limitedComments = comments.slice(0, limit);

  limitedComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });
};
