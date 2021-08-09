import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { FAILED, IDLE, LOADING, SUCCEEDED } from '../../constant';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';
import { setCategories } from './homeSlice';
import _ from 'lodash';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  formStatus: IDLE,
  formError: null,
  delivery_receipt: null,
};

const sendBackSlice = createSlice({
  name: 'send_back_slice',
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
} = sendBackSlice.actions;

export const sendBackSubmit = (transId, receipt) => {
  return async (dispatch) => {
    try {
      dispatch(setFormLoading());
      await axios.post(`${baseUrl}/api/transaction/send_back`, { transaction_id: transId, receipt: receipt }, setConfig());
      await setTimeout(() => {
        dispatch(setFormSuccess());
      }, 100);
    } catch (e) {
      dispatch(setFormError(e?.response?.data?.message));
    }
  }
}

export default sendBackSlice.reducer;