import { isEscapeKey } from './utils.js';

let currentDialog = null;

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const dataErrorTemplate = document.querySelector('#data-error');

const createEscapeHandler = (closeCallback) => (evt) => {
  if (isEscapeKey(evt.key) && currentDialog) {
    evt.preventDefault();
    closeCallback();
    evt.stopPropagation();
  }
};

const createOutsideClickHandler = (closeCallback) => (evt) => {
  if (evt.target.closest('[data-dialog-close]') || !evt.target.closest('[data-dialog-content]')) {
    closeCallback();
  }
};

const closeDialog = () => {
  if (currentDialog) {
    currentDialog.remove();
    currentDialog = null;
  }
};

const openDialog = (template) => {
  const dialogElement = template.content.cloneNode(true);
  const dialogMainElement = dialogElement.children[0];

  document.body.appendChild(dialogElement);

  currentDialog = dialogMainElement;
};
document.addEventListener('keydown', createEscapeHandler(closeDialog), { capture: true });
document.addEventListener('click', createOutsideClickHandler(closeDialog));

export const showError = () => {
  openDialog(errorTemplate);
};

export const showSuccess = () => {
  openDialog(successTemplate);
};

export const showDataError = () => {
  const errorElement = dataErrorTemplate.content.cloneNode(true);
  const errorMainElement = errorElement.children[0];

  document.body.appendChild(errorElement);

  const errorMessage = errorMainElement;

  setTimeout(() => {
    if (errorMessage) {
      errorMessage.remove();
    }
  }, 5000);
};
