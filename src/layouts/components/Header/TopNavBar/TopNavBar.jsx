import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import { Avatar } from "@material-ui/core";

import styles from "./TopNavBar.module.scss";
import config from "~/config/index.jsx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import AvatarEmpty from "~/assets/user/avatar.jpg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbBrandSamsungpass } from "react-icons/tb";
import {
  fetchUserInfo,
  selectUser,
  setAuthenticated,
  resetUser,
} from "~/store/reducers/userSlice.js";
import AuthService from "~/services/auth/AuthService.jsx";
import { clearCart, clearCartItem, setSuccess } from "~/store/reducers/cartsSlice";
import { selectSuccessAddress } from "~/store/reducers/locationSlice";
import LanguageContext from "~/context/languageContext";
import Language from "~/layouts/components/Header/Language/Language.jsx";
import { AiOutlineHome, AiOutlineHeart, AiOutlineLogin } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { BiRegistered } from "react-icons/bi";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const cx = classNames.bind(styles);

TopNavBar.propTypes = {
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
};

function TopNavBar(props) {
  const { isDrawerOpen, handleDrawerToggle,setIsDrawerOpen } = props;
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const successAddress = useSelector(selectSuccessAddress);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token && token.accessToken) {
      if (AuthService.isTokenExpired(token)) {
        dispatch(setAuthenticated(false));
        AuthService.logout();
      } else {
        dispatch(setAuthenticated(true));
      }
    }

    dispatch(fetchUserInfo());
  }, [dispatch, successAddress]);

  const handleLogout = () => {
    AuthService.logout();
    dispatch(setAuthenticated(false));
    dispatch(setSuccess(false));
    dispatch(clearCart());
    dispatch(resetUser());
    dispatch(clearCartItem())
    localStorage.removeItem("shopInfo");
    navigate(config.routes.login);
    setIsDrawerOpen(false)
  };

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

  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("top-navbar-content")}>
          <span className={cx("top-navbar-item")}>{save_more}</span>
          <Link to={config.routes.seller}>
            <span className={cx("top-navbar-item")}>{sell_on_lazada}</span>
          </Link>
          {isDesktop && (
            <span className={cx("top-navbar-item")}>{care_customer}</span>
          )}
          <span className={cx("top-navbar-item")}>{track_order}</span>

          {isDesktop && <Language />}
          {!isAuthenticated ? (
            <>
              <Link to={config.routes.login}>
                <span className={cx("top-navbar-item")}>{header_login}</span>
              </Link>
              <Link to={config.routes.register}>
                <span className={cx("top-navbar-item")}>{header_signup}</span>
              </Link>
            </>
          ) : (
            <Tippy
              interactive
              offset={[12, 1]}
              render={(attrs) => (
                <div className={cx("dropdown")} tabIndex="-1" {...attrs}>
                  <Link to={config.routes.account}>
                    <span className={cx("dropdown-item")}>
                      <FiUserPlus />
                      {account_information}
                    </span>
                  </Link>
                  <Link to={config.routes.infoOrder}>
                    <span className={cx("dropdown-item")}>
                      <MdOutlineFavoriteBorder />
                      {order_information}
                    </span>
                  </Link>
                  <Link to={config.routes.updatePassword}>
                    <span className={cx("dropdown-item")}>
                      <TbBrandSamsungpass />
                      {info_change_password}
                    </span>
                  </Link>
                  <span onClick={handleLogout} className={cx("dropdown-item")}>
                    <RiLogoutCircleRLine />
                    {header_user_down_logout}
                  </span>
                </div>
              )}
            >
              <span className={cx("top-navbar-item")}>
                {sidebar_hello}:{" "}
                {user !== null && user?.lastName + " " + user?.firstName}
              </span>
            </Tippy>
          )}
        </div>
      </Container>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
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
          {!isAuthenticated ? (
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
    </div>
  );
}

export default TopNavBar;
