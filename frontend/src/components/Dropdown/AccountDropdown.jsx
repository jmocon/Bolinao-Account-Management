import React from 'react';
import Select from 'react-select';

import sampleAccounts from 'helper/sampleData/sampleAccounts';
import selectStyle from './constant/selectStyle';

const AccountDropdown = ({ label, value, onChange }) => {
  const options = sampleAccounts().map((account) => ({
    label: account.owner,
    value: account.accountId
  }));

  return (
    <Select
      styles={selectStyle}
      isSearchable
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default AccountDropdown;
