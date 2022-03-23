import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UnauthorizedHistoryPathState {
  path: string;
}

const initialState: UnauthorizedHistoryPathState = { path: '' };

export const unauthorizedHistoryPathSlice = createSlice({
  name: 'unauthorized-history-path',
  initialState,
  reducers: {
    modify(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
  },
});

export const { modify: modifyUnauthorizedHistoryPath } =
  unauthorizedHistoryPathSlice.actions;

export const unauthorizedHistoryPathSelector = (state: RootState) =>
  state.unauthorizedHistoryPath.path;

export default unauthorizedHistoryPathSlice.reducer;
