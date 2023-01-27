import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPersonalPosts: (state, action) => action.payload,
    getFaves: (state, action) => action.payload,
  },
});

export const { getPersonalPosts, getFaves } = postsSlice.actions;

export const getPostsAction = () => (dispatch) => {
  axios('/api/posts')
    .then((res) => dispatch(getPersonalPosts(res.data)))
    .catch(console.log);
};

export const getFavesAction = () => (dispatch) => {
  axios('/api/favourites')
    .then((res) => dispatch(getFaves(res.data)))
    .catch(console.log);
};

export default postsSlice.reducer;
