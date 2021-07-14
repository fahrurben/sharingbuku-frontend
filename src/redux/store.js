import { configureStore } from '@reduxjs/toolkit';
import GlobalSlice from './slices/globalSlice';
import RegisterSlice from './slices/registerSlice';

export default configureStore({
  reducer: {
    global: GlobalSlice,
    register: RegisterSlice
  },
})