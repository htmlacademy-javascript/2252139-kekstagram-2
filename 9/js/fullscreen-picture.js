import {renderGallery, getPhotoById} from './thumbnails';
import {isEscapeKey} from './utils';

const COMMENTS_SHOWN = 5;

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureClosedElement = bigPicture.querySelector('.cancel');
const pictures = document.querySelector('.pictures');

renderGallery();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const closeUserModal = () => {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPhotoModal = () =>{
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

const createCommentElement = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const createComments = (comments, limit) => {
  const socialComments = document.querySelector('.social__comments');

  const limitedComments = comments.slice(0, limit);

  const fragment = document.createDocumentFragment();

  limitedComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });
  socialComments.append(fragment);
};

const openBigPicture = (photoData) => {
  createComments(photoData.comments, COMMENTS_SHOWN);

  bigPictureDescription.textContent = photoData.description;
  bigPictureShownCount.textContent = COMMENTS_SHOWN;
  bigPictureTotalCount.textContent = photoData.comments.length;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureImg.src = photoData.url;

  openPhotoModal();

  document.body.classList.add('modal-open');

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden'); /*Временно скрываю */
};

pictures.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  const photoId = parseInt(pictureElement.dataset.id, 10);

  const photoData = getPhotoById(photoId);

  openBigPicture(photoData);
});

bigPictureClosedElement.addEventListener('click', () => {
  closeUserModal();
});
