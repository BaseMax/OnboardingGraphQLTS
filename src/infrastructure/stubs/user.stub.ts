import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { LoginInput, RegisterInput } from 'src/app/auth/input';

export const stubUser: User = {
  id: faker.number.int(),
  f_name: faker.person.firstName(),
  l_name: faker.person.lastName(),
  address_detail: faker.location.streetAddress(),
  country: faker.location.country(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  email: faker.internet.email(),
  email_token: faker.string.hexadecimal({ length: 14 }),
  email_verified: faker.datatype.boolean({ probability: 0 }),
  language: [faker.person.fullName()],
  password: faker.string.hexadecimal({ length: 8 }),
  phone: faker.phone.number(),
  post_code: faker.location.zipCode(),
};

export const stubRegisterInput: RegisterInput = {
  f_name: faker.person.firstName(),
  l_name: faker.person.lastName(),
  address_detail: faker.location.streetAddress(),
  country: faker.location.country(),
  email: faker.internet.email(),
  language: [faker.person.fullName()],
  password: faker.string.hexadecimal({ length: 8 }),
  phone: faker.phone.number(),
  post_code: faker.location.zipCode(),
};

export const stubLoginInput: LoginInput = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
