import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLikedStudyApi, UnLikedStudyApi  } from "../../api/study";
const initialState = {
  // writeCards:[], 내가 작성한 글을 따로 뺼지
  // like 아이콘이 Pull 인 상태인 카드만 갖고오기 likedStudyCards 배열에 담기
  likedStudyCards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// 좋아하는 카드가 추가될때 add cards
export const addLikedCard = createAsyncThunk(
  "studyCards/addLikedCard",
  async (CardsData, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token
      return await addLikedStudyApi(CardsData).then((res) => {
        return res.dataValues;
        // return res.dataValues;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unLikedCard= createAsyncThunk(
  "studyCards/unLikedCard",
  async (CardsData, thunkAPI) => {
    try {
      
      return await UnLikedStudyApi (CardsData).then((res) => {
        return res.dataValues;
      
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const unLikedCard = createAsyncThunk("likedCard/likedStudy", async () => {
//   await localStorage.removeItem("likedStudyCards");
// });

export const likedStudyCardsSlice = createSlice({
  name: "studyCards",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLikedCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLikedCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likedStudyCards.push(action.payload);
        
      })
      .addCase(addLikedCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      
      })
      .addCase(unLikedCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unLikedCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likedStudyCards = state.likedStudyCards.filter(
          (card) => card.id !== action.payload.id
      })
      .addCase(unLikedCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

      });
  },
});



export const { reset } = likedStudyCardsSlice.actions;
export default likedStudyCardsSlice.reducer;
