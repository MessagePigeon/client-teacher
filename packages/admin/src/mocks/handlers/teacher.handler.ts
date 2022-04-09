import faker from '@faker-js/faker';
import { rest, RestRequest } from 'msw';
import {
  CreateTeacherRequest,
  ModifyTeacherNameRequest,
  ResetTeacherPasswordRequest,
} from '~/http/types';
import { DEFAULT_SUCCESS_RESPONSE } from '../constants';
import { db } from '../database';
import { deleteById } from '../utils/delete-by-id.util';
import { updateById } from '../utils/update-by-id.util';

export const teacherHandlers = [
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
