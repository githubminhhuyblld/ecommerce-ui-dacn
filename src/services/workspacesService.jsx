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