import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
  provinces: [],
  cities: [],
};

const registerSlice = createSlice({
  name: 'register_page',
  initialState: initialState,
  reducers: {
    setProvinces: (state, action) => {
      state.provinces = action.payload.data;
    },
    setCities: (state, action) => {
      state.cities = action.payload.data;
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
  setProvinces,
  setCities,
  setFormLoading,
  setFormError,
  setFormSuccess,
  resetForm,
} = registerSlice.actions;

export const fetchProvinces = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/province`, setConfig());
      const provinces = response.data;
      dispatch(setProvinces(provinces));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export const fetchCities = (provinceId) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/city/${provinceId}`, setConfig());
      const cities = response.data;
      dispatch(setCities(cities));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/register`, user, setConfig());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default registerSlice.reducer;