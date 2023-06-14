import React from "react";
import PropTypes from "prop-types";

import Product from "~/assets/product/product1.jpg";
import CheckoutTable from "./CheckoutTable/CheckoutTable";
import { Container } from "@mui/material";

Checkout.propTypes = {};

function Checkout(props) {
  const items = [
    {
      name: "Thời Trang JIVIVIL Túi Khoác Vai Dành Cho Nữ Phiên Bản Hàn Quốc Của Màu Trơn Túi Đeo Chéo Chất Liệu Da Pu",
      image: Product,
      quantity: 1,
      newPrice: 3000000,
    },
    {
      name: "Thời Trang JIVIVIL Túi Khoác Vai Dành Cho Nữ Phiên Bản Hàn Quốc Của Màu Trơn Túi Đeo Chéo Chất Liệu Da Pu",
      image: Product,
      quantity: 2,
      newPrice: 3000000,
    },
    {
      name: "Thời Trang JIVIVIL Túi Khoác Vai Dành Cho Nữ Phiên Bản Hàn Quốc Của Màu Trơn Túi Đeo Chéo Chất Liệu Da Pu",
      image: Product,
      quantity: 3,
      newPrice: 3000000,
    },
  ];

  return (
    <div>
      <Container>
        <h3 className="text-5xl py-6 text-primary">
          Giỏ hàng
        </h3>
        <CheckoutTable items={items} />
      </Container>
    </div>
  );
}

export default Checkout;
