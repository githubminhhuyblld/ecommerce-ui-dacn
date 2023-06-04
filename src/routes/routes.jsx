import config from "~/config";
import Home from "~/pages/Home/Home.jsx";
import Login from "~/pages/Login/Login.jsx";
import Register from "~/pages/Register/Register.jsx";


const publicRoutes = [
  { path: "/", component: Home },
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
