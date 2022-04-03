import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Message, RegisterCode } from '~/http/types';
import { getRandomMessage } from './helpers/get-random-message.helper';

type FakeDatabase = { messages: Message[]; registerCodes: RegisterCode[] };

export let db: FakeDatabase = { messages: [], registerCodes: [] };

export const generateFakeDatabase = () => {
  generateMessages();
  generateRegisterCodes();
};

const RANDOM_LENGTH = faker.datatype.number({ min: 200, max: 1000 });

const generateMessages = () => {
  const teachers = new Array(15)
    .fill(null)
    .map(() => ({ id: faker.datatype.uuid(), name: faker.name.firstName() }));
  const students = new Array(25).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    defaultRemark: faker.name.firstName(),
  }));
  const messages = new Array(RANDOM_LENGTH).fill(null).map((_, index) => ({
    id: RANDOM_LENGTH - index,
    createdAt: dayjs().subtract(index, 'day').format(),
    message: getRandomMessage(),
    teacher: teachers[faker.datatype.number({ min: 0, max: 10 })],
    students: new Array(faker.datatype.number({ min: 0, max: 10 }))
      .fill(null)
      .map((_, index) => students[index]),
  }));
  db.messages = messages;
};

const generateRegisterCodes = () => {
  const registerCodes = new Array(RANDOM_LENGTH).fill(null).map((_, index) => ({
    id: RANDOM_LENGTH - index,
    code: faker.datatype.string(32),
  }));
  db.registerCodes = registerCodes;
};
