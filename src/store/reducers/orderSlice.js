import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const createOrder = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/order?userId=${userId}`, body, {
        headers: authHeader(),
      });
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const fetchOrdersByUserId = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/order/${userId}`,{headers: authHeader()});
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  orderId: null,
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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

export const selectOrdersByUserId = (state) => state.order.orders;

export default orderSlice.reducer;
