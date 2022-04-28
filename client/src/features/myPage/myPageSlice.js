import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfoApi, editUserDataApi, deleteUserApi } from "../../api/mypage";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async (thunkAPI) => {
  try {
    return await getUserInfoApi().then((res) => {
      console.log("mypage res::", res);
      return res;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editUserData = createAsyncThunk(
  "mypage/editUserData",
  async (editingData, thunkAPI) => {
    try {
      return await editUserDataApi(editingData).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk("mypage/deleteUser", async (thunkAPI) => {
  try {
    return await deleteUserApi().then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const myPageSlice = createSlice({
  name: "myPage",
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
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(editUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = myPageSlice.actions;

export default myPageSlice.reducer;
