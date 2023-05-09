import { faker } from '@faker-js/faker';

import sampleRoles from './sampleRoles';

const sampleUsers = (num = 100) => {
  return new Array(num).fill().map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      userId: faker.datatype.number({ min: 100, max: 1000 }),
      roleId: faker.helpers.arrayElement(sampleRoles).roleId,
      firstName,
      middleName: faker.name.middleName(),
      lastName,
      suffixName: faker.name.suffix(),
      birthDate: faker.date.past().toDateString(),
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      contactNumber: faker.phone.number('(+639) ## ### ####'),
      homeAddress: `${faker.address.streetAddress(
        true
      )} ${faker.address.city()}`,
      emailAddress: faker.internet.email(
        firstName,
        lastName,
        'bolinao_agro.com'
      ),
      username: faker.internet.userName(firstName, lastName),
      password: faker.internet.password()
    };
  });
};

export const sampleUser = () => sampleUsers(1)[0];

export default sampleUsers;
