import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      return [...state, action.payload];
    },
    deleteMessage(state, action) {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

export const { getMessages, addMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;

export const getMessagesAction = () => (dispatch) => {
  axios('/messages/')
    .then((resp) => dispatch(getMessages(resp.data)))
    .catch(console.log());
};
export const addMessageAction = (input) => (dispatch) => {
  axios.post('/messages/add', { input })
    .then((resp) => dispatch(addMessage(resp.data)))
    .catch(console.log());
};
