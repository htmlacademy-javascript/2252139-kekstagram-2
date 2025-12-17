import { isEscapeKey } from './utils.js';

const onDocumentKeydown = (value) => (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    value();
  }
};

const onOutsideClick = (value, sendingSuccess) => (evt) => {
  const Element = document.querySelector(`.${value}`);
  const InnerElement = document.querySelector(`.${value}__inner`);

  if (Element && !InnerElement.contains(evt.target)) {
    sendingSuccess();
  }
};

const onCloseErrorButtonClick = () =>
  closeErrorMessageSendPhoto();

function closeErrorMessageSendPhoto () {
  const messageElement = document.querySelector('.error');
  const errorButtonMessageSend = document.querySelector('.error__button');

  if (messageElement) {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown(closeErrorMessageSendPhoto));
    document.removeEventListener('click', onOutsideClick('error', closeErrorMessageSendPhoto));
    errorButtonMessageSend.removeEventListener('click', onCloseErrorButtonClick);
  }
}

export const errorMessageSendPhoto = () => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);

  document.body.appendChild(errorElement);

  const errorButtonMessageSend = document.querySelector('.error__button');

  document.addEventListener('keydown', onDocumentKeydown(closeErrorMessageSendPhoto));
  document.addEventListener('click', onOutsideClick('error', closeErrorMessageSendPhoto));
  errorButtonMessageSend.addEventListener('click', onCloseErrorButtonClick);
};

export const errorMessageGetPhotos = () => {
  const errorTemplate = document.querySelector('#data-error');
  const errorElement = errorTemplate.content.cloneNode(true);

  document.body.appendChild(errorElement);

  const errorMessage = document.body.lastElementChild;

  setTimeout(() => {
    if (errorMessage && errorMessage.parentNode) {
      errorMessage.remove();
    }
  }, 5000);
};

const onCloseSuccessButtonClick = () =>
  closeSuccessMessageSendPhoto();

function closeSuccessMessageSendPhoto () {
  const messageElement = document.querySelector('.success');
  const successButtonMessageSend = document.querySelector('.success__button');

  if (messageElement) {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown(closeSuccessMessageSendPhoto));
    document.removeEventListener('click', onOutsideClick('success', closeSuccessMessageSendPhoto));
    successButtonMessageSend.removeEventListener('click', onCloseSuccessButtonClick);
  }
}

export const successMessageSendPhoto = () => {
  const SuccessTemplate = document.querySelector('#success');
  const SuccessElement = SuccessTemplate.content.cloneNode(true);

  document.body.appendChild(SuccessElement);

  const successButtonMessageSend = document.querySelector('.success__button');

  document.addEventListener('keydown', onDocumentKeydown(closeSuccessMessageSendPhoto));
  document.addEventListener('click', onOutsideClick('success', closeSuccessMessageSendPhoto));
  successButtonMessageSend.addEventListener('click', onCloseSuccessButtonClick);
};

