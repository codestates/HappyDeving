// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//   // writeCards:[], 내가 작성한 글을 따로 뺼지
//   // like 아이콘이 Pull 인 상태인 카드만 갖고오기 likedStudyCards 배열에 담기
//   likedStudyCards: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// // 좋아하는 카드가 추가될때 add cards
// export const addLikedCard = createAsyncThunk("likedStudyCards/likedStudys");

// export const likedStudyCardsSlice = createSlice({
//   name: "likedCard",
//   initialState,
//   reducers: {
//     reset: (state) => initialState,
//   },
// });

// export const { reset } = likedStudyCardsSlice.actions;
// export default likedStudyCardsSlice.reducer;
