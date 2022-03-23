import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface NameState {
  name: string;
}

const initialState: NameState = { name: '' };

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    modify(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { modify: modifyName } = nameSlice.actions;

export const nameSelector = (state: RootState) => state.name.name;

export default nameSlice.reducer;
