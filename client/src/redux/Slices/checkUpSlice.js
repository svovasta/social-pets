import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

const checkUpSlice = createSlice({
  name: 'checkups',
  initialState,
  reducers: {
    getCheckups: (state, action) => action.payload,
    addCheckUp: (state, action) => [...state, action.payload],
  },
});

export const { getCheckups, addCheckUp } = checkUpSlice.actions;

export const getCheckupsActon = () => (dispatch) => {
  axios('api/v1/checkup')
    .then((res) => dispatch(getCheckups(res.data)))
    .catch(console.log);
};

export const addCheckupAction = (input) => (dispatch) => {
  axios.post('api/v1/checkup', input)
    .then((res) => dispatch(addCheckUp(res.data)));
};

export default checkUpSlice.reducer;
