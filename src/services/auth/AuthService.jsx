import authHeader from "~/services/auth/authHeader.jsx";
import instance from "~/interceptors/axios.jsx";
import jwt_decode from "jwt-decode";

const login = (username, password) => {
    return instance
        .post("/auth/login", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("token", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const register = async (username, password, email, firstName, lastName, numberPhone) => {
    try {
        const response = await instance.post("/auth/signup", {
            username,
            password,
            email,
            firstName,
            lastName,
            numberPhone
        });
        if (response.data.accessToken) {
            return response;
        } else {
            return response
        }

    } catch (error) {
        console.log(error);
    }
}

const getInfoUser = () => {
    return instance.get("/users/me", {headers: authHeader()});
}
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("token"))
}
const logout = () => {
    localStorage.removeItem("token");
};
const isTokenExpired = (token) => {
    if (!token || !token.accessToken) {
        return true;
    }
    const decodedToken = jwt_decode(token.accessToken);
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const expireTime = new Date(decodedToken.exp * 1000);
    const currentTime = new Date();
    return currentTime > expireTime;
};

const getCurrentUserId = () => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    return tokenData ? tokenData.userId : null;
};


const AuthService = {
    login,
    getInfoUser,
    getCurrentUser,
    logout,
    register,
    isTokenExpired,
    getCurrentUserId

};
export default AuthService;