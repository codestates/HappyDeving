import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";
import authReducer from "./features/auth/authSlice";
import searchModalReducer from "./features/searchModals/searchModalSlice";
import calenderReducer from "./features/calendarDate/calendarDate";
import likedStudyCardsReducer from "./features/likedStudies/likedStudiesSlice";
import myPageReducer from "./features/myPage/myPageSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    search: searchModalReducer,
    calender: calenderReducer,
    likedStudyCards: likedStudyCardsReducer,
    myPage: myPageReducer,
  },
});
