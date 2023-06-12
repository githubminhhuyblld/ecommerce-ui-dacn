import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import instance from "~/interceptors/axios.jsx";

export const fetchProductsByCategoryId = createAsyncThunk(
    'products/fetchByCategoryId',
    async (categoryId) => {
        const response = await instance.get(`/products/${categoryId}/category`);
        return response.data.data;
    }
);
const initialState = {
    data: [],
    loading: false,
    error: null,
};
export const productsCategorySlice = createSlice({
    name: "productsCategory",
    initialState,
    reducers: {
        resetData: (state) => {
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategoryId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },


});
export const selectProductsCategory = (state) => state.productsCategory.data;
export const selectLoadingCategory = (state) => state.productsCategory.loading;
export const selectErrorCategory = (state) => state.productsCategory.error;
export const {resetData} = productsCategorySlice.actions;

export default productsCategorySlice.reducer;
