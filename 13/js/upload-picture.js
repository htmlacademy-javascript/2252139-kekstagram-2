import {isEscapeKey} from './utils.js';
import {resetEffectAndSlider} from './effects.js';

const SCALE_FACTOR = 0.01;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const ScaleDirection = {
  SMALLER: 'smaller',
  BIGGER: 'bigger'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
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

const updateScaleValue = (value) => {
  scaleValue.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${value * SCALE_FACTOR})`;
};

const applyPreviewImg = (url, src) => {
  imgUploadPreview.src = src;

  imgPreviewEffects.forEach((imgPreviewEffect) => {
    imgPreviewEffect.style.backgroundImage = url;
  });
};

const resetUploadedImage = () => {
  applyPreviewImg('', '');

  imgUploadInput.value = '';
};

const onCloseImageEditor = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadPreview.removeAttribute('style');

  resetEffectAndSlider();
  resetUploadedImage();
  updateScaleValue(MAX_SCALE);
};
const isValidImageFile = (file) => {
  if (!file) {
    return false;
  }

  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const applyUploadedImage = () => {
  const file = imgUploadInput.files[0];

  if(!isValidImageFile(file)){
    imgUploadInput.value = '';
    return;
  }

  const tempUrl = URL.createObjectURL(file);
  const bgUrl = `url(${tempUrl})`;
  applyPreviewImg(bgUrl, tempUrl);
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

  switch (direction) {
    case ScaleDirection.SMALLER:
      newValue = Math.max(MIN_SCALE, currentValue - SCALE_STEP);
      break;

    case ScaleDirection.BIGGER:
      newValue = Math.min(MAX_SCALE, currentValue + SCALE_STEP);
      break;

    default:
      throw new Error(`Неизвестное масштабирование: ${direction}`);
  }

  updateScaleValue(newValue);
};

const onSmallerClick = () => scalePhoto(ScaleDirection.SMALLER);
const onBiggerClick = () => scalePhoto(ScaleDirection.BIGGER);

scaleSmallerButton.addEventListener('click', onSmallerClick);
scaleBiggerButton.addEventListener('click', onBiggerClick);
