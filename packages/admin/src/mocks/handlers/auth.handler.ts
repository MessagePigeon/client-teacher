import { rest } from 'msw';
import { DEFAULT_SUCCESS_RESPONSE } from '../constants';

export const authHandlers = [
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
];
