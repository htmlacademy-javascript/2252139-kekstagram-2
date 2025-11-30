const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;
const DEFAULT_MAX_RANGE = 100;
const DEFAULT_MIN_RANGE = 0;
const MIN_STEP = 0.1;
const CHROME_MAX_RANGE = 1;
const SEPIA_MAX_RANGE = 1;
const PHOBOS_MAX_RANGE = 3;
const HEAT_MIN_RANGE = 1;
const HEAT_MAX_RANGE = 3;
const NONE = 'none';
const EffectConfig = {
  chrome: {
    range: { min: DEFAULT_MIN_RANGE, max: CHROME_MAX_RANGE },
    start: 1,
    step: MIN_STEP,
    initialValue: 1
  },
  sepia: {
    range: { min: DEFAULT_MIN_RANGE, max: SEPIA_MAX_RANGE },
    start: 1,
    step: MIN_STEP,
    initialValue: 1
  },
  marvin: {
    range: { min: DEFAULT_MIN_RANGE, max: DEFAULT_MAX_RANGE },
    start: DEFAULT_MAX_VALUE,
    step: DEFAULT_STEP,
    initialValue: DEFAULT_MAX_VALUE
  },
  phobos: {
    range: { min: DEFAULT_MIN_RANGE, max: PHOBOS_MAX_RANGE },
    start: PHOBOS_MAX_RANGE,
    step: MIN_STEP,
    initialValue: PHOBOS_MAX_RANGE
  },
  heat: {
    range: { min: HEAT_MIN_RANGE, max: HEAT_MAX_RANGE },
    start: HEAT_MAX_RANGE,
    step: MIN_STEP,
    initialValue: HEAT_MAX_RANGE
  },
  none: {
    range: { min: DEFAULT_MIN_RANGE, max: DEFAULT_MAX_RANGE },
    start: DEFAULT_MAX_VALUE,
    step: DEFAULT_STEP,
    initialValue: DEFAULT_MAX_VALUE
  }
};

const imgUploadSlider = document.querySelector('.effect-level__slider');
const imgUploadValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.effect-level');

let currentEffect = NONE;

export const initSlider = () => {
  noUiSlider.create(imgUploadSlider, {
    range: EffectConfig.none.range,
    start: EffectConfig.none.start,
    connect: 'lower',
    step: EffectConfig.none.step
  });
};

const resetSlider = () => {
  imgUploadValue.value = DEFAULT_MAX_VALUE;
  imgPreview.style.filter = 'none';
  currentEffect = NONE;
  effectLevelElement.classList.add('hidden');
};

initSlider();

export const applyEffect = (effect, value) => {
  switch(effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;

    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;

    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;

    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      break;

    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;

    case 'none':
    default:
      resetSlider();
  }
};

imgUploadSlider.noUiSlider.on('update', () => {
  const value = imgUploadSlider.noUiSlider.get();
  applyEffect(currentEffect, value);
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    const config = EffectConfig[currentEffect] ?? EffectConfig.none;

    effectLevelElement.classList.remove('hidden');

    imgUploadSlider.noUiSlider.updateOptions({
      range: config.range,
      start: config.start,
      step: config.step,
    });

    applyEffect(currentEffect, config.initialValue);
  }
});
