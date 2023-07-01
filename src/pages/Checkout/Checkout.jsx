import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid } from "@mui/material";

import CheckoutTable from "./CheckoutTable/CheckoutTable";
import { selectCartItems } from "~/store/reducers/cartsSlice";
import { selectProducts } from "~/store/reducers/productsSlice";
import { fetchProducts } from "~/services/workspacesService";
import ProductItem from "../Product/ProductItem/ProductItem";

Checkout.propTypes = {};

function Checkout(props) {
  const dispatch = useDispatch();
  const carts = useSelector(selectCartItems);
  const products = useSelector(selectProducts);
  const [displayedProductCount, setDisplayedProductCount] = useState(8);

  useEffect(() => {
    dispatch(fetchProducts(displayedProductCount));
  }, [dispatch, displayedProductCount]);
  const handleLoadMoreProducts = () => {
    setDisplayedProductCount((prevCount) => prevCount + 4);
  };

  return (
    <div>
      <Container>
        <h3 className="text-5xl py-6 text-primary">Giỏ hàng</h3>
        <CheckoutTable carts={carts} isOrder={false} />
        <div className="mt-12">
          <h3 className="text-4xl p-4 bg-sky-300 mb-12 text-white rounded-lg">
            Sản phẩm mới nhất
          </h3>
          <Grid container spacing={2}>
            {products?.data?.map((item) => (
              <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
                <ProductItem product={item} />
              </Grid>
            ))}
          </Grid>
          <div className="flex items-center justify-center w-full mt-12">
            <button
              onClick={handleLoadMoreProducts}
              className="py-6 px-8 bg-sky-400 text-white text-3xl rounded-lg hover:bg-sky-700"
            >
              Tải thêm
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Checkout;
