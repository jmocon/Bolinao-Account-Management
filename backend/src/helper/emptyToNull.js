const filterCondition = (value) =>
  value !== undefined && value !== null && value !== '';

export const numberInput = (value) => {
  if (filterCondition(value)) {
    return value;
  }

  return 'NULL';
};

export const stringInput = (value) => {
  if (filterCondition(value)) {
    return `"${value}"`;
  }

  return 'NULL';
};
