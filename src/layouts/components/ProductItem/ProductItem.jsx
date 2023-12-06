import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, Skeleton } from "@mui/material";
import { animateScroll as scroll } from "react-scroll";

import styles from "./ProductItem.module.scss";
import { convertCurrency } from "~/untils/convertCurrency.js";
import { selectLoading } from "~/store/reducers/productsSlice.js";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductItem(props) {
  const { languageData } = useContext(LanguageContext);
  const { quantity_remaining } = languageData;

  const { product } = props;
  const loading = useSelector(selectLoading);
  const handleProductClick = () => {
    scroll.scrollToTop();
  };
  if (loading) {
    return (
      <Card>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
        <CardContent>
          <Skeleton height={20} animation="wave" />
          <Skeleton height={20} animation="wave" />
          <Skeleton height={20} animation="wave" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link
      to={`/product-detail/${product.id}`}
      onClick={() => handleProductClick()}
      className={cx("wrapper")}
    >
      <Card>
        <div className={cx("product-image")}>
          <img src={product.mainImage} alt={product.name} />
        </div>
        <CardContent>
          <div className={cx("product-info")}>
            <Typography variant="h6" className={cx("product-name")}>
              {product.name}
            </Typography>
            <div className={cx("price")}>
              <Typography variant="body1">
                <span className={cx("new-price")}>
                  {convertCurrency(product.newPrice)}
                </span>
              </Typography>
              <div>
                <Typography variant="body2">
                  <span className={cx("old-price")}>
                    {convertCurrency(product.oldPrice)}
                  </span>
                </Typography>
              </div>
              <Typography variant="body2">
                <span className={cx("sale")}>- {product.sale}%</span>
              </Typography>
            </div>
            <Typography variant="body2">
              <span className={cx("quantity")}>
                {quantity_remaining}
                {product.quantity}
              </span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductItem;
