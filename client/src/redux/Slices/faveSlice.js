import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const faveSlice = createSlice({
  name: 'faves',
  initialState: [],
  reducers: {
    getFaves: (state, action) => action.payload,
    addFave: (state, action) => [...state, action.payload],
  },
});

export const {
  getFaves, addFave,
} = faveSlice.actions;

export const getFavesAction = () => (dispatch) => {
  axios('/api/v1/favourites')
    .then((res) => dispatch(getFaves(res.data)))
    .catch(console.log);
};

export const addFavesAction = (id) => (dispatch) => {
  axios.post(`/api/v1/${id}/favourites`)
    .then((res) => dispatch(addFave(res.data)))
    .catch(console.log);
};

export default faveSlice.reducer;
