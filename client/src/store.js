import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});
