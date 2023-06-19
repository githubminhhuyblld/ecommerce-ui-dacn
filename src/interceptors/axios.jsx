import axios from "axios";
// const BASE_URL = process.env.REACT_APP_PUBLIC_URL
const BASE_URL = "http://localhost:8087/api/v1";
const PROVINCES_URL = "https://provinces.open-api.vn/api";
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
});
export const provinces = axios.create({
    baseURL: PROVINCES_URL,
    headers: {"Content-Type": "application/json"},
});
instance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        const {headers} = config;
        return {
            ...config,
            headers: {
                ...headers,
                "Access-Token": `Token ${accessToken}`,
            },
        };
    }
    return config;
});
export default instance;
