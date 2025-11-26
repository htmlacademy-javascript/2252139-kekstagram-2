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
const defaultConfig = EffectConfig.none;

let currentEffect = 'none';

export const resetSlider = () => {
  imgUploadValue.value = DEFAULT_MAX_VALUE;
  effectLevelElement.style.display = 'none';
  imgPreview.style.filter = 'none';

  noUiSlider.create(imgUploadSlider, {
    range: defaultConfig.range,
    start: defaultConfig.start,
    connect: 'lower',
    step: defaultConfig.step
  });
};

resetSlider();

const applyEffect = (effect, value) => {
  switch(effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      effectLevelElement.style.display = 'block';
      break;

    case 'none':
      imgPreview.style.filter = 'none';
      break;

    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      effectLevelElement.style.display = 'block';
      break;

    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      effectLevelElement.style.display = 'block';
      break;

    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      effectLevelElement.style.display = 'block';
      break;

    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      effectLevelElement.style.display = 'block';
      break;

    default:
      imgPreview.style.filter = 'none';
  }
};

imgUploadSlider.noUiSlider.on('update', () => {
  const value = imgUploadSlider.noUiSlider.get();
  applyEffect(currentEffect, value);
});


effectsList.addEventListener('change', (evt) => {
  if(evt.target.type === 'radio'){
    currentEffect = evt.target.value;
    const config = EffectConfig[currentEffect];

    if (currentEffect === 'none') {
      resetSlider();
    } else {
      imgUploadSlider.noUiSlider.updateOptions({
        range: config.range,
        start: config.start,
        step: config.step,
      });

      applyEffect(currentEffect, config.initialValue);
    }
  }
});
