import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async ({ amount, orderInfo }, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/create-payment?amount=${amount}&orderInfo=${orderInfo}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.paymentUrl = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
