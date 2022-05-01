import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileApi, editProfileApi, deleteUserApi } from "../../api/mypage";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getProfile = createAsyncThunk("myPage/getProfile", async (id, thunkAPI) => {
  try {
    return await getProfileApi(id).then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editProfile = createAsyncThunk(
  "myPage/editProfile",
  async ({ id, userData }, thunkAPI) => {
    // console.log("userData: ", userData); // 여기까진 들어옴, 401 unauthorized, 헤더에 토큰이 없었음
    try {
      return await editProfileApi(id, userData).then((res) => {
        console.log("edit res::", res);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk("myPage/deleteUser", async (thunkAPI) => {
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
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data.userInfo;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
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
