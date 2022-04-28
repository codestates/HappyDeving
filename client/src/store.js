import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import searchModalReducer from "./features/Search/searchModalSlice";
import calenderReducer from "./features/calendarDate/calendarDate";
import likedStudyCardsReducer from "./features/likedStudies/likedStudiesSlice";
import searchDataReducer from "./features/Search/searchDataSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    search: searchModalReducer,
    calender: calenderReducer,
    likedStudyCards: likedStudyCardsReducer,
    searchData: searchDataReducer,
  },
});
