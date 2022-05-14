import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: false,
  date: false,
  language: false,
};

const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    locationModal: (state) => {
      state.location = true;
      state.date = false;
      state.language = false;
    },
    dateModal: (state, action) => {
      state.location = false;
      state.date = action.payload;
      state.language = false;
    },

    languageModal: (state) => {
      state.location = false;
      state.date = false;
      state.language = true;
    },
    reset: (state) => {
      state.location = false;
      state.date = false;
      state.language = false;
    },
  },
});

export const { locationModal, dateModal, languageModal, reset } = searchModalSlice.actions;

export default searchModalSlice.reducer;
