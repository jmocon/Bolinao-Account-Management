import { faker } from '@faker-js/faker';

const sampleSupplierAccounts = (num = 100) =>
  new Array(num).fill().map(() => ({
    supplierAccountId: faker.datatype.number({ min: 100, max: 1000 }),
    supplierId: faker.datatype.number({ min: 100, max: 1000 }),
    owner: faker.company.name(),
    bankId: faker.datatype.number({ min: 1, max: 4 }),
    accountNumber: faker.finance.creditCardNumber('63[7-9]#-####-####-###L')
  }));

export const sampleSupplierAccount = () => sampleSupplierAccounts(1)[0];

export default sampleSupplierAccounts;
