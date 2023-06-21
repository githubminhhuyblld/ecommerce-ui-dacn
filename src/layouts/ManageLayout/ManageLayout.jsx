import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import styles from "./ManageLayout.module.scss";
import { BiDownArrowCircle } from "react-icons/bi";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import config from "~/config";

const cx = classNames.bind(styles);

ManageLayout.propTypes = {
  children:PropTypes.node.isRequired,
};

function ManageLayout({ children }) {
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const categories = [
    {
      id: 1,
      label: "Quản lý Tài khoản",
      icon: <BiDownArrowCircle />,
      items: [
        {
          name: "Tất cả tài khoản",
          to: "",
        },
      ],
    },
    {
      id: 2,
      label: "Quản lý bài Post",
      icon: <FaHeart />,
      items: [
        {
          name: "Tất cả bài Post",
          to: "",
        },
      ],
    },
  ];

  return (
    <div className="">
      {/* <Header /> */}
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
                  className="text-3xl "
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
