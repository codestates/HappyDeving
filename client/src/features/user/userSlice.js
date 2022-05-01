import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinApi, signupApi } from "../../api/users";
import { editProfileApi, deleteUserApi } from "../../api/mypage";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const signup = createAsyncThunk("user/signup", async (signupData, thunkAPI) => {
  try {
    return await signupApi(signupData).then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signin = createAsyncThunk("user/signin", async (signinData, thunkAPI) => {
  try {
    return await signinApi(signinData).then((res) => {
      if (res) {
        console.log("signin res.data::", res.data); // 잘 들어옴
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signout = createAsyncThunk("user/signout", async () => {
  await localStorage.removeItem("user");
});

export const editProfile = createAsyncThunk("user/editProfile", async (userData, thunkAPI) => {
  console.log("userData: ", userData); // 여기까진 들어옴, 401 unuserorized, 헤더에 토큰은 있음
  console.log("user.id: ", user.id);
  try {
    return await editProfileApi(user.id, userData).then((res) => {
      console.log("edit res::", res);
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (thunkAPI) => {
  try {
    return await deleteUserApi().then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userSlice = createSlice({
  name: "user",
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
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signout.fulfilled, (state) => {
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

export const { reset } = userSlice.actions;
export default userSlice.reducer;
