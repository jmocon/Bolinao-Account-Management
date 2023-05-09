import { faker } from '@faker-js/faker';

const sampleExpenses = (num = 100) =>
  new Array(num).fill().map(() => ({
    expenseId: faker.datatype.number({ min: 100, max: 1000 }),
    accountId: faker.datatype.number({ min: 100, max: 1000 }),
    expenseDate: faker.date.recent(),
    category: faker.helpers.arrayElement(['DE', 'IE', 'DE-IE', 'NA']),
    voucherId: faker.datatype.number({ min: 100, max: 1000 }),
    supplierId: faker.datatype.number({ min: 100, max: 1000 }),
    particulars: faker.lorem.lines(),
    vatableAmount: faker.datatype.boolean(),
    nonVatableAmount: faker.datatype.number({ min: 1000, max: 100000 }),
    taxRate: faker.datatype.number({ min: 1, max: 10 }),
    atc: `W${faker.helpers.arrayElement([
      'I',
      'C',
      'V',
      'B'
    ])}${faker.datatype.number({ min: 10, max: 99 })}0`,
    modeOfPayment: faker.helpers.arrayElement(['check', 'cash', 'online']),
    supplierAccountId: faker.datatype.number({ min: 100, max: 1000 }),
    bank: faker.helpers.arrayElement(['BDO', 'BPI', 'Metro Bank']),
    checkNumber: faker.datatype.number({ min: 100, max: 1000 }),
    checkDate: faker.date.recent(),
    checkStatus: faker.helpers.arrayElement([
      'pending',
      'cleared',
      'cancelled'
    ]),
    status: faker.datatype.number({ min: 0, max: 5 }),
    createdBy: faker.datatype.number({ min: 100, max: 1000 }),
    approvedBy: faker.datatype.number({ min: 100, max: 1000 })
  }));

export const sampleExpense = () => sampleExpenses(1)[0];

export default sampleExpenses;
