const numberToDecimal = (value = 0) =>
  (value || 0).toLocaleString('en', {
    minimumFractionDigits: 2
  });

export default numberToDecimal;
