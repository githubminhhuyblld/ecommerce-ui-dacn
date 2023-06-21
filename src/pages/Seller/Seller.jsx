import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import styles from "./Seller.module.scss";
import { selectUser } from "~/store/reducers/userSlice";
import ShopRegister from "./ShopRegister/ShopRegister";

const cx = classNames.bind(styles);

Seller.propTypes = {};

function Seller(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={cx("wrapper")}>
      <ShopRegister />
    </div>
  );
}

export default Seller;
