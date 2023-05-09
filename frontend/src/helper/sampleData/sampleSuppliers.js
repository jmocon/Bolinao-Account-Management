import { faker } from '@faker-js/faker';

const sampleSuppliers = (num = 100) => {
  return new Array(num).fill().map(() => {
    return {
      supplierId: faker.datatype.number({ min: 100, max: 1000 }),
      name: faker.company.name(),
      address: `${faker.address.streetAddress(true)} ${faker.address.city()}`,
      tin: faker.phone.number('###-###-###-####'),
      contactNumber: faker.phone.number('(+639) ## ### ####')
    };
  });
};

export const sampleSupplier = () => sampleSuppliers(1)[0];

export default sampleSuppliers;
