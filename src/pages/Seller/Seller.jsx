import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

import styles from "./Seller.module.scss";
import {
  fetchUserInfo,
  selectUser,
  selectUserLoading,
} from "~/store/reducers/userSlice";
import ShopRegister from "./ShopRegister/ShopRegister";
import ManageLayoutAllProduct from "./ShopProduct/AllProduct/ManageLayoutAllProduct";
import {
  fetchInfoShop,
  fetchProductsByShopId,
  selectInfoShop,
  selectProductsByShopId,
} from "~/store/reducers/shopSlice";
import Header from "~/layouts/components/Header/Header";
import WatingShopRegister from "./WatingShopRegister/WatingShopRegister";
import Footer from "~/layouts/components/Footer/Footer.jsx";
// import { Header as HeaderWrapper } from "~/layouts/components/Header/Header.jsx";
import config from "~/config";

const cx = classNames.bind(styles);

Seller.propTypes = {};

function Seller(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const userId = user !== null && user?.id;
  const shopId = user !== null && user?.shopId;
  const products = useSelector(selectProductsByShopId);
  const shop = useSelector(selectInfoShop);
  console.log(shop);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      Promise.all([
        dispatch(fetchProductsByShopId({ shopId, userId })),
        dispatch(fetchInfoShop({ shopId, userId })),
      ]);
    }
  }, [dispatch, user, shopId, userId]);
  // if (user !== null && shop.activeStatus === 'IN_ACTIVE') {
  //   history.navigate(config.routes.ac);
  // }


  return (
    <div className={cx("wrapper")}>
      {user !== null && user?.shopId === null ? (
        <>
          <Header />
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="flex items-center space-x-2">
                <CircularProgress />
              </div>
            </div>
          ) : (
            <ShopRegister />
          )}
        </>
      ) : user !== null && shop.activeStatus === "IN_ACTIVE" ? (
        <>
          <Header />
          <WatingShopRegister />
          <Footer/>
        </>
      ) : (
        <div>
          <ManageLayoutAllProduct products={products} />
        </div>
      )}
    </div>
  );
}

export default Seller;
