import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { findIndexById } from '../utils/find-index-by-id.util';

type Message = {
  id: number;
  createdAt: string;
  message: string;
  studentIds: string[];
  showingIds: string[];
};

interface MessagesState {
  messages: Message[];
  total: number;
}

const initialState: MessagesState = { messages: [], total: 0 };

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    set(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addToTop(state, action: PayloadAction<Message>) {
      state.messages.unshift(action.payload);
    },
    addMany(state, action: PayloadAction<Message[]>) {
      state.messages = [...state.messages, ...action.payload];
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    close(
      state,
      action: PayloadAction<{ messageId: number; studentId: string }>,
    ) {
      const messageIndex = findIndexById(
        state.messages,
        action.payload.messageId,
      );
      const studentIndex = state.messages[messageIndex].showingIds.indexOf(
        action.payload.studentId,
      );
      state.messages[messageIndex].showingIds.splice(studentIndex);
    },
  },
});

export const messagesActions = messagesSlice.actions;

export const messagesSelector = (state: RootState) => state.messages.messages;
export const messagesCountSelector = (state: RootState) =>
  state.messages.messages.length;
export const messagesTotalSelector = (state: RootState) => state.messages.total;

export default messagesSlice.reducer;
