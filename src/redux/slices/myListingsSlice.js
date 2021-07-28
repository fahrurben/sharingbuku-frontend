import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';
import { setCategories } from './addBookSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
  }
};

const myListingsSlice = createSlice({
  name: 'my_listings_slice',
  initialState: initialState,
  reducers: {
    setPageData: (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const {
  setPageData,
} = myListingsSlice.actions;

export const fetchMyListings = (page) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/user/book?page=${page}`, setConfig());
      dispatch(setPageData(response.data));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export default myListingsSlice.reducer;