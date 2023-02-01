import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const onePostSlice = createSlice({
  name: 'onePost',
  initialState: {},
  reducers: {
    getOnePost: (state, action) => action.payload,
  },
});

export const { getOnePost } = onePostSlice.actions;

export const getOnePostAction = (postId) => (dispatch) => {
  axios.get(`/posts/${postId}/post`)
    .then((res) => dispatch(getOnePost(res.data)))
    .catch(console.log);
};

export default onePostSlice.reducer;
