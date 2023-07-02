import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Tippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TopNavBar.module.scss";
import config from "~/config/index.jsx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbBrandSamsungpass } from "react-icons/tb";
import {
  fetchUserInfo,
  selectUser,
  setAuthenticated,
  resetUser,
} from "~/store/reducers/userSlice.js";
import AuthService from "~/services/auth/AuthService.jsx";
import { clearCart, setSuccess } from "~/store/reducers/cartsSlice";
import { selectSuccessAddress } from "~/store/reducers/locationSlice";
import LanguageContext from "~/context/languageContext";
import Language from "~/layouts/components/Header/Language/Language.jsx";

const cx = classNames.bind(styles);

TopNavBar.propTypes = {};

function TopNavBar(props) {
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
    localStorage.removeItem("shopInfo");
    navigate(config.routes.login);
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
    </div>
  );
}

export default TopNavBar;
