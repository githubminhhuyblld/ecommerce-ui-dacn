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
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/cart/remove/${userId}/items/${itemId}`,
        {
          headers: authHeader(),
        }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const updateQuantityCartItem = createAsyncThunk(
  "cart/updateQuantityCartItem",
  async ({ productId, amount, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/cart/update/items/${productId}?amount=${amount}&userId=${userId}`,
        null,
        {
          headers: authHeader(),
        }
      );
      return response.status;
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
    selectedItems: JSON.parse(localStorage.getItem("selectedItems") || "[]"),
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.success = false;
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
    addSelectedItem: (state, action) => {
      const exists = state.selectedItems.some(
        (item) => item.productId === action.payload.productId
      );
      if (!exists) {
        state.selectedItems.push(action.payload);
        localStorage.setItem(
          "selectedItems",
          JSON.stringify(state.selectedItems)
        );
      }
    },
    removeSelectedItem: (state, action) => {
      const index = state.selectedItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.selectedItems.splice(index, 1);
        localStorage.setItem(
          "selectedItems",
          JSON.stringify(state.selectedItems)
        );
      }
    },
    clearCartItem: (state) => {
      state.cartItems = [];
      state.selectedItems = [];
      localStorage.removeItem("selectedItems");
      state.success = false;
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
      localStorage.removeItem("selectedItems");
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
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
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
      })
      .addCase(updateQuantityCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateQuantityCartItem.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateQuantityCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export const selectCartItems = (state) => state.cart.cartItems;
export const selectSuccess = (state) => state.cart.success;
export const selectedProducts = (state) => state.cart.selectedItems;

export const {
  setSuccess,
  clearCart,
  addSelectedItem,
  removeSelectedItem,
  clearCartItem,
  setSelectedItems,
  clearSelectedItems
} = cartSlice.actions;

export default cartSlice.reducer;
