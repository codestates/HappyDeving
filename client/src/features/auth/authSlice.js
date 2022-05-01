import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinApi, signupApi } from "../../api/users";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const signup = createAsyncThunk("auth/signup", async (signupData, thunkAPI) => {
  try {
    return await signupApi(signupData).then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signin = createAsyncThunk("auth/signin", async (signinData, thunkAPI) => {
  try {
    return await signinApi(signinData).then((res) => {
      if (res) {
        // console.log("signin res::", res); // 잘 들어옴
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signout = createAsyncThunk("auth/signout", async () => {
  await localStorage.removeItem("user");
});

export const authSlice = createSlice({
  name: "auth",
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
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
