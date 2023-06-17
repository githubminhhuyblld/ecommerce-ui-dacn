import config from "~/config";
import Home from "~/pages/Home/Home.jsx";
import Login from "~/pages/Login/Login.jsx";
import Register from "~/pages/Register/Register.jsx";
import ProductDetail from "~/pages/ProductDetail/ProductDetail.jsx";
import Product from "~/pages/Product/Product.jsx";
import Account from "~/pages/Account/Account.jsx";
import InfoOrder from "~/pages/InfoOrder/InfoOrder";
import Checkout from "~/pages/Checkout/Checkout";
import Order from "~/pages/Order/Order";
import EditAddress from "~/pages/EditAddress/EditAddress";



const publicRoutes = [
    {path: "/", component: Home},
    {path: config.routes.home, component: Home},
    {path: config.routes.productDetail, component: ProductDetail},
    {path: config.routes.login, component: Login},
    {path: config.routes.register, component: Register},
    {path: config.routes.product, component: Product},
    {path: config.routes.account, component: Account},
    {path: config.routes.infoOrder, component: InfoOrder},
    {path: config.routes.checkout, component: Checkout},
    {path: config.routes.order, component: Order},
    {path: config.routes.editAddress, component: EditAddress},
];
const privateRoutes = [];
export {publicRoutes, privateRoutes};
