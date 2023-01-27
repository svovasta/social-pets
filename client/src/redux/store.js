import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userReducer from './Slices/userSlice';
import checkUpReducer from './Slices/checkUpSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    checkups: checkUpReducer,
  },
});

export default store;
