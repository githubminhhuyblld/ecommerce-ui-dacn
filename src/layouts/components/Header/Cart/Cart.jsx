import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Badge} from "@mui/material";

import styles from "./Cart.module.scss";
import {IoMdCart} from "react-icons/io";

Cart.propTypes = {

};
const cx = classNames.bind(styles);

function Cart(props) {
    return (
        <div className={cx('wrapper')}>
            <Badge color="secondary" badgeContent={1000} max={999}>
               <span className={cx('cart-wrapper')}>
                <IoMdCart className={cx('cart-icon')}/>
            </span>
            </Badge>

        </div>
    );
}

export default Cart;