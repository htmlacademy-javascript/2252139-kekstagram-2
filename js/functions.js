const isStrLengthValid = (str, number) => str.length <= number;

const isPalindrome = (str) => {
  str = str.replaceAll(' ', '').toUpperCase();

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[length - 1 - i]) {
      return false;
    }
  }

  return true;
};

const devise = (oneStr = '') => {
  let result = '';

  for (const char of oneStr) {
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  return result || NaN;
};

devise('dsd333');
isStrLengthValid('pump', 3);
isPalindrome('Pup');
