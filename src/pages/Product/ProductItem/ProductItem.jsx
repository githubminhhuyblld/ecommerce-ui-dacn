import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import styles from "./Product.module.scss";
import Product from "~/assets/product/product1.jpg"
import {Card} from "@mui/material";
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";

ProductItem.propTypes = {};
const cx = classNames.bind(styles);

function ProductItem(props) {
    const images = [
        {
            original: Product,
            thumbnail: Product,

        },
        {
            original: Product,
            thumbnail: Product,

        },
        {
            original: Product,
            thumbnail: Product,

        },
    ];
    const renderImageItem = (item) => {
        return (
            <div className={cx('product-original-image')}>
                <img src={item.original} alt=""/>
            </div>
        );
    };
    const renderThumbnailItem = (item) => {
        return (
            <div className={cx("image-gallery-thumbnail")}>
                <img
                    src={item.thumbnail}
                    alt=""
                />
            </div>
        );
    };
    return (
        <Link to={""} className={cx("wrapper")}>
            <div className={cx("product-original-image")}>
                <ReactImageGallery
                    items={images}
                    renderItem={renderImageItem}
                    renderThumbInner={renderThumbnailItem}
                    additionalClass="custom-gallery"
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={false}
                />
            </div>
            <div className={cx("product-info")}>
                <h3 className={cx("product-name")}>Điện thoại Xiaomi Redmi Note 10 JE 5G 4GB l 64GB - Chip Snapdragon
                    480 - Chống nước IP68 - Camera AI
                    - Sạc nhanh 18W - Mới nguyên seal
                </h3>
                <span className={cx("new-price")}>509.000đ</span>
                <span className={cx("sale")}>44%off</span>
                <div className={cx('rating-box')}>
                    <span className={cx("quantity")}>36 đã bán</span>
                    <div className={cx("vote")}>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <span className={cx("rating")}>(5)</span>
                    </div>
                </div>
            </div>
        </Link>

    );
}

export default ProductItem;