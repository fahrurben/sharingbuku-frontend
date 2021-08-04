import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';
import { setCategories } from './homeSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  book: null,
};

const bookDetailsSlice = createSlice({
  name: 'book_details_slice',
  initialState: initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload.data;
    },
  },
});

export const {
  setBook,
} = bookDetailsSlice.actions;

export const fetchBook = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/book/details/${id}`, setConfig());
      dispatch(setBook(response.data));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export default bookDetailsSlice.reducer;