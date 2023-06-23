import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";

import { RiMessengerLine, RiNotification2Line } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { ImMenu } from "react-icons/im";
import Logo from "~/assets/logo/lazadaz.png";
import Avatar from "~/assets/user/avatar.jpg";
import config from "~/config";
import {
  resetUser,
  selectUser,
  setAuthenticated,
} from "~/store/reducers/userSlice";
import { clearCart, setSuccess } from "~/store/reducers/cartsSlice";
import AuthService from "~/services/auth/AuthService";

Header.propTypes = {};

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const user = useSelector(selectUser);

  const fullName = user !== null && user.lastName + user.firstName;
  
  const handleLogout = () => {
    AuthService.logout();
    dispatch(setAuthenticated(false));
    dispatch(setSuccess(false));
    dispatch(clearCart());
    dispatch(resetUser());
    navigate(config.routes.login);
  };
  return (
    <header className=" w-full px-1 sm:px-10 border-b border-gray-200  bg-white shadow">
      <div className="grid grid-cols-12 w-full items-center">
        <div className="col-span-2 ">
          {isTablet ? (
            <ImMenu color="#0d9488" className="w-14 h-14 m-0" />
          ) : (
            <Link to={config.routes.home}>
              <img
                className="sm:object-cover object-cover h-16 w-[160px]"
                src={Logo}
                alt="logo"
              />
            </Link>
          )}
        </div>
        <div className=" col-span-10  flex items-center sm:justify-self-end py-2  space-x-1">
          {/* <Search /> */}
          <div className="flex-row items-center relative">
            <RiMessengerLine
              className=" text-6xl cursor-pointer hover:bg-slate-300 rounded-full"
              color="gray"
            />
            <span className="bg-red-400 text-2xl text-white rounded-full px-2 absolute -top-1 -right-2">
              2
            </span>
          </div>
          <div className="flex-row items-center relative">
            <RiNotification2Line
              className=" text-6xl cursor-pointer hover:bg-slate-300 rounded-full"
              color="gray"
            />
            <span className="bg-red-400 text-2xl text-white rounded-full px-2 absolute -top-1 -right-2">
              2
            </span>
          </div>
          <Tippy
            interactive
            arrow={true}
            offset={[0, 10]}
            placement="bottom-end"
            render={(attrs) => (
              <div
                className="bg-white relative box-shadow py-3 px-8  transition duration-150 ease-linear"
                tabIndex="-1"
                {...attrs}
              >
                <div className=" -top-2 right-4 "></div>
                <div className="flex flex-col">
                  <Link
                    to=""
                    className="text-2xl bg-white hover:text-primary text-gray-950 cursor-pointer block p-3 px-0"
                    href=""
                  >
                    Địa chỉ Shop
                  </Link>
                  <Link
                    //   to={config.routes.post}
                    className="text-2xl  bg-white  hover:text-primary  p-3 px-0  block text-gray-950 cursor-pointer"
                  >
                    Quản lý đơn hàng
                  </Link>
                  <Link
                    className="text-2xl  bg-white  hover:text-primary  p-3 px-0  block  text-gray-950 cursor-pointer"
                    to={config.routes.account}
                  >
                    Quản lý tài khoản
                  </Link>
                  <span
                    className="text-2xl  bg-white  hover:text-primary  p-3 px-0  block  text-gray-950 cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </span>
                </div>
              </div>
            )}
          >
            <div className="flex flex-row items-center space-x-1 px-2 py-1 cursor-pointer hover:bg-slate-300 rounded-full">
              <img
                className="w-14 h-14 bg-slate-300 rounded-full"
                src={user === null ? Avatar : user.image}
                alt="user"
              />
              <span className="text-3xl font-bold text-gray-600 hidden md:block ">
                {fullName}
              </span>
              <FiChevronDown className="md-block hidden " />
            </div>
          </Tippy>
        </div>
      </div>
    </header>
  );
}

export default Header;
