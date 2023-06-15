import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Cart.module.scss";
import { IoMdCart } from "react-icons/io";
import config from "~/config";
import {
  getCartItems,
  selectCartItems,
  selectSuccess,
  setSuccess,
} from "~/store/reducers/cartsSlice";
import { selectUser } from "~/store/reducers/userSlice";
import { getAllCartsByUserId } from "~/services/workspacesService";

Cart.propTypes = {};
const cx = classNames.bind(styles);

function Cart(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const success = useSelector(selectSuccess);
  const [cartLength, setCartLength] = useState(0);
  const [cartItems, setCartItems] = useState(null);
  const carts = useSelector(selectCartItems);

  useEffect(() => {
    // if (token) {
    //   getAllCartsByUserId(token.userId).then((res) => {
    //     if (res !== null) {
    //       setCartItems(res);
    //       setCartLength(res?.data[0]?.cartItems?.length);
    //     } else {
    //       setCartLength(0);
    //     }
    //   });
    // } else if (!token) {
    //   setCartLength(0);
    // }
    if (token) {
      dispatch(getCartItems(token.userId)).then((response) => {
        setCartLength(response.payload?.data[0]?.cartItems?.length);
      });
    } else if (!token) {
      setCartLength(0);
    }
  }, [dispatch, success]);
  // console.log(carts);
  // console.log(success);
  return (
    <Fragment>
      {user !== null ? (
        <Link to={config.routes.checkout}>
          <div className={cx("wrapper")}>
            <Badge color="secondary" badgeContent={cartLength} max={99}>
              <span className={cx("cart-wrapper")}>
                <IoMdCart className={cx("cart-icon")} />
              </span>
            </Badge>
          </div>
        </Link>
      ) : (
        <span to={""}>
          <div className={cx("wrapper")}>
            <Badge color="secondary" badgeContent={cartLength} max={99}>
              <span className={cx("cart-wrapper")}>
                <IoMdCart className={cx("cart-icon")} />
              </span>
            </Badge>
          </div>
        </span>
      )}
    </Fragment>
  );
}

export default Cart;
