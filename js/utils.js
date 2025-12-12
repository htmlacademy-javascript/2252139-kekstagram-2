export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

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
