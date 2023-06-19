import {provinces} from "~/interceptors/axios.jsx";

export const fetchProvinces = async () => {
    return await provinces.get('/?depth=3')
}