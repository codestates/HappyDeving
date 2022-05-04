import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signinApi,
  signupApi,
  getProfileApi,
  editProfileApi,
  deleteUserApi,
  editProfileImageApi,
} from "../../api/users";

// import { editProfileImageApi } from "../../api/ProfileImage";
const user = JSON.parse(localStorage.getItem("user")); // initial state에 넣으려고 가져왔을 뿐 나중에 state.user가 업데이트 되어도 반영이 되지 않으므로 editProfile 호출 후 다시 set

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
        console.log("signin res.data: ", res.data);
        // { newAccessToken,
        //   data: {userInfo: {} }}
        localStorage.setItem("user", JSON.stringify(res.data.data.userInfo));
        localStorage.setItem("token", JSON.stringify(res.data.newAccessToken));
      }
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signout = createAsyncThunk("user/signout", async () => {
  await localStorage.removeItem("user");
  await localStorage.removeItem("token");
});

export const getProfile = createAsyncThunk("user/getProfile", async (id, thunkAPI) => {
  // console.log("getProfile id: ", id); // 2
  try {
    return await getProfileApi(id).then((res) => {
      return res.data;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ id, userData }, thunkAPI) => {
    try {
      return await editProfileApi(id, userData).then((res) => {
        // console.log("axios.patch 후 res.data::", res.data);
        localStorage.setItem("user", JSON.stringify(res.data.data.userInfo));
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editProfileImage = createAsyncThunk(
  "user/editProfileImage",
  async ({ id, formdata }, thunkAPI) => {
    console.log("실행은되나", { id, formdata });
    try {
      return await editProfileImageApi(id, formdata).then((res) => {
        console.log("axios.patch 후 editProfileImage res.data ::", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
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
        state.user = action.payload.data.userInfo;
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
        state.user = action.payload.data.userInfo;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(editProfileImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user.image = action.payload.data.userInfo.image;
        // console.log("action.payload);
      })
      .addCase(editProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
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
