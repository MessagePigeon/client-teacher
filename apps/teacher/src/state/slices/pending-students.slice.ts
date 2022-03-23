import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
  },
});

export const { add: addPendingStudent } = pendingStudentsSlice.actions;

export const pendingStudentsSelector = (state: RootState) =>
  state.pendingStudents.students;

export default pendingStudentsSlice.reducer;
