import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    getPosts: (state, action) => action.payload,
    addPost: (state, action) => [action.payload, ...state],
    deletePost: (state, action) => state.filter((el) => el.id !== action.payload),
    editPost: (state, action) => state.map((el) => (el.id === action.payload ? { ...el, text: action.payload.values.text } : el)),
    myPosts: (state, action) => action.payload,
    addOrDeleteLike: (state, action) => action.payload,
  },
});

export const {
  getPosts, addPost, deletePost, editPost, favePosts, addFave, addOrDeleteLike,
} = postsSlice.actions;

export const getPostsAction = () => (dispatch) => {
  axios('/posts')
    .then((res) => dispatch(getPosts(res.data)))
    .catch((err) => {
      console.log(err);
      Alert.alert('Ошибка', 'Не удалось загрузить посты');
    });
};

export const addPostAction = (input) => (dispatch) => {
  axios.post('/posts/upload-image', input)
    .then((res) => dispatch(addPost(res.data)))
    .catch(console.log);
};

export const deletePostAction = (postId) => (dispatch) => {
  axios.delete(`/posts/${postId}/post`).then(() => dispatch(deletePost())).catch(console.log);
};

export const editPostAction = (postId, input) => (dispatch) => {
  axios.patch(`/posts/${postId}/post`, input).then((res) => dispatch(editPost(res.data))).catch(console.log);
};

export const addOrDeleteLikeAction = (postId) => (dispatch) => {
  axios.post(`/likes/${postId}`)
    .then((res) => dispatch(addOrDeleteLike(res.data)))
    .catch(console.log);
};

export default postsSlice.reducer;
