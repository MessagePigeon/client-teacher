import { configureStore } from '@reduxjs/toolkit';
import name from './slices/name.slice';
import unauthorizedHistoryPath from './slices/unauthorized-history-path.slice';
import pendingStudents from './slices/pending-students.slice';
import connectedStudents from './slices/connected-students.slice';
import messages from './slices/messages.slice';

export const store = configureStore({
  reducer: {
    name,
    unauthorizedHistoryPath,
    pendingStudents,
    connectedStudents,
    messages,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
