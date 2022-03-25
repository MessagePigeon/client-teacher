import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { findIndexById } from '../utils/find-index-by-id.util';

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
    modifyRemark(
      state,
      action: PayloadAction<{ id: string; newRemark: string }>,
    ) {
      const index = findIndexById(state.students, action.payload.id);
      state.students[index].remark = action.payload.newRemark;
    },
    delete(state, action: PayloadAction<{ id: string }>) {
      const index = findIndexById(state.students, action.payload.id);
      state.students.splice(index, 1);
    },
    add(state, action: PayloadAction<ConnectedStudent>) {
      state.students.unshift(action.payload);
    },
    setOnline(state, action: PayloadAction<{ id: string }>) {
      const index = findIndexById(state.students, action.payload.id);
      state.students[index].online = true;
    },
    setOffline(state, action: PayloadAction<{ id: string }>) {
      const index = findIndexById(state.students, action.payload.id);
      state.students[index].online = false;
    },
  },
});

export const connectedStudentsActions = connectedStudentsSlice.actions;

export const connectedStudentsSelector = (state: RootState) =>
  state.connectedStudents.students;

export default connectedStudentsSlice.reducer;
