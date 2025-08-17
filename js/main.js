const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const NAMES = [
  'Муса',
  'Муслим',
  'Мустафа',
  'Мусавара',
  'Мусавара',
  'Мусавата'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Зачем это в интернете? Хотите чтобы все видели как вы выглядите?'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const ID_INCREMENT = 1;

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generateComments = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + ID_INCREMENT,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  }));

const createPhoto = (id) => ({
  id: id + ID_INCREMENT,
  url: `photos/${id + ID_INCREMENT}.jpg`,
  description: 'Мир животных',
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  name: getRandomArrayElement(NAMES),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  comments: generateComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)),
});

const createGallery = (maxPhotos) =>
  Array.from({ length: maxPhotos }, (_, index) => createPhoto(index));

createGallery(2);
