import {createGallery} from './data';
import {renderGallery, gallery, createCommentator} from './thumbnails';
import {getRandomInteger} from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureTotalCount = document.querySelector('.social__comment-total-count');

const MIN_COMMENTS_SHOWN = 2;
const MAX_COMMENTS_SHOWN = 5;

renderGallery(gallery);

const pictureImages = document.querySelectorAll('.picture__img');

pictureImages.forEach((pictureImage) => {
  pictureImage.addEventListener('click', (evt) => {

    const pictureElement = evt.target.closest('.picture');

    bigPictureShownCount.textContent = getRandomInteger(MIN_COMMENTS_SHOWN, MAX_COMMENTS_SHOWN);
    createCommentator(bigPictureShownCount.textContent);
    bigPictureTotalCount.textContent = pictureElement.querySelector('.picture__comments').textContent;
    bigPictureLikes.textContent = pictureElement.querySelector('.picture__likes').textContent;
    bigPictureImg.src = pictureImage.src;
    bigPicture.classList.remove('hidden');
  });
});
