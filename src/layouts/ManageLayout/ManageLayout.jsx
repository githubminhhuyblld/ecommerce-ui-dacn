import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

import styles from "./ManageLayout.module.scss";
import { BiDownArrowCircle } from "react-icons/bi";
import { FaHeart,FaUserCheck  } from "react-icons/fa";
import config from "~/config";
import AuthService from "~/services/auth/AuthService";
import { setAuthenticated } from "~/store/reducers/userSlice";
import Header from "~/pages/Seller/Header/Header";
import { CiLocationOn } from "react-icons/ci";

const cx = classNames.bind(styles);

ManageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function ManageLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (AuthService.isTokenExpired(token)) {
      dispatch(setAuthenticated(false));
      AuthService.logout();
      navigate(config.routes.login);
    }
  }, [token]);

  const categories = [
    {
      id: 1,
      label: "Quản lý Đơn hàng",
      icon: <FaHeart />,
      items: [
        {
          name: "Thống kê đơn hàng",
          to: config.routes.orderTrend,
        },
        {
          name: "Thống kê doanh thu",
          to: config.routes.salesOrder,
        },
        {
          name: "Tất cả Đơn hàng",
          to: config.routes.allOrder,
        },
        {
          name: "Tất cả chưa thanh toán",
          to: config.routes.unpaidOrder,
        },
        {
          name: "Đơn hàng chờ xác nhận",
          to: config.routes.processingOrder,
        },
        {
          name: "Đơn hàng đang giao",
          to: config.routes.readyOrder,
        },
        {
          name: "Đơn hàng hủy",
          to: config.routes.cancelOrder,
        },

        {
          name: "Đơn hàng mới nhất",
          to: config.routes.lastedOrder,
        },
      ],
    },
    {
      id: 2,
      label: "Quản lý Sản phẩm",
      icon: <BiDownArrowCircle />,
      items: [
        {
          name: "Tất cả sản phẩm",
          to: config.routes.seller,
        },
        {
          name: "Thêm sản phẩm",
          to: config.routes.addProduct,
        },
      ],
    },
    {
      id: 3,
      label: "Quản lý khách hàng",
      icon: <FaUserCheck />,
      items: [
        {
          name: "Tất cả khách hàng",
          to: config.routes.allCustomer,
        },
        
      ],
    },
    {
      id: 4,
      label: "Địa chỉ Shop",
      icon: <CiLocationOn />,
      items: [
        {
          name: "Địa chỉ",
          to: config.routes.editShop,
        },
      ],
    },
  ];

  return (
    <div className="">
      <Header />
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar defaultCollapsed={isTablet} collapsedWidth="50px">
          <Menu
            rootStyles={{
              backgroundColor: "#0d9488",
              color: "#333",
            }}
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#f57224",
                    backgroundColor: active ? "rgba(10,104,255)" : "#fff",
                  };
              },
            }}
          >
            {categories.map((category, index) => {
              return (
                <SubMenu
                  label={category.label}
                  defaultOpen={!isTablet}
                  className="text-2xl "
                  key={category.id}
                  icon={category.icon}
                >
                  {category.items.map((item, index) => {
                    return (
                      <MenuItem
                        className="text-2xl"
                        key={index}
                        component={<Link to={item.to} />}
                        active={window.location.pathname === item.to}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </Sidebar>
        <main style={{ padding: 10, width: "100%" }}>{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default ManageLayout;
