import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";


import styles from "./Seller.module.scss";
import { fetchUserInfo, selectUser } from "~/store/reducers/userSlice";
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

const cx = classNames.bind(styles);

Seller.propTypes = {};

function Seller(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
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

  return (
    <div className={cx("wrapper")}>
      {user !== null && user?.shopId === null ? (
        <>
          <Header />
          <ShopRegister />
        </>
      ) : user !== null &&
        shop.length > 0 &&
        shop.activeStatus === "IN_ACTIVE" ? (
        <WatingShopRegister />
      ) : (
        <div>
          <ManageLayoutAllProduct products={products} />
        </div>
      )}
    </div>
  );
}

export default Seller;
