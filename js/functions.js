const isWordLength = (word, number) => word.length <= number;


const palindrome = (word) => {
  word = word.replaceAll(' ', '').toUpperCase();
  let reversedWord = '';
  for(let i = word.length - 1; i >= 0 ; i--){
    reversedWord += word[i];
  }
  return word === reversedWord;
};

// const palindrome = (word) => {
//   const newWord = word.replaceAll(" ", "").toUpperCase();
//   return newWord === newWord.split("").reverse().join("");
// };     еще один способ

const devise = (oneWord) => {
  let newOneWord = '';
  for (let i = 0 ; i <= oneWord.length - 1 ; i++){
    const num = parseInt(oneWord[i], 10);
    if (!Number.isNaN(num)){
      newOneWord += oneWord[i];
    }
  }
  return newOneWord || NaN;
};

devise('dsd333');
isWordLength('pump' , 3);
palindrome('Pup');
