import {renderGallery, setGalleryData} from './gallery.js';
import {showErrorMessage} from './utils.js';
import { onCloseImageEditor } from './upload-picture.js';

const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LEN = 140;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

export const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

getData()
  .then((gallery) => {
    renderGallery(gallery);
    setGalleryData(gallery);
  })
  .catch(
    (err) => {
      showErrorMessage(err.message);
    }
  );

const toggleSubmitButton = (disabled) => {
  imgUploadSubmit.disabled = disabled;
  imgUploadSubmit.textContent = disabled
    ? SubmitButtonText.SENDING
    : SubmitButtonText.IDLE;
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isHashtagsValid = (value) => {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return true;
  }

  const hashtagsArray = trimmedValue.split(/\s+/);

  if (hashtagsArray.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set(hashtagsArray.map((h) => h.toLowerCase()));

  if (uniqueHashtags.size !== hashtagsArray.length) {
    return false;
  }

  return hashtagsArray.every((hashtag) => hashtagPattern.test(hashtag));
};

const isDescriptionValid = (value) =>
  value.trim() === '' || value.length <= MAX_DESCRIPTION_LEN;

pristine.addValidator(hashtagsInput, isHashtagsValid, 'введён невалидный хэштег');
pristine.addValidator(descriptionInput, isDescriptionValid, 'длина комментария больше 140 символов.');

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    try {
      toggleSubmitButton(true);

      await sendData(new FormData(evt.target));
      onCloseImageEditor();
    } catch (err) {
      showErrorMessage(err.message);
    } finally {
      toggleSubmitButton(false);
    }
  } else {
    hashtagsInput.style.borderColor = 'red';

    hashtagsInput.focus();
  }
});

