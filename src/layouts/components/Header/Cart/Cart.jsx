import React, { Fragment, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Badge, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Cart.module.scss";
import { IoMdCart } from "react-icons/io";
import config from "~/config";
import {
  clearCart,
  getCartItems,
  selectSuccess,
} from "~/store/reducers/cartsSlice";
import { selectUser } from "~/store/reducers/userSlice";

const cx = classNames.bind(styles);

function Cart(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const success = useSelector(selectSuccess);
  const [cartLength, setCartLength] = useState(0);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 10,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "px 8px",
      fontSize: 16,
    },
  }))(Badge);

  useEffect(() => {
    if (token) {
      dispatch(getCartItems(token.userId)).then((response) => {
        if (response.payload === 404) {
          setCartLength(0);
          dispatch(clearCart());
        } else {
          setCartLength(response.payload?.data?.length);
        }
      });
    } else if (!token) {
      setCartLength(0);
    }
  }, [dispatch, success]);

  return (
    <Fragment>
      {user !== null ? (
        <Link to={config.routes.checkout}>
          <StyledBadge
            badgeContent={cartLength}
            overlap="rectangular"
            color="secondary"
            max={99}
          >
            <span className={cx("cart-wrapper")}>
              <IoMdCart className={cx("cart-icon")} />
            </span>
          </StyledBadge>
        </Link>
      ) : (
        <StyledBadge
          badgeContent={0}
          overlap="rectangular"
          color="secondary"
          max={99}
        >
          <span className={cx("cart-wrapper")}>
            <IoMdCart className={cx("cart-icon")} />
          </span>
        </StyledBadge>
      )}
    </Fragment>
  );
}

export default Cart;
