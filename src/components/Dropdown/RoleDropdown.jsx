import React from 'react';
import Select from 'react-select';

import sampleRoles from 'helper/sampleData/sampleRoles';

const RoleDropdown = ({ label, value, onChange }) => {
  const options = sampleRoles.map((role) => ({
    label: role.name,
    value: role.roleId
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

export default RoleDropdown;
