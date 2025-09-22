import {createGallery} from './data';

const pictureList = document.querySelector('.pictures');
const similarGalleryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarGallery = createGallery(3);
const fragment = document.createDocumentFragment();

const renderGallery = () =>{
  similarGallery.forEach((element) => {
    const galleryElement = similarGalleryTemplate.cloneNode(true);

    galleryElement.querySelector('.picture__img').src = element.url;
    galleryElement.querySelector('.picture__img').alt = element.description;
    galleryElement.querySelector('.picture__likes').textContent = element.likes;
    galleryElement.querySelector('.picture__comments').textContent = element.comments.length;

    fragment.appendChild(galleryElement);
  });

  pictureList.appendChild(fragment);
};

renderGallery();
