import instance from "~/interceptors/axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

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