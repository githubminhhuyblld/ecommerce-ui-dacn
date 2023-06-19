import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const createOrder = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, body }, { rejectWithValue }) => {
      try {
        const response = await instance.post(
          `/order?userId=${userId}`,
          body,
          { headers: authHeader() }
        );
        return response.status;
      } catch (error) {
        return rejectWithValue(error.response.status);
      }
    }
  );
  const initialState = {
    loading: false,
    error: null,
    orderId: null,
  };

  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.orderId = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.orderId = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default orderSlice.reducer;