import {renderGallery, gallery, createComments} from './thumbnails';
import {isEscapeKey} from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureClosedElement = bigPicture.querySelector('.cancel');

const COMMENTS_SHOWN = 5;

renderGallery(gallery);

const pictureImages = document.querySelectorAll('.picture__img');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
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


pictureImages.forEach((pictureImage, index) => {
  pictureImage.addEventListener('click', () => {
    const photoData = gallery[index];

    if (!photoData) {
      return;
    }

    createComments(photoData.comments, bigPictureShownCount.textContent);

    bigPictureDescription.textContent = photoData.description;
    bigPictureShownCount.textContent = COMMENTS_SHOWN;
    bigPictureTotalCount.textContent = photoData.comments.length;
    bigPictureLikes.textContent = photoData.likes;
    bigPictureImg.src = photoData.url;

    openPhotoModal();

    document.body.classList.add('modal-open');

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden'); /*Временно скрываю */
  });
});

bigPictureClosedElement.addEventListener('click', () => {
  closeUserModal();
});
