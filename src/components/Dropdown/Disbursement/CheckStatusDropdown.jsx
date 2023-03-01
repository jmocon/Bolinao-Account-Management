import React from 'react';
import Select from 'react-select';

import checkStatuses from 'constants/checkStatuses';

const CheckStatusDropdown = ({ label, value, onChange }) => {
  const options = Object.entries(checkStatuses).map(([value, label]) => ({
    label,
    value
  }));

  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: 'rgba(29, 37, 59, 0.5)',
          borderRadius: '0.4285rem'
        })
      }}
      isSearchable
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default CheckStatusDropdown;
