import React, { useContext, useEffect, useState } from "react";
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
import SliderSlick from "~/layouts/components/Slider/SliderSlick";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

Home.propTypes = {};

function Home(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [displayedProductCount, setDisplayedProductCount] = useState(24);

  useEffect(() => {
    dispatch(fetchProducts(displayedProductCount));
  }, [dispatch, displayedProductCount]);
  const handleLoadMoreProducts = () => {
    setDisplayedProductCount((prevCount) => prevCount + 6);
  };

  const { languageData } = useContext(LanguageContext);
  const { just_for_you, load_more } = languageData;
  return (
    <main className={cx("wrapper")}>
      <Container>
        <SliderSlick />
        <Category />
        <div className={cx("wrapper-product")}>
          <div className={cx("header")}>

            <h3 className={cx("header-text")}>{just_for_you}</h3>

            <Grid container spacing={2}>
              {products?.data?.map((item, index) => {
                return (
                  <Grid key={item.id} item md={3} lg={2} sm={6} xs={12}>
                    <ProductItem product={item} />
                  </Grid>
                );
              })}
              <div className="flex items-center justify-center w-full mt-12">
                <button
                  onClick={handleLoadMoreProducts}
                  className="py-6 px-8 bg-sky-400 text-white text-3xl rounded-lg hover:bg-sky-700"
                >

                  {load_more}
                </button>
              </div>
            </Grid>
          </div>
        </div>
        <BackTop />
      </Container>
    </main>
  );
}

export default Home;
