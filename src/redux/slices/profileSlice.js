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
  first_name: '',
  last_name: '',
  birthday: null,
  address: null,
  province: null,
  city: null,
  zip_code: '',
};

const profileSlice = createSlice({
  name: 'profile_page',
  initialState: initialState,
  reducers: {
    setProvinces: (state, action) => {
      state.provinces = action.payload.data;
    },
    setCities: (state, action) => {
      state.cities = action.payload.data;
    },
    setProfile: (state, action) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.birthday = action.payload.birthday;
      state.address = action.payload.address;
      state.province = action.payload.province;
      state.city = action.payload.city;
      state.zip_code = action.payload.zip_code;
      state.formStatus = IDLE;
      state.formError = null;
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
  setProfile,
  setFormLoading,
  setFormError,
  setFormSuccess,
} = profileSlice.actions;

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

export const resetProfileForm = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const responseProvinces = await axios.get(`${baseUrl}/api/province`, setConfig());
      const provinces = responseProvinces.data;
      const responseProfile = await axios.get(`${baseUrl}/api/user/profile`, setConfig());
      const profileData = responseProfile.data;
      dispatch(setProvinces(provinces));
      dispatch(setProfile(profileData));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
}

export const updateProfile = (user) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/user/profile`, user, setConfig());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default profileSlice.reducer;