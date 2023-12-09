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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const fetchOrdersByUserId = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async ({ userId, page, size }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/${userId}?page=${page}&size=${size}`,
        {
          headers: authHeader(),
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersByShopId = createAsyncThunk(
  "order/fetchOrdersByShopId",
  async ({ userId, shopId, page, size }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/${shopId}/shop?page=${page}&size=${size}&userId=${userId}`,
        { headers: authHeader() }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
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

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ userId, orderId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/order/${orderId}?userId=${userId}`,
        { headers: authHeader() }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersByShopIdAndStatus = createAsyncThunk(
  "order/fetchOrdersByShopIdAndStatus",
  async ({ shopId, userId, orderStatus, page, size }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/${shopId}/status?orderStatus=${orderStatus}&page=${page}&size=${size}&userId=${userId}`,
        {
          headers: authHeader(),
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLastedOrders = createAsyncThunk(
  "order/fetchLastedOrders",
  async ({ shopId, userId, page, size }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/${shopId}/latest-orders?page=${page}&size=${size}&userId=${userId}`,
        {
          headers: authHeader(),
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersBySixMonths = createAsyncThunk(
  "order/fetchOrdersBySixMonths",
  async ({ shopId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/six-month?shopId=${shopId}&userId=${userId}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersWeek = createAsyncThunk(
  "order/fetchOrdersWeek",
  async ({ shopId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/by-week?shopId=${shopId}&userId=${userId}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersMonth = createAsyncThunk(
  "order/fetchOrdersMonth",
  async ({ shopId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/order/by-month?shopId=${shopId}&userId=${userId}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrdersByShopAndEmail = createAsyncThunk(
  "order/fetchOrdersByShopAndEmail",
  async ({ shopId, email }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/order/shop/${shopId}/email/${encodeURIComponent(email)}`, {
        headers: authHeader(),
      });
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
  shopOrders: [],
  success: false,
  orderStatus: [],
  lastedOrder: [],
  orderSixMonths: [],
  ordersWeek:[],
  ordersMonth:[],
  ordersByEmail:[]
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderStatusSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetData: (state, action) => {
      state.orderStatus = [];
      state.lastedOrder = [];
      state.orders = [];
      state.shopOrders = [];
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
      })
      .addCase(fetchOrdersByShopIdAndStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByShopIdAndStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatus = action.payload;
      })
      .addCase(fetchOrdersByShopIdAndStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLastedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLastedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.lastedOrder = action.payload;
      })
      .addCase(fetchLastedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        console.log(state.orders);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersBySixMonths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersBySixMonths.fulfilled, (state, action) => {
        state.orderSixMonths = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersBySixMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersWeek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersWeek.fulfilled, (state, action) => {
        state.ordersWeek = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersMonth.fulfilled, (state, action) => {
        state.ordersMonth = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByShopAndEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByShopAndEmail.fulfilled, (state, action) => {
        state.ordersByEmail = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrdersByShopAndEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectError = (state) => state.order.error;
export const selectOrdersLoading = (state) => state.order.loading;
export const selectOrdersByUserId = (state) => state.order.orders;
export const selectOrderStatus = (state) => state.order.orderStatus;
export const selectOrderlasted = (state) => state.order.lastedOrder;
export const selectOrdersByShopId = (state) => state.order.shopOrders;
export const selectOrderSuccess = (state) => state.order.success;
export const selectOrderBySixMonth = (state) => state.order.orderSixMonths;
export const selectOrderByWeek = (state) => state.order.ordersWeek;
export const selectOrderByMonth = (state) => state.order.ordersMonth;
export const selectOrderByEmail = (state) => state.order.ordersByEmail;
export const { setOrderStatusSuccess, resetData } = orderSlice.actions;

export default orderSlice.reducer;
