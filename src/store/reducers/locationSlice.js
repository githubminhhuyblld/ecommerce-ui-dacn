import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const fetchProvinces = createAsyncThunk(
    "location/fetchProvinces",
    async () => {
      const response = await instance.get(
        "/provinces"
      );
      return response.data.data;
    }
  );
  
  export const fetchDistricts = createAsyncThunk(
    "location/fetchDistricts",
    async (provinceId) => {
      const response = await instance.get(
        `/${provinceId}/districts`
      );
      return response.data.data;
    }
  );
  export const fetchWards = createAsyncThunk(
    "location/fetchWards",
    async (districtId) => {
      const response = await instance.get(
        `/${districtId}/wards`
      );
      return response.data.data;
    }
  );
  const locationSlice = createSlice({
    name: "location",
    initialState: {
      provinces: [],
      districts: [],
      wards: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProvinces.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProvinces.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.provinces = action.payload;
        })
        .addCase(fetchProvinces.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchDistricts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDistricts.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.districts = action.payload;
        })
        .addCase(fetchDistricts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchWards.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchWards.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.wards = action.payload;
        })
        .addCase(fetchWards.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  export default locationSlice.reducer;


  export const selectProvinces = (state) => state.location.provinces;
  export const selectDistricts = (state) => state.location.districts;
  export const selectWards = (state) => state.location.wards;
  export const selectLoading = (state) => state.location.loading;
  export const selectError = (state) => state.location.error;  
  
  