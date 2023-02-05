import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

const faveSlice = createSlice({
  name: 'faves',
  initialState: [],
  reducers: {
    getFaves: (state, action) => action.payload,
    addFave: (state, action) => [...state, action.payload],
    deleteFave: (state, action) => state.filter((el) => el.postId !== action.payload),
  },
});

export const { getFaves, addFave, deleteFave } = faveSlice.actions;

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

export const deleteFavesAction = (id) => (dispatch) => {
  axios.delete(`/api/v1/${id}/favourites/del`)
    .then((res) => dispatch(deleteFave(res.data)))
    .catch(console.log);
};

export default faveSlice.reducer;
