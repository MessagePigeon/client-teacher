import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { rest, RestRequest } from 'msw';
import {
  CreateTeacherRequest,
  GenerateRegisterCodesRequest,
  ModifyTeacherNameRequest,
  ResetTeacherPasswordRequest,
} from '~/http/types';
import { db } from './database';
import { deleteById } from './utils/delete-by-id.util';
import { updateById } from './utils/update-by-id.util';

export const DEFAULT_SUCCESS_RESPONSE = { success: true };

export const handlers = [
  rest.post('/mock/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'mock-token' }));
  }),
  rest.get('/mock/init', (req, res, ctx) => {
    const isUnauthorized =
      req.headers.get('Authorization') !== 'Bearer mock-token';
    if (isUnauthorized) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.get('/mock/messages', (req, res, ctx) => {
    const skip = +req.url.searchParams.get('skip')!;
    const take = +req.url.searchParams.get('take')!;

    const teacherId = req.url.searchParams.get('teacherId');
    const studentId = req.url.searchParams.get('studentId');
    const startTime = req.url.searchParams.get('startTime');
    const endTime = req.url.searchParams.get('endTime');

    const filteredMessages = db.messages.filter((message) => {
      if (teacherId && message.teacher.id !== teacherId) {
        return false;
      }
      if (
        studentId &&
        !message.students.map(({ id }) => id).includes(studentId)
      ) {
        return false;
      }
      if (startTime && dayjs(message.createdAt).isBefore(dayjs(startTime))) {
        return false;
      }
      if (endTime && dayjs(message.createdAt).isAfter(dayjs(endTime))) {
        return false;
      }
      return true;
    });

    const data = filteredMessages.slice(skip, skip + take);
    const total = filteredMessages.length;

    return res(ctx.json({ data, total }));
  }),
  rest.get('/mock/teacher/register-codes', (req, res, ctx) => {
    const skip = +req.url.searchParams.get('skip')!;
    const take = +req.url.searchParams.get('take')!;

    const data = db.registerCodes.slice(skip, skip + take);
    const total = db.registerCodes.length;

    return res(ctx.json({ data, total }));
  }),
  rest.post(
    '/mock/teacher/register-codes',
    (req: RestRequest<GenerateRegisterCodesRequest>, res, ctx) => {
      const newCodes = new Array(req.body.count).fill(null).map((_, index) => ({
        id: db.registerCodes.length + index + 1,
        code: faker.datatype.string(32),
      }));
      db.registerCodes = [...newCodes, ...db.registerCodes];
      return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
    },
  ),
  rest.delete('/mock/teacher/register-code', (req, res, ctx) => {
    const id = +req.url.searchParams.get('id')!;
    deleteById(db.registerCodes, id);
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.post('/mock/connection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.post('/mock/disconnection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.get('/mock/teachers', (req, res, ctx) => {
    const skip = +req.url.searchParams.get('skip')!;
    const take = +req.url.searchParams.get('take')!;

    const id = req.url.searchParams.get('id');
    const username = req.url.searchParams.get('username');
    const name = req.url.searchParams.get('name');

    const filteredTeacher = db.teachers.filter((teacher) => {
      if (id && teacher.id !== id) {
        return false;
      }
      if (username && !teacher.username.includes(username)) {
        return false;
      }
      if (name && !teacher.name.includes(name)) {
        return false;
      }
      return true;
    });

    const data = filteredTeacher.slice(skip, skip + take);
    const total = filteredTeacher.length;

    return res(ctx.json({ data, total }));
  }),
  rest.post(
    '/mock/teacher',
    (req: RestRequest<CreateTeacherRequest>, res, ctx) => {
      db.teachers.unshift({
        ...req.body,
        id: faker.datatype.uuid(),
        online: false,
        students: [],
      });
      return res(ctx.json({ password: faker.datatype.string() }));
    },
  ),
  rest.delete('/mock/teacher', (req, res, ctx) => {
    const id = req.url.searchParams.get('id')!;
    deleteById(db.teachers, id);
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.patch(
    '/mock/teacher/name',
    (req: RestRequest<ModifyTeacherNameRequest>, res, ctx) => {
      const { id, newName } = req.body;
      updateById(db.teachers, id, { name: newName });
      return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
    },
  ),
  rest.patch(
    '/mock/teacher/password',
    (req: RestRequest<ResetTeacherPasswordRequest>, res, ctx) => {
      const id = req.body.id;
      const { username } = db.teachers.find((teacher) => teacher.id === id)!;
      return res(ctx.json({ username, newPassword: faker.datatype.string(8) }));
    },
  ),
];
