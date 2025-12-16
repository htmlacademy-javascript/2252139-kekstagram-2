export const isEscapeKey = (key) => key === 'Escape';

export const showErrorMessage = () => {
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
