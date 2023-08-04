import { faker } from '@faker-js/faker';
import { CreateFormInput } from 'src/app/user/input';

export const stubFormCreate: CreateFormInput = {
  field: faker.word.sample(),
  value: faker.word.noun(),
  step: faker.number.int(),
};
