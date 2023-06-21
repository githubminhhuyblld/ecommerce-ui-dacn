import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Seller.module.scss";
import { selectUser } from "~/store/reducers/userSlice";

const cx = classNames.bind(styles);

Seller.propTypes = {};

function Seller(props) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log(user);
  return (
    <div className={cx("wrapper")}>
      <Container>
        <h3 className="text-5xl py-20 text-primary">Đăng ký bán hàng cùng Lazada</h3>
      </Container>
    </div>
  );
}

export default Seller;
