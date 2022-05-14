import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationData: "",
  dateData: "",
  languageData: "",
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setDateData: (state, action) => {
      state.dateData = action.payload;
    },
    setLanguageData: (state, action) => {
      state.languageData = action.payload;
    },
    resetData: (state) => {
      state.locationData = "";
      state.dateData = "";
      state.languageData = "";
    },
  },
});

export const { setLocationData, setDateData, setLanguageData, resetData } = searchDataSlice.actions;

export default searchDataSlice.reducer;
