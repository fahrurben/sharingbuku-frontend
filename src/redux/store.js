import { configureStore } from '@reduxjs/toolkit';
import GlobalSlice from './slices/globalSlice';
import RegisterSlice from './slices/registerSlice';
import LoginSlice from './slices/loginSlice';
import ProfileSlice from './slices/profileSlice';
import ChangePasswordSlice from './slices/changePasswordSlice';

export default configureStore({
  reducer: {
    global: GlobalSlice,
    register: RegisterSlice,
    login: LoginSlice,
    profile: ProfileSlice,
    changePassword: ChangePasswordSlice,
  },
})