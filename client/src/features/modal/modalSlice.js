import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signinModal: false,
  signupModal: false,
  calenderModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSigninModal: (state, action) => {
      state.signinModal = action.payload;
      return state;
    },
    openSignupModal: (state, action) => {
      state.signupModal = action.payload;
      return state;
    },
    openCalenderModal: (state, action) => {
      state.calenderModal = action.payload;
      return state;
    },
  },
});

export const { openSigninModal, openSignupModal, openCalenderModal } = modalSlice.actions;

export default modalSlice.reducer;
