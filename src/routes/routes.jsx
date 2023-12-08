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
import Seller from "~/pages/Seller/Seller";
import WatingShopRegister from "~/pages/Seller/WatingShopRegister/WatingShopRegister";
import ManageLayoutAddProduct from "~/pages/Seller/ShopProduct/AddProduct/ManageLayoutAddProduct";
import ManageLayoutEditProduct from "~/pages/Seller/ShopProduct/EditProduct/ManageLayoutEditProduct";
import EditProfile from "~/pages/EditProfile/EditProfile.jsx";
import ManageLayoutAllOrder from "~/pages/Seller/ShopOrder/AllOrder/ManageLayoutAllOrder";
import CreateAddressPage from "~/pages/CreateAddressPage/CreateAddressPage";
import ManageLayoutCanelOrders from "~/pages/Seller/ShopOrder/CancelOrder/ManageLayoutCanelOrders";
import ManageLayoutProcessingOrders from "~/pages/Seller/ShopOrder/ProcessingOrder/ManageLayoutProcessingOrders";
import ManageLayoutLastedOrder from "~/pages/Seller/ShopOrder/LastedOrder/ManageLayoutLastedOrder";
import ManageLayoutReadyOrders from "~/pages/Seller/ShopOrder/ReadyOrder/ManageLayoutReadyOrders";
import ManageLayoutUnpaidOrder from "~/pages/Seller/ShopOrder/UnpaidOrder/ManageLayoutUnpaidOrder";
import ManageLayoutEditShop from "~/pages/Seller/EditShop/ManageLayoutEditShop";
import UpdatePassword from "~/pages/UpdatePassword/UpdatePassword";
import VNPayment from "~/pages/VNPayment/VNPayment";
import ManageLayoutOrderTrend from "~/pages/Seller/ShopOrder/OrderTrend/ManageLayoutOrderTrend";
import ManageLayoutSalesOrder from "~/pages/Seller/ShopOrder/SalesOrder/ManageLayoutSaleOrders";
import ManageLayoutAllCustomer from "~/pages/Seller/Customer/AllCustomer/ManageLayoutAllCustomer";
import ManageLayoutHistoryOrder from "~/pages/Seller/Customer/HistoryOrder/ManageLayoutHistoryOrder";

const publicRoutes = [
  { path: "/", component: Home },
  { path: config.routes.home, component: Home },
  { path: config.routes.productDetail, component: ProductDetail },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  { path: config.routes.product, component: Product },
  { path: config.routes.account, component: Account },
  { path: config.routes.infoOrder, component: InfoOrder },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.order, component: Order },
  { path: config.routes.editAddress, component: EditAddress },
  { path: config.routes.editProfile, component: EditProfile },
  { path: config.routes.updatePassword, component: UpdatePassword },
  { path: config.routes.createAddress, component: CreateAddressPage },
  { path: config.routes.seller, component: Seller, layout: null },
  { path: config.routes.activeAddress, component: WatingShopRegister },
  { path: config.routes.vnpayPayment, component: VNPayment },
  {
    path: config.routes.addProduct,
    component: ManageLayoutAddProduct,
    layout: null,
  },
  {
    path: config.routes.editProduct,
    component: ManageLayoutEditProduct,
    layout: null,
  },
  {
    path: config.routes.orderTrend,
    component: ManageLayoutOrderTrend,
    layout: null,
  },
  {
    path: config.routes.salesOrder,
    component: ManageLayoutSalesOrder,
    layout: null,
  },
  {
    path: config.routes.allOrder,
    component: ManageLayoutAllOrder,
    layout: null,
  },
  {
    path: config.routes.cancelOrder,
    component: ManageLayoutCanelOrders,
    layout: null,
  },
  {
    path: config.routes.unpaidOrder,
    component: ManageLayoutUnpaidOrder,
    layout: null,
  },
  {
    path: config.routes.readyOrder,
    component: ManageLayoutReadyOrders,
    layout: null,
  },
  {
    path: config.routes.processingOrder,
    component: ManageLayoutProcessingOrders,
    layout: null,
  },
  {
    path: config.routes.historyOrder,
    component: ManageLayoutHistoryOrder,
    layout: null,
  },
  {
    path: config.routes.lastedOrder,
    component: ManageLayoutLastedOrder,
    layout: null,
  },
  {
    path: config.routes.editShop,
    component: ManageLayoutEditShop,
    layout: null,
  },
  {
    path: config.routes.allCustomer,
    component: ManageLayoutAllCustomer,
    layout: null,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
