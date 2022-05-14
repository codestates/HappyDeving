import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import allStudiesReducer from "./features/studies/allStudiesSlice";
import commentReducer from "./features/comment/commentSlice";
import searchModalReducer from "./features/Search/searchModalSlice";
import calenderReducer from "./features/calendarDate/calendarDate";
import searchDataReducer from "./features/Search/searchDataSlice";
import setStudiesReducer from "./features/studies/studiesSlice";
import setStudyModal from "./features/studies/studyModalSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchModalReducer,
    calender: calenderReducer,
    searchData: searchDataReducer,
    studies: setStudiesReducer,
    studyModal: setStudyModal,
    allStudies: allStudiesReducer,
    comment: commentReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
