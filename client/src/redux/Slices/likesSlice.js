import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const likesSlice = createSlice({
  name: 'likes',
  initialState: [],
  reducers: {
    getPostLikes: (state, action) => action.payload,
    addorDeletePostLike: (state, action) => action.payload,
  },
});

export const {
  getPostLikes, addorDeletePostLike,
} = likesSlice.actions;

export const getPostLikesAction = (postId) => (dispatch) => {
  axios(`/posts/${postId}/likes`)
    .then((res) => dispatch(getPostLikes(res.data)))
    .catch((err) => console.log(err));
};

export const addorDeletePostLikeAction = (postId) => (dispatch) => {
  axios.post(`/posts/${postId}/likes`)
    .then((res) => dispatch(addorDeletePostLike(res.data)))
    .catch(console.log);
};

export default likesSlice.reducer;
