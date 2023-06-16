import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.module.scss";
import Category from "~/pages/Home/Category/Category.jsx";
import ProductItem from "~/layouts/components/ProductItem/ProductItem.jsx";
import BackTop from "~/layouts/components/BackTop/BackTop.jsx";
import { selectProducts } from "~/store/reducers/productsSlice.js";
import { fetchProducts } from "~/services/workspacesService.jsx";

const cx = classNames.bind(styles);

Home.propTypes = {};

function Home(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts(0));
  }, [dispatch]);
  return (
    <main className={cx("wrapper")}>
      <Container>
        <Category />
        <div className={cx("wrapper-product")}>
          <div className={cx("header")}>
            <h3 className={cx("header-text")}>Dành riêng cho bạn</h3>
            <Grid container spacing={2}>
              {products?.data?.map((item, index) => {
                return (
                  <Grid key={item.id} item md={3} lg={2} sm={6}>
                    <ProductItem product={item} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
        <BackTop />
      </Container>
    </main>
  );
}

export default Home;
