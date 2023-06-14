import {createSlice} from '@reduxjs/toolkit';
import {searchProducts} from "~/services/workspacesService.jsx";

const initialState = {
    data: [],
    loading: false,
    error: null,
};
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        resetData: (state) => {
            state.data = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const selectSearchResults = (state) => state.search.data;
export const selectSearchResultsForSearchBox = (state) => state.search.data;
export const selectSearchLoadingForSearchBox = (state) => state.search.loading;
export const selectSearchErrorForSearchBox = (state) => state.search.error;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const {resetData} = searchSlice.actions;
export default searchSlice.reducer;