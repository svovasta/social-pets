import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userReducer from './Slices/userSlice';
import checkUpReducer from './Slices/checkUpSlice';
import discussionsReducer from './Slices/discussionsSlice';
import favesReducer from './Slices/faveSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    checkups: checkUpReducer,
    discussions: discussionsReducer,
    faves: favesReducer,
  },
});

export default store;
