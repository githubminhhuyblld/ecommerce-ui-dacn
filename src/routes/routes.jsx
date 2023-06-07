import config from "~/config";
import Home from "~/pages/Home/Home.jsx";
import Login from "~/pages/Login/Login.jsx";
import Register from "~/pages/Register/Register.jsx";
import ProductDetail from "~/pages/ProductDetail/ProductDetail.jsx";


const publicRoutes = [
    {path: "/", component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.productDetail, component: ProductDetail},
    {path: config.routes.login, component: Login},
    {path: config.routes.register, component: Register},
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
