import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/comment`, body, {
        headers: authHeader(),
      });
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchCommentsByProductId = createAsyncThunk(
  "comment/fetchCommentsByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/comment/product/${productId}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByProductId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCommentsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.loading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCommentsLoading = (state) => state.comment.loading;
export const selectCommentsByProductId = (state) => state.comment.comments;
export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;
