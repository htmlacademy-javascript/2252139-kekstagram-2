import {showError, showSuccess} from './dialogs.js';
import { onCloseImageEditor } from './upload-picture.js';
import { sendPhoto } from './api.js';

const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LEN = 140;
const ErrorMessage = {
  INVALID_HASHTAG: 'Введён невалидный хэштег',
  DESCRIPTION_TOO_LONG: 'Длина комментария больше 140 символов',
  HASHTAGS_TOO_MUCH: `Не более ${MAX_HASHTAGS} хэштегов`,
  HASHTAGS_UNIQUE:'Хэштеги повторяются.'
};
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
const descriptionInput = imgUploadForm.querySelector('.text__description');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');

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

const getHashtags = (value) => {
  const trimmedValue = value.trim();
  return trimmedValue === '' ? [] : trimmedValue.split(/\s+/);
};

const isHashtagsValid = (value) =>
  getHashtags(value).every((hashtag) => hashtagPattern.test(hashtag));

const isHashtagsCountValid = (value) =>
  getHashtags(value).length <= MAX_HASHTAGS;

const isHashtagsUnique = (value) => {
  const hashtags = getHashtags(value);
  const uniqueHashtags = new Set(hashtags.map((h) => h.toLowerCase()));

  return uniqueHashtags.size === hashtags.length;
};

const isDescriptionValid = (value) =>
  value.trim() === '' || value.length <= MAX_DESCRIPTION_LEN;

pristine.addValidator(hashtagsInput, isHashtagsValid, ErrorMessage.INVALID_HASHTAG);
pristine.addValidator(descriptionInput, isDescriptionValid, ErrorMessage.DESCRIPTION_TOO_LONG);
pristine.addValidator(hashtagsInput, isHashtagsCountValid, ErrorMessage.HASHTAGS_TOO_MUCH);
pristine.addValidator(hashtagsInput, isHashtagsUnique, ErrorMessage.HASHTAGS_UNIQUE);

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    try {
      toggleSubmitButton(true);

      await sendPhoto(new FormData(evt.target));
      onCloseImageEditor();
      showSuccess();
    } catch (err) {
      showError(err.message);
    } finally {
      toggleSubmitButton(false);
    }
  } else {
    hashtagsInput.style.borderColor = 'red';

    hashtagsInput.focus();
  }
});
