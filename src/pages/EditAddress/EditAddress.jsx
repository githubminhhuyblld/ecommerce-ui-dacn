import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";

import styles from "./EditAddress.module.scss";
import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";

const cx = classNames.bind(styles);

EditAddress.propTypes = {};

function EditAddress(props) {
  const handleSaveAddress = (
    provinceId,
    districtId,
    wardId,
    name,
    numberPhone,
    address
  ) => {
    console.log(provinceId);
    console.log(name);
  };
  return (
    <div className={cx("wrapper")}>
      <Container>
        <Grid container>
          <Grid item lg={12} md={12}>
            <h3 className="text-4xl p-8">Chỉnh sửa địa chỉ</h3>
            <CreateAddress
              handleSaveAddress={handleSaveAddress}
              provinceDefault="none"
              districIdDefault="none"
              wardIdDefault="none"
              fullNameDefault=""
              numberPhoneDefault=""
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default EditAddress;
