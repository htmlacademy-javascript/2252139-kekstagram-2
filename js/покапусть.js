import {renderGallery, setGalleryData} from './gallery.js';
import {showErrorMessage} from './utils';
import {setUserFormSubmit} from '../vendor/pristine/pristine.min.js';
import { closePhotoModal } from './fullscreen-picture.js';

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

setUserFormSubmit(closePhotoModal,sendData);
