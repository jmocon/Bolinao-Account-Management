import { faker } from '@faker-js/faker';

import { sampleAccount } from './sampleAccounts';

const sampleVouchers = (num = 100) =>
  new Array(num).fill().map(() => {
    const account = sampleAccount();
    return {
      voucherId: faker.datatype.number({ min: 100, max: 1000 }),
      date: faker.date.past().toDateString(),
      code: `${account.abbr}-${account.accountNumber.slice(-4)}`
    };
  });

export const sampleVoucher = () => sampleVouchers(1)[0];

export default sampleVouchers;
