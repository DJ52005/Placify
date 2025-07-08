import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import interviewReducer from '../features/interview/interviewSlice'; // <-- 1. Import new slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer, // <-- 2. Add new slice to the store
  },
});
