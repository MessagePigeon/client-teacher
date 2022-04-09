import dayjs from 'dayjs';
import { rest } from 'msw';
import { db } from '../database';

export const messageHandlers = [
  rest.get('/mock/messages', (req, res, ctx) => {
    const skip = +req.url.searchParams.get('skip')!;
    const take = +req.url.searchParams.get('take')!;

    const teacherId = req.url.searchParams.get('teacherId');
    const studentId = req.url.searchParams.get('studentId');
    const startTime = req.url.searchParams.get('startTime');
    const endTime = req.url.searchParams.get('endTime');
    const messageParam = req.url.searchParams.get('message');

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
      if (messageParam && !message.message.includes(messageParam)) {
        return false;
      }
      return true;
    });

    const data = filteredMessages.slice(skip, skip + take);
    const total = filteredMessages.length;

    return res(ctx.json({ data, total }));
  }),
];
