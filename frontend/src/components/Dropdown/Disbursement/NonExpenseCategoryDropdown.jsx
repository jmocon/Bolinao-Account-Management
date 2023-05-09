import React from 'react';
import Select from 'react-select';

import nonExpenseCategories from 'constants/nonExpenseCategories';

const NonExpenseCategoryDropdown = ({ label, value, onChange }) => {
  const options = Object.entries(nonExpenseCategories).map(([val, lbl]) => ({
    label: lbl,
    value: Number(val)
  }));

  const selected = options.find(
    (option) => String(option.value) === String(value)
  );

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

export default NonExpenseCategoryDropdown;
