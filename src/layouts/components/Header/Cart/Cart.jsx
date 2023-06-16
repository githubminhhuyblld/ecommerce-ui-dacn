import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Cart.module.scss";
import { IoMdCart } from "react-icons/io";
import config from "~/config";
import { getCartItems, selectSuccess } from "~/store/reducers/cartsSlice";
import { selectUser } from "~/store/reducers/userSlice";

Cart.propTypes = {};
const cx = classNames.bind(styles);

function Cart(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const success = useSelector(selectSuccess);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(getCartItems(token.userId)).then((response) => {
        setCartLength(response.payload?.data[0]?.cartItems?.length);
      });
    } else if (!token) {
      setCartLength(0);
    }
  }, [dispatch, success]);

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
