import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '~/store/reducers/categoriesSlice.js';
import productsReducer from "~/store/reducers/productsSlice.js";
import userReducer from '~/store/reducers/userSlice.js';

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        user: userReducer,
    },
});

export default store;