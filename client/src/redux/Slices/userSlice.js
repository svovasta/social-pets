import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

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
    editUser(state, action) {
      return state.map((user) => (user.id === action.payload.id ? { ...user, name: action.payload.values.name, description: action.payload.values.description } : user));
    },
  },
});

export const {
  findUser, setUser, logoutUser, editUser,
} = userSlice.actions;
export default userSlice.reducer;

export const editProfileAction = (id, values) => (dispatch) => {
  axios.patch(`/user/${id}/edit`, { values })
    .then((res) => dispatch(editUser(res.data)))
    .catch((err) => console.log(err.response.data));
};

export const findUserAction = () => (dispatch) => {
  axios('/user')
    .then((res) => dispatch(findUser(res.data)))
    .catch(console.log);
};

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
