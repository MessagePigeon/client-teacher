import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UnauthorizedHistoryPathState {
  path: string;
}

const initialState: UnauthorizedHistoryPathState = { path: '/send-message' };

export const unauthorizedHistoryPathSlice = createSlice({
  name: 'unauthorized-history-path',
  initialState,
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
  },
});

export const unauthorizedHistoryPathActions =
  unauthorizedHistoryPathSlice.actions;

export const unauthorizedHistoryPathSelector = (state: RootState) =>
  state.unauthorizedHistoryPath.path;

export default unauthorizedHistoryPathSlice.reducer;
