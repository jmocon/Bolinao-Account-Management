import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getBankAccounts } from 'api/bankAccount';

const BankAccountDropdown = ({ label, value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      let result = [];
      try {
        result = await getBankAccounts();
      } catch (error) {
        console.error(error);
      }

      const items = result.map((item) => ({
        label: item.name,
        value: item.bankAccountId
      }));

      setOptions(items);
    };

    fetch();
  }, []);

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
      placeholder={placeholder || label}
      label={label}
      options={options}
      value={selected}
      onChange={({ value }) => onChange(value)}
    />
  );
};

export default BankAccountDropdown;
