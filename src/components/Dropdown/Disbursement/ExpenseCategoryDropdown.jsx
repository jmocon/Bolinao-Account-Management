import React from 'react';
import Select from 'react-select';

import expenseCategories from 'constants/expenseCategories';

const ExpenseCategoryDropdown = ({ label, value, onChange }) => {
  const options = Object.entries(expenseCategories).map(([val, lbl]) => ({
    label: lbl,
    value: Number(val)
  }));

  const selected = options.find((option) => option.value === value);
  return (
    <Select
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: 'rgba(29, 37, 59, 0.5)',
          borderRadius: '0.4285rem'
        })
      }}
      isSearchable
      label={label}
      options={options}
      value={selected}
      onChange={({ value }) => onChange(value)}
    />
  );
};

export default ExpenseCategoryDropdown;
