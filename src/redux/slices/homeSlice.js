import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  title: '',
  categoryId: '',
  categories: [],
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 1,
  }
};

const homeSlice = createSlice({
  name: 'home_slice',
  initialState: initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setPageData: (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const {
  setTitle,
  setCategoryId,
  setCategories,
  setPageData,
} = homeSlice.actions;

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/category`, setConfig());
      dispatch(setCategories(response.data));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export const fetchBooks = (page, title = '', category_id = '') => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/book/search?page=${page}&title=${title}&category_id=${category_id}`, setConfig());
      dispatch(setPageData(response.data));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export default homeSlice.reducer;