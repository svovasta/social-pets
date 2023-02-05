import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const followersSlice = createSlice({
  name: 'followers',
  initialState: [],
  reducers: {
    getFPosts: (state, action) => action.payload,
    addFollowers: (state, action) => [...state, action.payload],
  },
});

export const { getFPosts, addFollowers } = followersSlice.actions;

export const getFollowedPostsAction = () => (dispatch) => {
  axios('/followers')
    .then((res) => dispatch(getFPosts(res.data)))
    .catch(console.log);
};

export const followAction = (id) => (dispatch) => {
  axios.post(`/followers/${id}`)
    .then((res) => dispatch(addFollowers(res.data)))
    .catch(console.log);
};

export default followersSlice.reducer;
