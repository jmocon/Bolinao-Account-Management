import React from 'react';
import Select from 'react-select';

import sampleSupplierAccounts from 'helper/sampleData/sampleSupplierAccounts';
import { getBank } from 'helper/sampleData/sampleBanks';

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

export default SupplierAccountDropdown;
