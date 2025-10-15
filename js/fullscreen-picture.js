import {isEscapeKey} from './utils.js';

const COMMENTS_SHOWN = 5;

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden'); /*Временно скрываю */
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureClosedElement = bigPicture.querySelector('.cancel');
const socialComments = document.querySelector('.social__comments');


function onDocumentKeydown (evt){
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closePhotoModal();
  }
}

function closePhotoModal () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPhotoModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
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
  const limitedComments = comments.slice(0, limit);
  const fragment = document.createDocumentFragment();

  limitedComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);

    fragment.appendChild(commentElement);
  });

  socialComments.append(fragment);
};

export const openBigPicture = (photoData) => {
  socialComments.innerHTML = '';
  createComments(photoData.comments, COMMENTS_SHOWN);

  bigPictureDescription.textContent = photoData.description;
  bigPictureShownCount.textContent = COMMENTS_SHOWN;
  bigPictureTotalCount.textContent = photoData.comments.length;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureImg.src = photoData.url;

  openPhotoModal();
};


bigPictureClosedElement.addEventListener('click', () => {
  closePhotoModal();
});
