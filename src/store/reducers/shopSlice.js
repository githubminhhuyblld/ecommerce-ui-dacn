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
      const response = await instance.get(
        `/shops/${shopId}?userId=${userId}`,
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
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: [],
    shopInfo:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByShopId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchProductsByShopId.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchProductsByShopId.rejected, (state, action) => {
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
    });
  },
});

export const selectProductsByShopId = (state) => state.shop.products;
export const selectProductsByShopIdLoading = (state) => state.shop.loading;
export const selectInfoShop = (state) => state.shop.shopInfo;

export default shopSlice.reducer;
