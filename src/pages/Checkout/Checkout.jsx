import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import CheckoutTable from "./CheckoutTable/CheckoutTable";
import { Container } from "@mui/material";
import {
  selectCartItems,
} from "~/store/reducers/cartsSlice";


Checkout.propTypes = {};

function Checkout(props) {
  const carts = useSelector(selectCartItems);
  

  return (
    <div>
      <Container>
        <h3 className="text-5xl py-6 text-primary">Giỏ hàng</h3>
        <CheckoutTable carts={carts} />
      </Container>
    </div>
  );
}

export default Checkout;
