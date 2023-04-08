import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getItemCodes } from 'api/itemCode';

const ItemCodeDropdown = ({ label, value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      let result = [];
      try {
        result = await getItemCodes();
      } catch (error) {
        console.error(error);
      }

      const items = result.map((item) => ({
        label: item.name,
        value: item.itemCodeId
      }));

      setOptions(items);
    };

    fetch();
  }, []);

  useEffect(() => {
    let selectedItem = options.find((option) => option.value === value);

    setSelected(selectedItem || null);
  }, [options, value]);

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

export default ItemCodeDropdown;