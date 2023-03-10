import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    getComments: (state, action) => action.payload,
    addComment: (state, action) => state.unshift(action.payload),
    deleteComment: (state, action) => state.filter((el) => el.id !== action.payload.commentId),
    editComment: (state, action) => state.map((el) => (el.id === action.payload
      ? { ...el, text: action.payload.editedInput.text } : el)),
  },
});

export const {
  getComments, addComment, deleteComment, editComment,
} = commentsSlice.actions;

export const getCommentsAction = (PostId) => (dispatch) => {
  axios(`/comments/post/${PostId}`)
    .then((res) => dispatch(getComments(res.data)))
    .catch(console.log);
};

export const addCommentAction = (PostId, input) => (dispatch) => {
  axios.post(`/comments/post/${PostId}`, { text: input })
    .then((res) => {
      dispatch(addComment(res.data))
        .catch(console.log);
    });
};

export const deleteCommentAction = (id, commentId) => (dispatch) => {
  axios.delete(`/comments/post/${id}/comment/${commentId}`)
    .then((res) => dispatch(deleteComment(res.data)));
};

export default commentsSlice.reducer;
