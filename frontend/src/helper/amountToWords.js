import decimalToWords from 'decimal-number-to-words';

const amountToWords = (amount) => {
  const splitAmount = `${amount}`.split('.');
  const inWords = decimalToWords.toWords(splitAmount[0]);
  const centavo = splitAmount[1] ? ` & ${Number(splitAmount[1])}/100` : '';
  return `${inWords}${centavo}`;
};

export default amountToWords;
