import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios.jsx";
import authHeader from "~/services/auth/authHeader.jsx";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/users/me", {
        headers: authHeader(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "user/UpdatePassword",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/users/update/password/${userId}`,
        body,
        {
          headers: authHeader(),
        }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const updateInfoUser = createAsyncThunk(
  "user/updateInfoUser",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/users/${userId}`,
        body,
        {
          headers: authHeader(),
        }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    info: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetUser: (state, action) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateInfoUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateInfoUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const selectUser = (state) => state.user.info;
export const { setAuthenticated, resetUser } = userSlice.actions;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export default userSlice.reducer;
