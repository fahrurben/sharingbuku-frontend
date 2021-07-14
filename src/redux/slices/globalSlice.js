import { createSlice } from '@reduxjs/toolkit';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  isLoading: false,
  error: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },
    setLoaded: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setLoaded,
  setError,
  resetError,
} = globalSlice.actions;

export default globalSlice.reducer;