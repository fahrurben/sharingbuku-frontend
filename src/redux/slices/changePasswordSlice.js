import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
};

const changePasswordSlice = createSlice({
  name: 'change_password_page',
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
} = changePasswordSlice.actions;

export const doChangePassword = (credential) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/user/password`, credential, setConfig());
      dispatch(setFormSuccess());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default changePasswordSlice.reducer;