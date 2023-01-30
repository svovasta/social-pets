import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './Slices/postsSlice';
import userReducer from './Slices/userSlice';
import commentsReduser from './Slices/commentsSlice';
import checkUpReducer from './Slices/checkUpSlice';
import discussionsReducer from './Slices/discussionsSlice';
import favesReducer from './Slices/faveSlice';
import followersReducer from './Slices/followersSlice';
import myPostsReducer from './Slices/myPostsSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comment: commentsReduser,
    checkups: checkUpReducer,
    discussions: discussionsReducer,
    faves: favesReducer,
    followers: followersReducer,
    myPosts: myPostsReducer,

  },
});

export default store;
