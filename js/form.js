import {errorMessageSendPhoto, successMessageSendPhoto} from './dialogs.js';
import { onCloseImageEditor } from './upload-picture.js';
import { sendPhoto } from './api.js';

const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LEN = 140;
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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

  return hashtagsArray.every((hashtag) => hashtagPattern.test(hashtag));
};

const isMaxHashtagsValid = (value) => {
  const trimmedValue = value.trim();
  const hashtags = trimmedValue.split(/\s+/);
  if (trimmedValue === '') {
    return true;
  }

  return hashtags.length <= MAX_HASHTAGS;
};

const isUniqueHashtagsValid = (value) => {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return true;
  }

  const hashtags = trimmedValue.split(/\s+/);
  const uniqueHashtags = new Set(hashtags.map((h) => h.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
};

const isDescriptionValid = (value) =>
  value.trim() === '' || value.length <= MAX_DESCRIPTION_LEN;

pristine.addValidator(hashtagsInput, isHashtagsValid, 'введён невалидный хэштег');
pristine.addValidator(descriptionInput, isDescriptionValid, 'длина комментария больше 140 символов.');
pristine.addValidator(hashtagsInput, isMaxHashtagsValid, `Не более ${MAX_HASHTAGS} хэштегов`);
pristine.addValidator(hashtagsInput, isUniqueHashtagsValid, 'Хэштеги повторяются.');

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    try {
      toggleSubmitButton(true);

      await sendPhoto(new FormData(evt.target));
      onCloseImageEditor();
      successMessageSendPhoto();
    } catch (err) {
      errorMessageSendPhoto(err.message);
    } finally {
      toggleSubmitButton(false);
    }
  } else {
    hashtagsInput.style.borderColor = 'red';

    hashtagsInput.focus();
  }
});
