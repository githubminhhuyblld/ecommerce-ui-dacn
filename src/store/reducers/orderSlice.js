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
      const response = await instance.get(`/order/${userId}`, {
        headers: authHeader(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchOrdersByShopId = createAsyncThunk(
  "order/fetchOrdersByShopId",
  async ({ userId, shopId,page,size }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/${shopId}/shop?page=${page}&size=${size}&userId=${userId}`,
        { headers: authHeader() }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOrderCanceled = createAsyncThunk(
  "order/updateOrderCanceled",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/order/${orderId}/status/canceled?userId=${userId}`,
        null,
        { headers: authHeader() }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOrderReady = createAsyncThunk(
  "order/updateOrderReady",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/order/${orderId}/status/ready?userId=${userId}`,
        null,
        { headers: authHeader() }
      );
      return response.status;
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
  shopOrders: [],
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderStatusSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
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
      })
      .addCase(fetchOrdersByShopId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByShopId.fulfilled, (state, action) => {
        state.shopOrders = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchOrdersByShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderCanceled.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderCanceled.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrderCanceled.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderReady.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderReady.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrderReady.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrdersLoading = (state) => state.order.loading;
export const selectOrdersByUserId = (state) => state.order.orders;
export const selectOrdersByShopId = (state) => state.order.shopOrders;
export const selectOrderSuccess = (state) => state.order.success;
export const { setOrderStatusSuccess } = orderSlice.actions;

export default orderSlice.reducer;
