import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userFirestormReducer from './Slices/userFirestormSlice';
import userReducer from './Slices/userSlice';
import commentsReduser from './Slices/commentsSlice';
import checkUpReducer from './Slices/checkUpSlice';
import discussionsReducer from './Slices/discussionsSlice';
import messagesReeducer from './Slices/messageSlice';
import favesReducer from './Slices/faveSlice';
import followersReducer from './Slices/followersSlice';
import myPostsReducer from './Slices/myPostsSlice';
import onePostReducer from './Slices/onePostSlice';

const store = configureStore({
  reducer: {
    userFirestorm: userFirestormReducer,
    posts: postsReducer,
    comment: commentsReduser,
    checkups: checkUpReducer,
    discussions: discussionsReducer,
    messages: messagesReeducer,
    faves: favesReducer,
    user: userReducer,
    followers: followersReducer,
    myPosts: myPostsReducer,
    onePost: onePostReducer,
  },
});

export default store;
