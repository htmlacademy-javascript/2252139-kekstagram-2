const isStrLengthValid = (str, strLength) => str.length <= strLength;

const isPalindrome = (str) => {
  const strInverted = str.replaceAll(' ', '').toUpperCase();

  for (let i = 0; i < Math.floor(strInverted.length / 2); i++) {
    if (strInverted[i] !== strInverted[strInverted.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

const extractNumbersFromStr = (str = '') => {
  let result = '';

  for (const char of str) {
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  return result || NaN;
};

extractNumbersFromStr('dsd333');
isStrLengthValid('pump', 3);
isPalindrome('Pup');
