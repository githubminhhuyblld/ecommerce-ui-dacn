import instance from "~/interceptors/axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import authHeader from "./auth/authHeader";
import { debounce } from "@material-ui/core";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await instance.get('/categories');
        return response.data;
    }
);
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (maxResult) => {
        const response = await instance.get(`/products?maxResult=${maxResult}`);
        return response.data;
    }
);
export const fetchProductsByCategoryId = createAsyncThunk(
    'products/fetchByCategoryId',
    async ({categoryId, page, size}) => {
        const response = await instance.get(`/products/${categoryId}/category?page=${page}&size=${size}`);
        return response.data;
    }
);

export const searchProducts = createAsyncThunk(
    'products/search',
    async ({page, search, size}) => {
        try {
            const response = await instance.get(`/products/search?page=${page}&search=${search}&size=${size}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);
export const getAllCartsByUserId = async (userId) => {
    const result = await instance.get(`/cart/${userId}`, {headers: authHeader()})
    return result.data
};
export const getProductBySearch = async ({page, search, size}) => {
    const response = await instance.get(`/products/search?page=${page}&search=${search}&size=${size}`)
    return response.data
}
export const getProductById = async (id) => {
    const response = await instance.get(`/products/${id}`)
    return response.data
}
export const checkUsernameExists = async (username) => {
    return await instance.get(`/users/check-username?username=${username}`)
}
export const checkEmailExists = async (email) => {
    return await instance.get(`/users/check-email?email=${email}`)
}
export const loginGoogleService = async (body) => {
    return await instance.post(`/google/login`, body)
}
export const checkShopNameDebounced = async (value) => {
    return await instance.get(`/shops/check-name?name=${value}`)
}

