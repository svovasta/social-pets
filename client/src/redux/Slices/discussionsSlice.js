import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];
const discussionSlice = createSlice({
  name: 'discussion',
  initialState,
  reducers: {
    getDiscussions(state, action) {
      return action.payload;
    },
    addDiscussion(state, action) {
      return [...state, action.payload];
    },
    deleteDiscussion(state, action) {
      return state.filter((el) => el.id !== action.payload);
    },
  },
});

export const { getDiscussions, addDiscussion, deleteDiscussion } = discussionSlice.actions;
export default discussionSlice.reducer;

export const getDiscussionsAction = () => (dispatch) => {
  axios('')
    .then((resp) => dispatch(getDiscussions(resp.data)))
    .catch(console.log());
};
export const addDiscussionAction = (input) => (dispatch) => {
  axios.post('', { input })
    .then((resp) => dispatch(addDiscussion(resp.data)))
    .catch(console.log());
};
