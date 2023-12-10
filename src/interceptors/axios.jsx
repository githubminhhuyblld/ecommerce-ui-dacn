import axios from "axios";

export const BASE_URL = "https://ecommerce-dacn.site:8443/ecommerce-api/api/v1";
// export const BASE_URL = "https://ecommerce-dacn-service.onrender.com/ecommerce-api/api/v1"
// export const BASE_URL= "http://localhost:8087/ecommerce-api/api/v1"

const PROVINCES_URL = "https://provinces.open-api.vn/api";
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const provinces = axios.create({
  baseURL: PROVINCES_URL,
  headers: { "Content-Type": "application/json" },
});
instance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    const { headers } = config;
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
