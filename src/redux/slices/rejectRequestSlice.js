import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';
import _ from 'lodash';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
};

const rejectRequestSlice = createSlice({
  name: 'reject_request_slice',
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
  setBook,
  setFormLoading,
  setFormError,
  setFormSuccess,
  resetForm,
} = rejectRequestSlice.actions;

export const rejectRequestSubmit = (transactionId) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/transaction/reject`, { transaction_id: transactionId }, setConfig());
      await setTimeout(() => {  dispatch(setFormSuccess()); }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default rejectRequestSlice.reducer;