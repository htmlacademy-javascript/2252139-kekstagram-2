import {isEscapeKey} from './utils.js';
import {applyEffect} from './effects.js';

const ScaleDirection = {
  SMALLER: 'smaller',
  BIGGER: 'bigger'
};
const SCALE_FACTOR = 0.01;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 'scale(1)';
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

const onCloseImageEditor = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadPreview.style.transform = DEFAULT_SCALE;

  applyEffect('none');
};

const applyUploadedImage = () => {
  const file = imgUploadInput.files[0];
  if(file) {
    const tempUrl = URL.createObjectURL(file);
    imgUploadPreview.src = tempUrl;
    imgPreviewEffects.forEach((imgPreviewEffect) =>{
      imgPreviewEffect.style.backgroundImage = `url(${tempUrl})`;
    });
  }
};

const onOpenImageEditor = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  applyUploadedImage();
};

imgUploadInput.addEventListener('change', onOpenImageEditor);

imgUploadCancel.addEventListener('click', onCloseImageEditor);

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt.key) && !isInputFocused()) {
    evt.preventDefault();
    onCloseImageEditor();
  }
}

const scalePhoto = (direction) => {
  const currentValue = parseInt(scaleValue.value, 10);
  let newValue = currentValue;

  if (direction === ScaleDirection.SMALLER) {
    newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
  } else if (direction === ScaleDirection.BIGGER) {
    newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
  } else {
    throw new Error(`Неизвестное масштабирование: ${direction}`);
  }

  scaleValue.value = `${newValue}%`;
  imgUploadPreview.style.transform = `scale(${newValue * SCALE_FACTOR})`;
};

const onSmallerClick = () => scalePhoto(ScaleDirection.SMALLER);
const onBiggerClick = () => scalePhoto(ScaleDirection.BIGGER);

scaleSmallerButton.addEventListener('click', onSmallerClick);
scaleBiggerButton.addEventListener('click', onBiggerClick);
