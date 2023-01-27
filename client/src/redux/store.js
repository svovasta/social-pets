import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
