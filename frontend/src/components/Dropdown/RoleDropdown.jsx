import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import sampleRoles from 'helper/sampleData/sampleRoles';
import selectStyle from './constant/selectStyle';

const RoleDropdown = ({ label, value, onChange, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const items = sampleRoles.map((role) => ({
        label: role.name,
        value: role.roleId
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

export default RoleDropdown;
