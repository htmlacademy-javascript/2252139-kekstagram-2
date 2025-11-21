import {isEscapeKey} from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const descriptionInput = imgUploadForm.querySelector('.text__description');

const isInputFocused = () => {
  const activeElement = document.activeElement;

  return activeElement === descriptionInput || activeElement === imgHashtags;
};

const onOverlayClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onOverlayOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', () =>{
  onOverlayOpen();
});

imgUploadCancel.addEventListener('click', onOverlayClose);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key) && !isInputFocused) {
    evt.preventDefault();
  }
}
