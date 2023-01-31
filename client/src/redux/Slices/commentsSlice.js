import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    getComments: (state, action) => action.payload,
    addComment: (state, action) => state.unshift(action.payload),
    deleteComment: (state, action) => state.filter((el) => el.id !== action.payload),
    editComment: (state, action) => state.map((el) => (el.id === action.payload
      ? { ...el, text: action.payload.editedInput.text } : el)),
  },
});

export const {
  getComments, addComment, deleteComment, editComment,
} = commentsSlice.actions;

export const getCommentsAction = (PostId) => (dispatch) => {
  axios(`/posts/${PostId}/comments`)
    .then((res) => dispatch(getComments(res.data)))
    .catch(console.log);
};

export const addCommentAction = (PostId, input) => (dispatch) => {
  axios.post(`/posts/${PostId}/comments`, { text: input })
    .then((res) => {
      dispatch(addComment(res.data))
        .catch(console.log);
    });
};

export default commentsSlice.reducer;
