import { isEscapeKey } from './utils.js';

const ERROR_DISPLAY_DURATION = 5000;

let currentDialog = null;

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const dataErrorTemplate = document.querySelector('#data-error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key) && currentDialog) {
    evt.preventDefault();
    closeDialog();
    evt.stopPropagation();
  }
};

function closeDialog () {
  if (currentDialog) {
    currentDialog.remove();
    currentDialog = null;

    document.removeEventListener('keydown', onDocumentKeydown, true);
  }
}

const onDocumentClick = (evt) => {
  if (evt.target.closest('[data-dialog-close]') || !evt.target.closest('[data-dialog-content]')) {
    closeDialog();
  }
};

const openDialog = (template) => {
  const dialogElement = template.content.querySelector('[data-dialog-container]').cloneNode(true);

  document.body.appendChild(dialogElement);

  currentDialog = dialogElement;

  document.addEventListener('keydown', onDocumentKeydown, true);
};

document.addEventListener('click', onDocumentClick);

export const showError = () => {
  openDialog(errorTemplate);
};

export const showSuccess = () => {
  openDialog(successTemplate);
};

export const showDataError = () => {
  const errorElement = dataErrorTemplate.content.querySelector('.data-error').cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    if (errorElement) {
      errorElement.remove();
    }
  }, ERROR_DISPLAY_DURATION);
};
