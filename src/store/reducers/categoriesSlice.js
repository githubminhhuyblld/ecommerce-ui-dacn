import { createSlice } from "@reduxjs/toolkit";
import {fetchCategories} from "~/services/workspacesService.jsx";


const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const categoriesSlice  = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },


});



export default categoriesSlice.reducer;

export const selectCategories = (state) => state.categories.data;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;
