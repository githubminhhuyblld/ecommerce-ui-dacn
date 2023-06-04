import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";


import styles from "./ProductDetail.module.scss";

const cx = classNames.bind(styles);

ProductDetail.propTypes = {

};

function ProductDetail(props) {
    return (
        <div className={cx('wrapper')}>
            <h3>Product Detail</h3>
        </div>
    );
}

export default ProductDetail;