import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  // getAllStudiesApi,
  // singleStudyApi,
  writeStudyApi,
  editStudyApi,
  deleteStudyApi,
  likeStudyApi,
  getLikedStudiesApi,
  unLikeStudyApi,
  getMyStudiesApi,
} from "../../api/study";

const initialState = {
  allStudies: [],
  likedStudies: [],
  myStudies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// export const getAllStudies = createAsyncThunk("allStudies/getAllStudies", async (thunkAPI) => {
//   try {
//     return await getAllStudiesApi().then((res) => {
//       // console.log("all studies: ", res); // Postman 아무 정보 없음
//       return res.data;
//     });
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const getSingleStudy = createAsyncThunk(
//   "allStudies/getSingleStudy",
//   async (id, thunkAPI) => {
//     try {
//       return await singleStudyApi(id).then((res) => {
//         return res.data;
//       });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const writeStudy = createAsyncThunk(
  "allStudies/writeStudy",
  async (data, thunkAPI) => {
    try {
      return await writeStudyApi(data).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editStudy = createAsyncThunk(
  "allStudies/editStudy",
  async (data, thunkAPI) => {
    try {
      return await editStudyApi(data).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteStudy = createAsyncThunk(
  "allStudies/deleteStudy",
  async (data, thunkAPI) => {
    try {
      return await deleteStudyApi(data).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const likeStudy = createAsyncThunk(
  "allStudies/likeStudy",
  async ({ id, studyData }, thunkAPI) => {
    try {
      return await likeStudyApi(id, studyData).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getLikedStudies = createAsyncThunk(
  "allStudies/getLikedStudies",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      return await getLikedStudiesApi(id).then((res) => {
        // console.log("get liked studies: ", res.data);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unLikeStudy = createAsyncThunk(
  "allStudies/unLikeStudy",
  async ({ id, studyData }, thunkAPI) => {
    console.log("delete studyData", id, studyData);
    try {
      return await unLikeStudyApi(id, studyData).then((res) => {
        console.log("unlike clicked: ", res.data);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMyStudies = createAsyncThunk(
  "allStudies/getMyStudies",
  async (id, thunkAPI) => {
    try {
      return await getMyStudiesApi(id).then((res) => {
        // console.log("my studies after axios", res);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const allStudiesSlice = createSlice({
  name: "allStudies",
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
      // .addCase(getAllStudies.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getAllStudies.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.allStudies = action.payload;
      // })
      // .addCase(getAllStudies.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.allStudies = null;
      // })
      // .addCase(getSingleStudy.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getSingleStudy.fulfilled, (state) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.allStudies = action.payload;
      // })
      // .addCase(getSingleStudy.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
      .addCase(writeStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(writeStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allStudies.push(action.payload);
      })
      .addCase(writeStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allStudies = state.allStudies.filter(
          (study) => study.id !== action.payload.id
        );
      })
      .addCase(deleteStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.allStudies.map((study) =>
          study.id === action.payload.id ? action.payload : study
        );
      })
      .addCase(editStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likedStudies.push(action.payload);
      })
      .addCase(likeStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLikedStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikedStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("liked studies", action.payload.data.studies); // {data: {data: studies}}
        state.likedStudies = action.payload.data.studies;
      })
      .addCase(getLikedStudies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(unLikeStudy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unLikeStudy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likedStudies = state.likedStudies.filter(
          (likedStudy) => likedStudy.id !== action.payload.id
        );
      })
      .addCase(unLikeStudy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyStudies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyStudies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myStudies = action.payload.data.studies;
      })
      .addCase(getMyStudies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.myStudies = null;
      });
  },
});

export const { reset } = allStudiesSlice.actions;
export default allStudiesSlice.reducer;
