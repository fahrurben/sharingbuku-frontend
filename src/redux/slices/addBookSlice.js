import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig, timeout } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
  categories: [],
};

const addBookSlice = createSlice({
  name: 'add_book_page',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setFormLoading: (state) => {
      state.formStatus = LOADING;
      state.formError = null;
    },
    setFormError: (state, action) => {
      state.formStatus = FAILED;
      state.formError = action.payload;
    },
    setFormSuccess: (state) => {
      state.formStatus = SUCCEEDED;
      state.formError = null;
    },
    resetForm: (state) => {
      state.formStatus = IDLE;
      state.formError = null;
    }
  },
});

export const {
  setCategories,
  setFormLoading,
  setFormError,
  setFormSuccess,
  resetForm,
} = addBookSlice.actions;

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


export const addBookSubmit = (book) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/user/book`, book, setConfig());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default addBookSlice.reducer;