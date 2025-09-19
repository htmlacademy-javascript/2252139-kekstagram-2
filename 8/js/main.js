import {createGallery} from './data';

const pictureList = document.querySelector('.pictures');
const similarGallaryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarGallary = createGallery(3);
const similarListFragment = document.createDocumentFragment();

similarGallary.forEach((element) => {
  const gallaryElement = similarGallaryTemplate.cloneNode(true);

  gallaryElement.querySelector('.picture__img').src = element.url;
  gallaryElement.querySelector('.picture__img').alt = element.description;
  gallaryElement.querySelector('.picture__likes').textContent = element.likes;
  gallaryElement.querySelector('.picture__comments').textContent = element.comments.length;

  similarListFragment.appendChild(gallaryElement);
});

pictureList.appendChild(similarListFragment);
