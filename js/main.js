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
  'Мусавара ',
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

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generateComments = (count) => (

  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  }))
);

const getCreatPhotoDescription = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Мир животных',
  likes: getRandomInteger(15, 200),
  name: getRandomArrayElement(NAMES),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  comments: generateComments(getRandomInteger(0, 30))
});

Array.from({ length: 25 }, (_, index) => getCreatPhotoDescription(index));
