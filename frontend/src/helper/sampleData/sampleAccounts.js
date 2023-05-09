import { faker } from '@faker-js/faker';

const sampleAccounts = (num = 100) =>
  new Array(num).fill().map(() => {
    const owner = faker.company.name();
    return {
      accountId: faker.datatype.number({ min: 100, max: 1000 }),
      owner,
      abbr: owner.split(' ').map((word) => word[0]).join(''),
      bankId: faker.datatype.number({ min: 1, max: 4 }),
      accountNumber: faker.finance.creditCardNumber('63[7-9]#-####-####-###L')
    };
  });

export const sampleAccount = () => sampleAccounts(1)[0];

export default sampleAccounts;
