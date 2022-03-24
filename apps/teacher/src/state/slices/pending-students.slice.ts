import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { findIndexById } from '../utils/find-index-by-id.util';

type PendingStudent = {
  requestId: string;
  studentId: string;
  remark: string;
};

interface PendingStudentsState {
  students: PendingStudent[];
}

const initialState: PendingStudentsState = { students: [] };

export const pendingStudentsSlice = createSlice({
  name: 'pending-students',
  initialState,
  reducers: {
    add(state, action: PayloadAction<PendingStudent>) {
      state.students.push(action.payload);
    },
    remove(state, action: PayloadAction<{ requestId: string }>) {
      const index = findIndexById(
        state.students,
        action.payload.requestId,
        'requestId',
      );
      state.students.splice(index, 1);
    },
  },
});

export const pendingStudentsActions = pendingStudentsSlice.actions;

export const pendingStudentsSelector = (state: RootState) =>
  state.pendingStudents.students;

export default pendingStudentsSlice.reducer;
