import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setConfig } from '../../helpers/AjaxHelper';
import { setLoading, setLoaded, setError, resetError } from './globalSlice';

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

const incomingRequestListSplice = createSlice({
  name: 'incoming_request_list_splice',
  initialState: initialState,
  reducers: {
    setRequestListData: (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    },
  },
});

export const {
  setRequestListData,
} = incomingRequestListSplice.actions;

export const fetchIncomingRequestList = (page) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${baseUrl}/api/user/incoming_request?page=${page}`, setConfig());
      dispatch(setRequestListData(response.data));
    } catch (e) {
      dispatch(setError(e?.response?.data));
      dispatch(resetError());
    } finally {
      dispatch(setLoaded());
    }
  }
};

export default incomingRequestListSplice.reducer;