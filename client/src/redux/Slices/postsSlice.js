import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    getPosts: (state, action) => action.payload,
    addPost: (state, action) => state.unshift(action.payload),
    deletePost: (state, action) => state.filter((el) => el.id !== action.payload),
    editPost: (state, action) => state.map((el) => (el.id === action.payload ? { ...el, text: action.payload.editedInput.text, image: action.payload.editedInput.image } : el)),
  },
});

export const {
  getPosts, addPost, deletePost, editPost,
} = postsSlice.actions;

export const getPostsAction = () => (dispatch) => {
  axios('/posts').then((res) => dispatch(getPosts(res.data)));
};

export const addPostAction = (input) => (dispatch) => {
  axios.post('/posts', input)
    .then((res) => dispatch(addPost(res.data)))
    .catch(console.log);
};

export const deletePostAction = (postId) => (dispatch) => {
  axios.post(`/${postId}`).then(() => dispatch(deletePost())).catch(console.log);
};

export const editPostAction = (postId, input) => (dispatch) => {
  axios.patch(`/${postId}`, input).then((res) => dispatch(editPost(res.data))).catch(console.log);
};

export default postsSlice.reducer;
