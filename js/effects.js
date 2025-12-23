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
    initialValue: 1,
    type: 'grayscale',
    unit:''
  },
  sepia: {
    range: { min: DEFAULT_MIN_RANGE, max: SEPIA_MAX_RANGE },
    start: 1,
    step: MIN_STEP,
    initialValue: 1,
    type: 'sepia',
    unit:''
  },
  marvin: {
    range: { min: DEFAULT_MIN_RANGE, max: DEFAULT_MAX_RANGE },
    start: DEFAULT_MAX_VALUE,
    step: DEFAULT_STEP,
    initialValue: DEFAULT_MAX_VALUE,
    type: 'invert',
    unit:'%'
  },
  phobos: {
    range: { min: DEFAULT_MIN_RANGE, max: PHOBOS_MAX_RANGE },
    start: PHOBOS_MAX_RANGE,
    step: MIN_STEP,
    initialValue: PHOBOS_MAX_RANGE,
    type: 'blur',
    unit:'px'
  },
  heat: {
    range: { min: HEAT_MIN_RANGE, max: HEAT_MAX_RANGE },
    start: HEAT_MAX_RANGE,
    step: MIN_STEP,
    initialValue: HEAT_MAX_RANGE,
    type: 'brightness',
    unit:''
  },
  none: {
    range: { min: DEFAULT_MIN_RANGE, max: DEFAULT_MAX_RANGE },
    start: DEFAULT_MAX_VALUE,
    step: DEFAULT_STEP,
    initialValue: DEFAULT_MAX_VALUE
  }
};

const imgUploadSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.effect-level');
const form = document.querySelector('.img-upload__form');

let currentEffect = EffectConfig.none;

noUiSlider.create(imgUploadSlider, {
  range: EffectConfig.none.range,
  start: EffectConfig.none.start,
  connect: 'lower',
  step: EffectConfig.none.step
});

effectLevelElement.classList.add('hidden');

export const resetEffectAndSlider = () => {
  imgPreview.removeAttribute('style');
  currentEffect = EffectConfig.none;
  effectLevelElement.classList.add('hidden');
  form.reset();
};

const applyEffect = (currentFilter, value) => {
  const { unit, type } = currentFilter;

  imgPreview.style.filter = `${type}(${value}${unit})`;
};

imgUploadSlider.noUiSlider.on('update', () => {
  const value = imgUploadSlider.noUiSlider.get();
  applyEffect(currentEffect, value);
});

effectsList.addEventListener('change', (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = EffectConfig[evt.target.value] ?? EffectConfig.none;

    effectLevelElement.classList.remove('hidden');

    if (currentEffect === EffectConfig.none) {
      resetEffectAndSlider();
      return;
    }

    imgUploadSlider.noUiSlider.updateOptions({
      range: currentEffect.range,
      start: currentEffect.start,
      step: currentEffect.step,
    });

    applyEffect(currentEffect, currentEffect.initialValue);
  }
});
