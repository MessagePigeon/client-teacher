import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'mock-token' }));
  }),
  rest.get('/init', (req, res, ctx) => {
    const isUnauthorized =
      req.headers.get('Authorization') !== 'Bearer mock-token';
    if (isUnauthorized) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }
    return res(ctx.json({ success: true }));
  }),
];
