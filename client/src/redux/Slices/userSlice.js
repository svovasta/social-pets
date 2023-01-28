import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    findUser(state, action) {
      return action.payload;
    },
    setUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return null;
    },
  },
});

export const { findUser, setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const findUserAction = () => (dispatch) => {
  axios('/user')
    .then((res) => dispatch(findUser(res.data)))
    .catch(console.log);
};

export const registrationAction = (regInput) => (dispatch) => {
  axios.post('/user/signup', regInput).then((resp) => {
    dispatch(setUser(resp.data));
  }).catch(console.log('gg'));
};
export const loginAction = (input) => (dispatch) => {
  axios.post('/user/signin', input).then((resp) => {
    dispatch(setUser(resp.data));
  });
};
export const userCheckAction = () => (dispatch) => {
  axios.post('/user/check').then((res) => dispatch(setUser(res.data))).catch(console.log);
};

export const userLogoutAction = () => (dispatch) => {
  axios.get('/user/logout').then(() => dispatch(logoutUser())).catch(console.log);
};
