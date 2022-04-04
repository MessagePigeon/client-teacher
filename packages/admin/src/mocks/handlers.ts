import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { rest, RestRequest } from 'msw';
import { GenerateRegisterCodesRequest } from '~/http/types';
import { db } from './database';

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
      if (teacherId) {
        if (message.teacher.id !== teacherId) {
          return false;
        }
      }
      if (studentId) {
        if (!message.students.map(({ id }) => id).includes(studentId)) {
          return false;
        }
      }
      if (startTime) {
        if (dayjs(message.createdAt).isBefore(dayjs(startTime))) {
          return false;
        }
      }
      if (endTime) {
        if (dayjs(message.createdAt).isAfter(dayjs(endTime))) {
          return false;
        }
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
    const index = db.registerCodes.findIndex((code) => code.id === id);
    db.registerCodes.splice(index, 1);
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.post('/mock/connection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.post('/mock/disconnection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
];
