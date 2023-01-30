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
    editPost: (state, action) => state.map((el) => (el.id === action.payload ? { ...el, text: action.payload.editedInput.text, image: action.payload.editedInput.image } : el)),
    favePosts: (state, action) => action.payload,
    addFave: (state, action) => [...state, action.payload],
  },
});

export const {
  getPosts, addPost, deletePost, editPost, favePosts, addFave,
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
  axios.post(`/${postId}`).then(() => dispatch(deletePost())).catch(console.log);
};

export const editPostAction = (postId, input) => (dispatch) => {
  axios.patch(`/${postId}`, input).then((res) => dispatch(editPost(res.data))).catch(console.log);
};

export const getPersonalPostsAction = () => (dispatch) => {
  axios('/api/v1/posts').then((res) => dispatch(getPosts(res.data)));
};

export default postsSlice.reducer;
