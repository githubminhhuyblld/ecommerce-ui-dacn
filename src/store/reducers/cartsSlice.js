import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        `/cart/add?userId=${userId}`,
        cartItem,
        { headers: authHeader() }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/cart/${userId}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    success: false,
    cartItems: [],
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartItems = action.payload;
        
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export const selectCartItems = (state) => state.cart.cartItems;
export const selectSuccess = (state) => state.cart.success;

export const { setSuccess, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
