import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getCompanies } from 'api/company';
import selectStyle from './constant/selectStyle';

const CompanyDropdown = ({ label, value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      let result = [];
      try {
        result = await getCompanies();
      } catch (error) {
        console.error(error);
      }

      const items = result.map((item) => ({
        label: `${item.code} - ${item.name}`,
        value: item.companyId
      }));

      setOptions(items);
    };

    fetch();
  }, []);

  useEffect(() => {
    const selectedItem = options.find((option) => option.value === value);
    setSelected(selectedItem || null);
  }, [options, value]);

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

export default CompanyDropdown;
