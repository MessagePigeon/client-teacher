import { Message, RegisterCode } from '~/http/types';
import { faker } from '@faker-js/faker';
import { getRandomInt } from './utils/get-random-int.util';
import dayjs from 'dayjs';
import { getRandomMessage } from './helpers/get-random-message.util';

type FakeDatabase = { messages: Message[]; registerCodes: RegisterCode[] };

export let db: FakeDatabase = { messages: [], registerCodes: [] };

export const generateFakeDatabase = () => {
  generateMessages();
};

const generateMessages = () => {
  const teachers = new Array(15)
    .fill(null)
    .map(() => ({ id: faker.datatype.uuid(), name: faker.name.firstName() }));
  const students = new Array(25).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    defaultRemark: faker.name.firstName(),
  }));
  const messageLength = getRandomInt(200, 500);
  const messages = new Array(messageLength).fill(null).map((_, index) => ({
    id: messageLength - index,
    createdAt: dayjs().subtract(index, 'day').format(),
    message: getRandomMessage(),
    teacher: teachers[getRandomInt(0, 10)],
    students: new Array(getRandomInt(1, 10))
      .fill(null)
      .map((_, index) => students[index]),
  }));
  db.messages = messages;
};
