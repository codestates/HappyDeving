import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCommentsApi,
  writeCommentApi,
  editCommentApi,
  deleteCommentApi,
} from "../../api/comment";

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getComments = createAsyncThunk("comment/getComments", async (id, thunkAPI) => {
  try {
    return await getCommentsApi(id).then((res) => {
      console.log("getting comments: ", res.data.data.comments);

      return res.data.data.comments;
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const writeComment = createAsyncThunk(
  "comment/writeComment",
  async (commentData, thunkAPI) => {
    try {
      return await writeCommentApi(commentData).then((res) => {
        console.log("writing comment: ", res);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async (commentData, thunkAPI) => {
    try {
      return await editCommentApi(commentData).then((res) => {
        // console.log("edited comment: ", res);
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (comment, thunkAPI) => {
    try {
      return await deleteCommentApi({ study_commentId: comment.id }).then((res) => {
        return res.data;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
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
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = [...action.payload];
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(writeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(writeComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(writeComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // console.log("edit comment data: ", action.payload.data.comments[0]);
        // console.log("edit comment data: ", action.meta.arg.study_commentId);
        state.comments = state.comments.map((comment) =>
          comment.id === action.meta.arg.study_commentId ? action.payload.data.comments[0] : comment
        );
      })
      .addCase(editComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allStudies = null;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter((comment) => comment.id !== action.meta.arg.id);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
