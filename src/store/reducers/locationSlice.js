import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance, { provinces } from "~/interceptors/axios";
import authHeader from "~/services/auth/authHeader";

export const fetchProvinces = createAsyncThunk(
  "location/fetchProvinces",
  async (_, { rejectWithValue }) => {
    try {
      const response = await provinces.get("/p");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDistricts = createAsyncThunk(
  "location/fetchDistricts",
  async (provinceId, { rejectWithValue }) => {
    try {
      const response = await provinces.get(`/p/${provinceId}?depth=3`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchWards = createAsyncThunk(
  "location/fetchWards",
  async (districtId, { rejectWithValue }) => {
    try {
      const response = await provinces.get(`/d/${districtId}?depth=2`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchInfoAddressById = createAsyncThunk(
  "location/fetchInfoAddressById",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/users/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateAddressById = createAsyncThunk(
  "location/updateAddressById",
  async ({ addressId,userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        `/users/${userId}/addresses?id=${addressId}`,
        body
      );
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "location/addAddress",
  async ({ userId, body }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/users/${userId}/addresses`, body);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    address: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
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
        state.error = null;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchInfoAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfoAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.address = action.payload;
      })
      .addCase(fetchInfoAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});
export default locationSlice.reducer;

export const selectProvinces = (state) => state.location.provinces;
export const selectDistricts = (state) => state.location.districts;
export const selectWards = (state) => state.location.wards;
export const selectAddressById = (state) => state.location.address;
export const selectLoading = (state) => state.location.loading;
export const selectError = (state) => state.location.error;
export const selectSuccessAddress = (state) => state.location.success;
export const { setSuccess } = locationSlice.actions;
