import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calenderDateValue: null,
};

const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {
    ClickCalenderDate: (state, action) => {
      state.calenderDateValue = action.payload;
      return state;
    },
  },
});

export const { ClickCalenderDate } = calenderSlice.actions;

export default calenderSlice.reducer;
