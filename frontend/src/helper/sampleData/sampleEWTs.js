import { faker } from '@faker-js/faker';

const sampleEWTs = (num = 100) => {
  return new Array(num).fill().map(() => ({
    ewtId: faker.datatype.number({ min: 100, max: 1000 }),
    taxType: `W${faker.helpers.arrayElement(['E', 'F', 'V', 'B'])}`,
    description: faker.lorem.lines(),
    taxRate: faker.datatype.number({min:1, max: 10 }),
    atc: `W${faker.helpers.arrayElement([
      'I',
      'C',
      'V',
      'B'
    ])}${faker.datatype.number({ min: 10, max: 99 })}0`
  }));
};

export const sampleEWT = () => sampleEWTs(1)[0];

export default sampleEWTs;
