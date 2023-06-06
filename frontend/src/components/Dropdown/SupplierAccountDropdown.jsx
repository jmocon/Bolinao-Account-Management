import React from 'react';
import Select from 'react-select';

import sampleSupplierAccounts from 'helper/sampleData/sampleSupplierAccounts';
import { getBank } from 'helper/sampleData/sampleBanks';
import selectStyle from './constant/selectStyle';

const SupplierAccountDropdown = ({ label, value, onChange }) => {
  const options = sampleSupplierAccounts().map((supplierBank) => {
    const bank = getBank(supplierBank.bankId);

    return {
      label: `${bank.name} (${supplierBank.accountNumber})`,
      value: supplierBank.supplierAccountId
    };
  });

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

export default SupplierAccountDropdown;
