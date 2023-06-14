import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import styles from "./Product.module.scss";
import {Skeleton} from '@mui/material';
import {AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import {convertCurrency} from "~/untils/convertCurrency.js";

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
};
const cx = classNames.bind(styles);

function ProductItem(props) {
    const {product} = props
    const imagesOptions = product?.images?.map((item) => {
        return {id: item.id, original: item.imgUrl, thumbnail: item.imgUrl};
    });


    const renderImageItem = (item) => {
        return (
            <div className={cx('product-original-image')}>
                {
                    item ? (

                        <img src={item.original} alt=""/>

                    ) : (
                        <Skeleton style={{padding: 66}} variant="rectangular" width={"100%"} height={260}/>
                    )
                }

            </div>
        );
    };
    const renderThumbnailItem = (item) => {
        return (

            item ? (
                <div className={cx("image-gallery-thumbnail")}>
                    <img
                        src={item.thumbnail}
                        alt=""
                    />
                </div>
            ) : (
                <Skeleton variant="circular" width={40} height={40}/>
            )

        );
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-original-image')}>
                <ReactImageGallery
                    items={imagesOptions}
                    renderItem={renderImageItem}
                    renderThumbInner={renderThumbnailItem}
                    additionalClass="custom-gallery"
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    autoPlay={false}
                />

            </div>
            <Link to={`/product-detail/${product.id}`} className={cx('product-info')}>

                {product.name ? (
                    <h3 className={cx('product-name')}>{product.name}</h3>
                ) : (
                    <Skeleton
                        variant="text"
                        style={{marginTop: 66}}
                        width="100%"
                        height={50}
                    />
                )}
                {product.newPrice ? (
                    <span className={cx('new-price')}>{convertCurrency(product.newPrice)}</span>
                ) : (
                    <Skeleton
                        variant="text"
                        width="30%"
                        height={40}
                    />
                )}
                {product.sale ? (
                    <span className={cx('sale')}>{product.sale}%off</span>
                ) : (
                    <Skeleton
                        variant="text"
                        width="30%"
                        height={30}
                    />
                )}
                {product.quantity ? (
                    <div className={cx('rating-box')}>
                        <span className={cx('quantity')}>Số lượng:{product.quantity}</span>
                        <div className={cx('vote')}>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <span className={cx('rating')}>(5)</span>
                        </div>
                    </div>
                ) : (
                    <Skeleton
                        variant="text"
                        width="100%"
                        height={30}
                    />
                )}


            </Link>
        </div>

    );
}

export default ProductItem;