import { isEscapeKey } from './utils.js';

const ERROR_DISPLAY_DURATION = 5000;

let currentDialog = null;

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const dataErrorTemplate = document.querySelector('#data-error');

const onCloseKeydown = (evt) => {
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

    document.removeEventListener('keydown', onCloseKeydown, true);
  }
}

const onCloseClick = (evt) => {
  if (evt.target.closest('[data-dialog-close]') || !evt.target.closest('[data-dialog-content]')) {
    closeDialog();
  }
};

const openDialog = (template) => {
  const dialogElement = template.content.firstElementChild.cloneNode(true);

  document.body.appendChild(dialogElement);

  currentDialog = dialogElement;

  document.addEventListener('keydown', onCloseKeydown, true);
};

document.addEventListener('click', onCloseClick);

export const showError = () => {
  openDialog(errorTemplate);
};

export const showSuccess = () => {
  openDialog(successTemplate);
};

export const showDataError = () => {
  const errorElement = dataErrorTemplate.content.firstElementChild.cloneNode(true);

  document.body.appendChild(errorElement);

  setTimeout(() => {
    if (errorElement) {
      errorElement.remove();
    }
  }, ERROR_DISPLAY_DURATION);
};
