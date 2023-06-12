import { createSlice } from "@reduxjs/toolkit";
import {fetchProducts} from "~/services/workspacesService.jsx";



const productsSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});
export const selectProducts = (state) => state.products.data;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

export default productsSlice.reducer;
