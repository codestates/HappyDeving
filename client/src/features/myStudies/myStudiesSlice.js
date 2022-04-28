import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { writeMyStudyApi, deleteStudyApi } from "../../api/study";
// writeStudis 배열에 내가 쓴 스터디글 담기
const initialState = {
  writeStudis: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// 내가 쓴 스터디 글 조회
export const writeMyStudy = createAsyncThunk("myStudyCards/writeMyStudy", async (thunkAPI) => {
  try {
    return await writeMyStudyApi().then((res) => {
      return res.dataValues;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
// 내가 쓴 스터디 글 삭제
export const deleteMyStudy = createAsyncThunk("myStudyCards/deleteMyStudy ", async (thunkAPI) => {
  try {
    return await deleteStudyApi().then((res) => {
      return res.dataValues;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const writeMyStudyCardsSlice = createSlice({
  name: "myStudyCards",
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
      .addCase(writeMyStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(writeMyStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeStudis.push(action.payload);
      })
      .addCase(writeMyStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMyStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMyStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.writeStudis = state.writeStudis.filter((study) => study.id !== action.payload.id);
      })
      .addCase(deleteMyStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = writeMyStudyCardsSlice.actions;
export default writeMyStudyCardsSlice.reducer;
