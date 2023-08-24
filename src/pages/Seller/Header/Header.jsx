import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "@mui/material";
import { Avatar, IconButton } from "@material-ui/core";

import { RiMessengerLine, RiNotification2Line } from "react-icons/ri";
import { FiChevronDown } from "react-icons/fi";
import { ImMenu } from "react-icons/im";
import Logo from "~/assets/logo/lazadaz.png";
import AvatarEmpty from "~/assets/user/avatar.jpg";
import config from "~/config";
import {
  resetUser,
  selectUser,
  setAuthenticated,
} from "~/store/reducers/userSlice";
import { clearCart, clearCartItem, setSuccess } from "~/store/reducers/cartsSlice";
import AuthService from "~/services/auth/AuthService";
import LanguageContext from "~/context/languageContext";
import Language from "~/layouts/components/Header/Language/Language";
import { AiOutlineHome, AiOutlineHeart, AiOutlineLogin } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { BiRegistered } from "react-icons/bi";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbBrandSamsungpass } from "react-icons/tb";

Header.propTypes = {};

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const { languageData } = useContext(LanguageContext);

  const {
    save_more,
    sell_on_lazada,
    care_customer,
    track_order,
    header_signup,
    header_login,
    info_change_password,
    account_information,
    order_information,
    header_user_down_logout,
    sidebar_hello,
    home,
  } = languageData;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const user = useSelector(selectUser);

  const fullName = user !== null && user.lastName + " " + user.firstName;
  const ava = user === null ? AvatarEmpty : user?.image;

  const handleLogout = () => {
    AuthService.logout();
    dispatch(setAuthenticated(false));
    dispatch(setSuccess(false));
    dispatch(clearCart());
    dispatch(resetUser());
    dispatch(clearCartItem())
    localStorage.removeItem("shopInfo");
    navigate(config.routes.login);
    setIsDrawerOpen(false);
  };
  return (
    <header className=" w-full px-1 sm:px-10 border-b border-gray-200  bg-white shadow">
      <div className="grid grid-cols-12 w-full items-center">
        <div className="col-span-2 ">
          {isTablet ? (
            <span className="">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <ImMenu color="#0d9488" className="w-14 h-14 m-0" />
              </IconButton>
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
              >
                <div className="w-[300px] flex flex-col px-2 py-6">
                  <div className="mb-12 flex items-center justify-between px-4">
                    <h3 className="text-2xl text-primary">
                      {" "}
                      {sidebar_hello}:{" "}
                      {user !== null && user?.lastName + " " + user?.firstName}
                    </h3>
                    <Avatar
                      alt="Remy Sharp"
                      src={user !== null ? user?.image : AvatarEmpty}
                      sx={{ width: 22, height: 22 }}
                    />
                  </div>
                  <Link
                    className="text-3xl flex items-center normal-case py-3 px-2 hover:bg-slate-100 mb-2"
                    onClick={() => handleDrawerToggle()}
                    to={config.routes.home}
                  >
                    <AiOutlineHome className="text-3xl mr-3" />
                    {home}
                  </Link>
                  {user === null ? (
                    <>
                      <Link
                        className="text-3xl flex items-center normal-case py-3 px-2 hover:bg-slate-100 mb-2"
                        onClick={() => handleDrawerToggle()}
                        to={config.routes.login}
                      >
                        <AiOutlineLogin className="text-3xl mr-3" />
                        {header_login}
                      </Link>
                      <Link
                        className="text-3xl flex items-center py-3 px-2 hover:bg-slate-100 mb-2"
                        onClick={() => handleDrawerToggle()}
                        to={config.routes.register}
                      >
                        <BiRegistered className="text-3xl mr-3" />
                        {header_signup}
                      </Link>
                    </>
                  ) : (
                    <Link
                      className="text-3xl flex items-center py-3 px-2 hover:bg-slate-100 mb-2"
                      onClick={() => handleDrawerToggle()}
                      to={config.routes.account}
                    >
                      <MdManageAccounts className="text-3xl mr-3" />
                      {account_information}
                    </Link>
                  )}
                  <Link
                    className="text-3xl flex items-center py-3 px-2 hover:bg-slate-100 mb-2"
                    onClick={() => handleDrawerToggle()}
                    to={config.routes.seller}
                  >
                    <BsShop className="text-3xl mr-3" />
                    {sell_on_lazada}
                  </Link>
                  <div className="py-3 flex items-center px-2">
                    <CgArrowsExchangeAlt className="text-3xl mr-3" />
                    <Language isTablet={true} />
                  </div>
                  <Link
                    className="text-3xl flex items-center  py-3 px-2 hover:bg-slate-100 mb-2"
                    onClick={() => handleDrawerToggle()}
                    to={config.routes.infoOrder}
                  >
                    <AiOutlineHeart className="text-3xl mr-3" />
                    {order_information}
                  </Link>
                  <Link
                    className="text-3xl flex items-center  py-3 px-2 hover:bg-slate-100 mb-2"
                    onClick={() => handleDrawerToggle()}
                    to={config.routes.updatePassword}
                  >
                    <TbBrandSamsungpass className="text-3xl mr-3" />
                    {info_change_password}
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="py-3 text-3xl   flex items-center px-2 cursor-pointer hover:bg-slate-100 "
                  >
                    <RiLogoutCircleRLine className="text-3xl mr-3 " />
                    {header_user_down_logout}
                  </span>
                </div>
              </Drawer>
            </span>
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
            <span className="bg-red-400 text-2xl text-white rounded-full px-2 absolute -top-1 -right-2"></span>
          </div>
          <div className="flex-row items-center relative">
            <RiNotification2Line
              className=" text-6xl cursor-pointer hover:bg-slate-300 rounded-full"
              color="gray"
            />
            <span className="bg-red-400 text-2xl text-white rounded-full px-2 absolute -top-1 -right-2"></span>
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
                    to={config.routes.editShop}
                    className="text-2xl bg-white hover:text-primary text-gray-950 cursor-pointer block p-3 px-0"
                  >
                    Địa chỉ Shop
                  </Link>
                  <Link
                    to={config.routes.allOrder}
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
                src={ava}
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
