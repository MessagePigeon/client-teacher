import { rest } from 'msw';
import { DEFAULT_SUCCESS_RESPONSE } from '../constants';

export const connectionHandlers = [
  rest.post('/mock/connection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
  rest.post('/mock/disconnection', (req, res, ctx) => {
    return res(ctx.json(DEFAULT_SUCCESS_RESPONSE));
  }),
];
