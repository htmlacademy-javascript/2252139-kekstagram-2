import {isEscapeKey} from './utils.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const imgHashtags = imgUploadForm.querySelector('.text__hashtags');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const imgPreviewEffects = imgUploadForm.querySelectorAll('.effects__preview');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

const isInputFocused = () => {
  const activeElement = document.activeElement;

  return activeElement === descriptionInput || activeElement === imgHashtags;
};

const onUploadCancelClick = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadPreview.style.transform = 'scale(1)';
};

const onOverlayOpen = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', () =>{
  const file = imgUploadInput.files[0];
  if(file) {
    const tempUrl = URL.createObjectURL(file);
    imgUploadPreview.src = tempUrl;
    imgPreviewEffects.forEach((imgPreviewEffect) =>{
      imgPreviewEffect.style.backgroundImage = `url(${tempUrl})`;
    });
  }
  onOverlayOpen();
});

imgUploadCancel.addEventListener('click', onUploadCancelClick);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key) && !isInputFocused()) {
    evt.preventDefault();
    onUploadCancelClick();
  }
}

const smallerPhoto = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  scaleValue.value = `${currentValue - 25}%`;
  imgUploadPreview.style.transform = `scale(${(currentValue - 25) * 0.01})`;
};

const biggerPhoto = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  scaleValue.value = `${currentValue + 25}%`;
  imgUploadPreview.style.transform = `scale(${(currentValue + 25) * 0.01})`;
};

scaleSmallerButton.addEventListener('click', smallerPhoto);
scaleBiggerButton.addEventListener('click', biggerPhoto);
