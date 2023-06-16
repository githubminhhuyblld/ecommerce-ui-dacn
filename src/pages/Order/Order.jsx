import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";

import styles from "./Order.module.scss";

const cx = classNames.bind(styles);

Order.propTypes = {};

function Order(props) {
  return (
    <div className={cx("wrapper")}>
      <Container>
        <form>
          <Grid container>
            <Grid item lg={4} md={4} sm={12}>
              Họ tên
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              Họ tên
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              Họ tên
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default Order;
