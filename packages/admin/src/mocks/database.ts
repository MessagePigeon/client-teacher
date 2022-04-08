import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { Message, RegisterCode, Teacher } from '~/http/types';
import { getRandomMessage } from './helpers/get-random-message.helper';
import {
  getRandomStudents,
  getRandomTeacher,
} from './helpers/get-random-teacher-or-student.helper';

type FakeDatabase = {
  messages: Message[];
  registerCodes: RegisterCode[];
  teachers: Teacher[];
};

export let db: FakeDatabase = { messages: [], registerCodes: [], teachers: [] };

export const generateFakeDatabase = () => {
  generateMessages();
  generateRegisterCodes();
  generateTeachers();
};

const RANDOM_LENGTH = faker.datatype.number({ min: 200, max: 1000 });

const generateMessages = () => {
  const messages = new Array(RANDOM_LENGTH).fill(null).map((_, index) => ({
    id: RANDOM_LENGTH - index,
    createdAt: dayjs().subtract(index, 'day').format(),
    message: getRandomMessage(),
    teacher: getRandomTeacher(),
    students: getRandomStudents(),
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

const generateTeachers = () => {
  const teachers = new Array(RANDOM_LENGTH).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    online: faker.datatype.boolean(),
    students: getRandomStudents(),
  }));
  db.teachers = teachers;
};
