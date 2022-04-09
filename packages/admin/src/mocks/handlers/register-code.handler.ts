import faker from '@faker-js/faker';
import { rest, RestRequest } from 'msw';
import { GenerateRegisterCodesRequest } from '~/http/types';
import { DEFAULT_SUCCESS_RESPONSE } from '../constants';
import { db } from '../database';
import { deleteById } from '../utils/delete-by-id.util';

export const registerCodeHandlers = [
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
];
