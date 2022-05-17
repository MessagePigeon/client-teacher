import faker from '@faker-js/faker';
import { rest, RestRequest } from 'msw';
import {
  BanStudentRequest,
  CreateStudentRequest,
  ModifyStudentRequest,
} from '~/http/types';
import { DEFAULT_SUCCESS_RESPONSE } from '../constants';
import { db } from '../database';
import { updateById } from '../utils/update-by-id.util';

export const studentHandlers = [
  rest.post(
    '/mock/student',
    (req: RestRequest<CreateStudentRequest>, res, ctx) => {
      const payload = {
        key: req.body.key || faker.datatype.string(),
        defaultRemark: req.body.defaultRemark,
      };
      db.students.unshift({
        ...payload,
        id: faker.datatype.uuid(),
        online: false,
        teachers: [],
        ban: false,
      });
      return res(ctx.json(payload));
    },
  ),
  rest.get('/mock/students', (req, res, ctx) => {
    const skip = +req.url.searchParams.get('skip')!;
    const take = +req.url.searchParams.get('take')!;

    const id = req.url.searchParams.get('id');
    const defaultRemark = req.url.searchParams.get('defaultRemark');

    const filteredStudents = db.students.filter((student) => {
      if (id && student.id !== id) {
        return false;
      }
      if (defaultRemark && !student.defaultRemark.includes(defaultRemark)) {
        return false;
      }
      return true;
    });

    const data = filteredStudents.slice(skip, skip + take);
    const total = filteredStudents.length;

    return res(ctx.json({ data, total }));
  }),
  rest.patch(
    '/mock/student/ban',
    (req: RestRequest<BanStudentRequest>, res, ctx) => {
      const { id, ban } = req.body;
      console.log('update ban:', updateById(db.students, id, { ban }));
      return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
    },
  ),
  rest.patch(
    '/mock/student',
    (req: RestRequest<ModifyStudentRequest>, res, ctx) => {
      const { id, ...payload } = req.body;
      updateById(db.students, id, payload);
      return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
    },
  ),
];
