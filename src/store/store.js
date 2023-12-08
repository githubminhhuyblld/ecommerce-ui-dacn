import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import categoriesReducer from '~/store/reducers/categoriesSlice.js';
import productsReducer from "~/store/reducers/productsSlice.js";
import userReducer from '~/store/reducers/userSlice.js';
import productsCategoryReducer from '~/store/reducers/ProductsCategorySlice.js';
import searchReducer from '~/store/reducers/searchSlice.js';
import cartReducer from '~/store/reducers/cartsSlice.js';
import locationReducer from '~/store/reducers/locationSlice.js';
import orderReducer from '~/store/reducers/orderSlice.js';
import shopReducer from '~/store/reducers/shopSlice';
import paymentReducer from '~/store/reducers/paymentSlice';
import commentReducer from '~/store/reducers/commentSlice';
import customerReducer from '~/store/reducers/customerSlice';



const middleware = getDefaultMiddleware({
    serializableCheck: false,

});

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        products: productsReducer,
        user: userReducer,
        productsCategory: productsCategoryReducer,
        search: searchReducer,
        cart: cartReducer,
        location: locationReducer,
        order:orderReducer,
        shop: shopReducer,
        payment:paymentReducer,
        comment:commentReducer,
        customer:customerReducer
    },
    middleware,
});

export default store;