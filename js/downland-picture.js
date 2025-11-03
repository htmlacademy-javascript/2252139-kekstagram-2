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

const closeOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', () =>{
  openOverlay();
});

imgUploadCancel.addEventListener('click', closeOverlay);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    if(!isInputFocused){
      closeOverlay();
    }
  }
}
