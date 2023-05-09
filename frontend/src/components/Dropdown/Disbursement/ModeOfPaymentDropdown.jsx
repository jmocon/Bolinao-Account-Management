import React from 'react';
import Select from 'react-select';

import modeOfPayments from 'constants/modeOfPayments';

const ModeOfPaymentDropdown = ({ label, value, onChange }) => {
  const options = Object.entries(modeOfPayments).map(([value, label]) => ({
    label,
    value
  }));
  const selected = options.find(
    (option) => String(option.value) === String(value)
  );

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
      value={selected}
      onChange={(e) => onChange(Number(e.value))}
    />
  );
};

export default ModeOfPaymentDropdown;
