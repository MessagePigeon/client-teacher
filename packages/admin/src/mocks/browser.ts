import { setupWorker } from 'msw';
import { authHandlers } from './handlers/auth.handler';
import { connectionHandlers } from './handlers/connection.handler';
import { messageHandlers } from './handlers/message.handler';
import { registerCodeHandlers } from './handlers/register-code.handler';
import { teacherHandlers } from './handlers/teacher.handler';

export const worker = setupWorker(
  ...authHandlers,
  ...connectionHandlers,
  ...messageHandlers,
  ...registerCodeHandlers,
  ...teacherHandlers,
);
