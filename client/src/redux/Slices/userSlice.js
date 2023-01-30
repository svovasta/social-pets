import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

const initialState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

export function useAuth() {
  const { email, token, id } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
}

export const registrationAction = (regInput) => (dispatch) => {
  axios.post('/user/signup', regInput)
    .then((resp) => dispatch(setUser(resp.data)))
    .catch((err) => {
      Alert.alert('Error', err.response.data.message);
      console.log(err);
    });
};
export const loginAction = (input) => (dispatch) => {
  axios.post('/user/signin', input)
    .then((resp) => dispatch(setUser(resp.data)))
    .catch((err) => {
      Alert.alert('Error', err.response.data.message);
      console.log(err.response.data);
    });
};
export const userCheckAction = () => (dispatch) => {
  axios.post('/user/check').then((res) => dispatch(setUser(res.data))).catch(console.log);
};

export const userLogoutAction = () => (dispatch) => {
  axios.get('/user/logout').then(() => dispatch(logoutUser())).catch(console.log);
};
