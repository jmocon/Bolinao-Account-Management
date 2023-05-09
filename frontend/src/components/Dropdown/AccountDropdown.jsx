import React from 'react';
import Select from 'react-select';

import sampleAccounts from 'helper/sampleData/sampleAccounts';

const AccountDropdown = ({ label, value, onChange }) => {
  const options = sampleAccounts().map((account) => ({
    label: account.owner,
    value: account.accountId
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

export default AccountDropdown;
