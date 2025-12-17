import { isEscapeKey } from './utils.js';

let currentDialog = null;
let currentEscapeHandler = null;
let currentOutsideClickHandler = null;

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const dataErrorTemplate = document.querySelector('#data-error');

const descriptionInput = document.querySelector('.text__description');
const imgHashtags = document.querySelector('.text__hashtags');

const canCloseModal = () => {
  const activeElement = document.activeElement;
  const isInputFocused = activeElement === descriptionInput || activeElement === imgHashtags;
  return !isInputFocused && !document.querySelector('.error');
};

const createEscapeHandler = (closeCallback) => (evt) => {
  if (isEscapeKey(evt.key) && canCloseModal()) {
    evt.preventDefault();
    closeCallback();
  }
};

const createOutsideClickHandler = (closeCallback) => (evt) => {
  if (currentDialog && !currentDialog.contains(evt.target)) {
    closeCallback();
  }
};

const cleanupEventListeners = () => {
  if (currentEscapeHandler) {
    document.removeEventListener('keydown', currentEscapeHandler);
    currentEscapeHandler = null;
  }

  if (currentOutsideClickHandler) {
    document.removeEventListener('click', currentOutsideClickHandler);
    currentOutsideClickHandler = null;
  }
};

const closeDialog = () => {
  if (currentDialog) {
    currentDialog.remove();
    currentDialog = null;
    cleanupEventListeners();
  }
};

const openDialog = (template, className, closeCallback = closeDialog) => {
  closeDialog();

  const dialogElement = template.content.cloneNode(true);
  document.body.appendChild(dialogElement);
  currentDialog = document.querySelector(`.${className}`);

  const dialogButton = currentDialog.querySelector(`.${className}__button`);

  currentEscapeHandler = createEscapeHandler(closeCallback);
  currentOutsideClickHandler = createOutsideClickHandler(closeCallback);

  document.addEventListener('keydown', currentEscapeHandler);
  document.addEventListener('click', currentOutsideClickHandler);
  dialogButton.addEventListener('click', closeCallback);
};

export const showError = () => {
  openDialog(errorTemplate, 'error');
};

export const showSuccess = () => {
  openDialog(successTemplate, 'success');
};

export const showDataError = () => {
  const errorElement = dataErrorTemplate.content.cloneNode(true);
  document.body.appendChild(errorElement);

  const errorMessage = document.querySelector('.data-error');

  setTimeout(() => {
    if (errorMessage) {
      errorMessage.remove();
    }
  }, 5000);
};
