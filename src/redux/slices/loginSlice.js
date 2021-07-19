import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { AUTH_FULL_NAME_KEY, AUTH_TOKEN_KEY, FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
};

const loginSlice = createSlice({
  name: 'login_page',
  initialState: initialState,
  reducers: {
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
  setFormLoading,
  setFormError,
  setFormSuccess,
  resetForm,
} = loginSlice.actions;

export const doLogin = (credential) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      const response = await axios.post(`${baseUrl}/api/login`, credential, setConfig());
      localStorage.setItem(AUTH_TOKEN_KEY, response?.data?.access_token);
      localStorage.setItem(AUTH_FULL_NAME_KEY, response?.data?.full_name)
      dispatch(setFormSuccess());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default loginSlice.reducer;