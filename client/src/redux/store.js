import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userFirestormReducer from './Slices/userFirestormSlice';
import checkUpReducer from './Slices/checkUpSlice';
import discussionsReducer from './Slices/discussionsSlice';
import messagesReeducer from './Slices/messageSlice';
import favesReducer from './Slices/faveSlice';
import userReducer from './Slices/userSlice';

const store = configureStore({
  reducer: {
    userFirestorm: userFirestormReducer,
    posts: postsReducer,
    checkups: checkUpReducer,
    discussions: discussionsReducer,
    messages: messagesReeducer,
    faves: favesReducer,
    user: userReducer,
  },
});

export default store;
