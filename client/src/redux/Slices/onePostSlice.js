import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const onePostsSlice = createSlice({
  name: 'onePosts',
  initialState: [],
  reducers: {
    getOnePosts: (state, action) => action.payload,
  },
});

export const { getOnePosts } = onePostsSlice.actions;

export const getOnePostsAction = (postId) => (dispatch) => {
  axios(`/posts/${postId}/post`)
    .then((res) => dispatch(getOnePosts(res.data)))
    .catch(console.log);
};

export default onePostsSlice.reducer;
