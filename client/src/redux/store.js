import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userReducer from './Slices/userSlice';
import commentsReduser from './Slices/commentsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comment: commentsReduser,
  },
});

export default store;
