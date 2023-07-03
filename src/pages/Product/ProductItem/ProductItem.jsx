import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { animateScroll as scroll } from "react-scroll";

import styles from "./Product.module.scss";
import { Rating, Skeleton } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { convertCurrency } from "~/untils/convertCurrency.js";
import LanguageContext from "~/context/languageContext";

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
const cx = classNames.bind(styles);

function ProductItem(props) {

  const {languageData} = useContext(LanguageContext);
  const {product_quantity} = languageData;

  const { product } = props;
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product-detail/${product.id}`);
    setTimeout(() => {
      scroll.scrollToTop();
    }, 100);
  };
  const imagesOptions = product?.images?.map((item) => {
    return { id: item.id, original: item.imgUrl, thumbnail: item.imgUrl };
  });

  const renderImageItem = (item) => {
    return (
      <div className={cx("product-original-image")}>
        {item ? (
          <img src={item.original} alt="" />
        ) : (
          <Skeleton
            style={{ padding: 66 }}
            variant="rectangular"
            width={"100%"}
            height={260}
          />
        )}
      </div>
    );
  };
  const renderThumbnailItem = (item) => {
    return item ? (
      <div className={cx("image-gallery-thumbnail")}>
        <img src={item.thumbnail} alt="" />
      </div>
    ) : (
      <Skeleton variant="circular" width={40} height={40} />
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-original-image")}>
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
      <span onClick={handleProductClick} className={cx("product-info")}>
        {product.name ? (
          <h3 className={cx("product-name")}>{product.name}</h3>
        ) : (
          <Skeleton
            variant="text"
            style={{ marginTop: 66 }}
            width="100%"
            height={50}
          />
        )}
        {product.newPrice ? (
          <span className={cx("new-price")}>
            {convertCurrency(product.newPrice)}
          </span>
        ) : (
          <Skeleton variant="text" width="30%" height={40} />
        )}
        {product.sale || product.sale === 0 ? (
          <span className={cx("sale")}>{product.sale}%off</span>
        ) : (
          <Skeleton variant="text" width="30%" height={30} />
        )}
        {product.quantity ? (
          <div className={cx("rating-box")}>
            <span className={cx("quantity")}>{product_quantity}{product.quantity}</span>
            <div className={cx("vote")}>
              <Rating
                name="half-rating-read"
                className={cx("star")}
                defaultValue={parseInt(product.rating)}
                readOnly
              />
            </div>
          </div>
        ) : (
          <Skeleton variant="text" width="100%" height={30} />
        )}
      </span>
    </div>
  );
}

export default ProductItem;
