import {isEscapeKey} from './utils.js';

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureClosedElement = bigPicture.querySelector('.cancel');
const socialComments = document.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

let updatedСomments = 5;
let currentPhotoData = null;

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

  updatedСomments = 5;
  currentPhotoData = null;
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

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);

    fragment.appendChild(commentElement);
  });

  socialComments.append(fragment);
};

const updateComments = () => {
  if (!currentPhotoData) {
    return;
  }

  socialComments.innerHTML = '';

  const totalComments = currentPhotoData.comments.length;
  const commentsToShow = Math.min(updatedСomments, totalComments);
  const limitedComments = currentPhotoData.comments.slice(0, commentsToShow);

  renderComments(limitedComments);
  bigPictureShownCount.textContent = commentsToShow;
  bigPictureTotalCount.textContent = totalComments;

  bigPictureCommentsLoader.classList.toggle('hidden', commentsToShow >= totalComments);

  updatedСomments += 5;
};

export const openBigPicture = (photoData) => {
  socialComments.innerHTML = '';

  currentPhotoData = photoData;
  bigPictureDescription.textContent = photoData.description;
  bigPictureLikes.textContent = photoData.likes;
  bigPictureImg.src = photoData.url;

  updateComments();
  openPhotoModal();
};


bigPictureClosedElement.addEventListener('click', () => {
  closePhotoModal();
});

bigPictureCommentsLoader.addEventListener('click',(evt) => {
  evt.preventDefault();

  updateComments();
});
