import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios.jsx";
import authHeader from "~/services/auth/authHeader.jsx";

export const fetchProductsByShopId = createAsyncThunk(
  "shop/fetchProductsByShopId",
  async ({ shopId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/products/${shopId}/shops?userId=${userId}`,
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

export const fetchInfoShop = createAsyncThunk(
  "shop/fetchInfoShop",
  async ({ shopId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/shops/${shopId}?userId=${userId}`, {
        headers: authHeader(),
      });
      const shopInfo = response.data.data;
      return shopInfo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerShop = createAsyncThunk(
  "shop/registerShop",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/shops?userId=${userId}`, body, {
        headers: authHeader(),
      });
      const shopInfo = response.data.data;
      localStorage.setItem("shopInfo", JSON.stringify(shopInfo));
      return shopInfo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateShop = createAsyncThunk(
  "shop/updateShop",
  async ({ userId, shopId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/shops/${shopId}?userId=${userId}`,
        body,
        {
          headers: authHeader(),
        }
      );
      const shopInfo = response.data;
      localStorage.setItem("shopInfo", JSON.stringify(shopInfo));
      return shopInfo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addProduct = createAsyncThunk(
  "shop/addProduct",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/products?userId=${userId}`, body, {
        headers: authHeader(),
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "shop/updateProduct",
  async ({ productId, userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/products/${productId}?userId=${userId}`,
        body,
        {
          headers: authHeader(),
        }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeProduct = createAsyncThunk(
  "shop/removeProduct",
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/products/${productId}?userId=${userId}`,
        {
          headers: authHeader(),
        }
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    shopInfo: JSON.parse(localStorage.getItem("shopInfo")) || [],
    loading: false,
    error: null,
    registerStatus: null,
  },
  reducers: {
    resetProducts: (state, action) => {
      state.products = [];
     
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByShopId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductsByShopId.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });

    builder
      .addCase(fetchProductsByShopId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInfoShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfoShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shopInfo = action.payload;
      })
      .addCase(fetchInfoShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerShop.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = "success";
        state.shopInfo = action.payload;
      })
      .addCase(registerShop.rejected, (state, action) => {
        state.loading = false;
        state.registerStatus = "failed";
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId } = action.meta.arg;
        state.products = state.products.filter(
          (product) => product.id !== productId
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shopInfo = action.payload;
        state.registerStatus = "success";
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.registerStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const selectProductsByShopId = (state) => state.shop.products;
export const selectProductsByShopIdLoading = (state) => state.shop.loading;
export const selectInfoShop = (state) => state.shop.shopInfo;
export const selectRegisterStatus = (state) => state.shop.registerStatus;

export const { resetProducts } = shopSlice.actions;

export default shopSlice.reducer;
