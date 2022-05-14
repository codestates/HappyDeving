import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateModal: false,
  languageModal: false,
};

const studyModalSlice = createSlice({
  name: "studyModal",
  initialState,
  reducers: {
    setDateModal: (state, action) => {
      state.dateModal = action.payload;
      return state;
    },
    setLanguageModal: (state, action) => {
      state.languageModal = action.payload;
      return state;
    },
  },
});

export const { setLocationModal, setDateModal, setLanguageModal, resetData } =
  studyModalSlice.actions;

export default studyModalSlice.reducer;
