import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getBankAccounts } from 'api/bankAccount';
import selectStyle from './constant/selectStyle';

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
      styles={selectStyle}
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
