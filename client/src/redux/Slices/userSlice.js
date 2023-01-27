import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const registrationAction = (e, input) => (dispatch) => {
  e.preventDefault();
  axios.post('/user/signup', Object.fromEntries(new FormData(e.target))).then((resp) => {
    dispatch(setUser(resp.data));
  });
};
export const loginAction = (e, input) => (dispatch) => {
  e.preventDefault();
  axios.post('/user/signin', input).then((resp) => {
    dispatch(setUser(resp.data));
  });
};
export const userCheckAction = () => (dispatch) => {
  axios.post('').then((res) => dispatch(setUser(res.data))).catch(console.log);
};

export const userLogoutAction = () => (dispatch) => {
  axios.get('').then(() => dispatch(logoutUser())).catch(console.log);
};
