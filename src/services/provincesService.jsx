import {provinces} from "~/interceptors/axios.jsx";

export const fetchProvinces = async () => {
    return await provinces.get('/?depth=3')
}

export const fetchDistricts = async (provinceCode) => {
    return await provinces.get(`/p/${provinceCode}?depth=3`)
}

export const fetchWards = async (districtCode) => {
    return await provinces.get(`/d/${districtCode}?depth=2`)
}