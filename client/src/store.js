import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/userSlice";
import searchModalReducer from "./features/Search/searchModalSlice";
import calenderReducer from "./features/calendarDate/calendarDate";
import likedStudyCardsReducer from "./features/likedStudies/likedStudiesSlice";
import writeMyStudyCardsSlice from "./features/myStudies/myStudiesSlice";
import searchDataReducer from "./features/Search/searchDataSlice";
import setStudiesReducer from "./features/studies/studiesSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    search: searchModalReducer,
    calender: calenderReducer,
    likedStudyCards: likedStudyCardsReducer,
    searchData: searchDataReducer,
    writeMyStudyCards: writeMyStudyCardsSlice,
    studies: setStudiesReducer,
  },
});
