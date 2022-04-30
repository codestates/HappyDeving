import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studies: [],
};

const studiesSlice = createSlice({
  name: "studies",
  initialState,
  reducers: {
    setStudiesData: (state, action) => {
      state.studies = action.payload;
    },
  },
});

export const { setStudiesData } = studiesSlice.actions;

export default studiesSlice.reducer;
