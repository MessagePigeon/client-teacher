import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ConnectedStudent = { id: string; online: boolean; remark: string };

interface ConnectedStudentsState {
  students: ConnectedStudent[];
}

const initialState: ConnectedStudentsState = { students: [] };

export const connectedStudentsSlice = createSlice({
  name: 'connected-students',
  initialState,
  reducers: {
    set(state, action: PayloadAction<ConnectedStudent[]>) {
      state.students = action.payload;
    },
    editRemark(
      state,
      action: PayloadAction<{ id: string; newRemark: string }>,
    ) {
      const index = state.students.findIndex(
        ({ id }) => id === action.payload.id,
      );
      state.students[index].remark = action.payload.newRemark;
    },
    delete(state, action: PayloadAction<{ id: string }>) {
      const index = state.students.findIndex(
        ({ id }) => id === action.payload.id,
      );
      state.students.splice(index, 1);
    },
  },
});

export const connectStudentsActions = connectedStudentsSlice.actions;

export const connectedStudentsSelector = (state: RootState) =>
  state.connectedStudents.students;

export default connectedStudentsSlice.reducer;
