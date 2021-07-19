import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
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