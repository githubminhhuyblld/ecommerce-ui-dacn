import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async ({ amount, orderInfo }, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/payment/create-payment?amount=${amount}&orderInfo=${orderInfo}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async (
    { vnp_Amount, vnp_BankCode, vnp_OrderInfo, vnp_ResponseCode },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.get(
        `/payment/payment-info?vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_ResponseCode=${vnp_ResponseCode}`
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
      })
      .addCase(confirmPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
