import dayjs from 'dayjs';
import { rest } from 'msw';
import { db } from './database';

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
    return res(ctx.json({ success: true }));
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
];
