import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '~/store/reducers/categoriesSlice.js';
import productsReducer from "~/store/reducers/productsSlice.js";

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
    },
});

export default store;