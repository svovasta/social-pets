import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userReducer from './Slices/userSlice';
import commentsReduser from './Slices/commentsSlice';
import checkUpReducer from './Slices/checkUpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comment: commentsReduser,
    checkups: checkUpReducer,
  },
});

export default store;
