import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const myPostsSlice = createSlice({
  name: 'myPosts',
  initialState: [],
  reducers: {
    getMyPosts: (state, action) => action.payload,
  },
});

export const { getMyPosts } = myPostsSlice.actions;

export const getMyPostsAction = () => (dispatch) => {
  axios('/my-posts')
    .then((res) => dispatch(getMyPosts(res.data)))
    .catch(console.log);
};

export default myPostsSlice.reducer;
