import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Grid, Select, MenuItem } from "@mui/material";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./CreateAddress.module.scss";

const cx = classNames.bind(styles);

CreateAddress.propTypes = {};

function CreateAddress(props) {
  const {
    handleSaveAddress,
    provinceDefault,
    districIdDefault,
    wardIdDefault,
    fullNameDefault,
    numberPhoneDefault,
  } = props;
  const [provinceId, setProvinceId] = useState(provinceDefault);
  const [districtId, setDistrictId] = useState(districIdDefault);
  const [wardId, setWardId] = useState(wardIdDefault);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ tên"),
    numberPhone: Yup.string().required("Vui lòng nhập số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      numberPhone: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSaveAddress(
        provinceId,
        districtId,
        wardId,
        values.name,
        values.numberPhone,
        values.address
      );
    },
  });
  return (
    <div className={cx("wrapper")}>
      <Grid container>
        <Grid
          item
          lg={6}
          md={12}
          xs={12}
          sm={12}
          className="bg-white px-12 py-8"
        >
          <div className="flex flex-col">
            <label className="text-2xl">Họ tên</label>
            <TextField
              name="name"
              className={cx("input-field")}
              placeholder="Họ tên"
              fullWidth
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={cx("error")}>
              {formik.touched.name && formik.errors.name}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Số điện thoại</label>
            <TextField
              name="numberPhone"
              className={cx("input-field")}
              placeholder="Vui lòng nhập số điện thoại của bạn"
              fullWidth
              margin="normal"
              value={formik.values.numberPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={cx("error")}>
              {formik.touched.numberPhone && formik.errors.numberPhone}
            </span>
          </div>
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          sm={12}
          xs={12}
          className="bg-white px-12 py-8"
        >
          <div className="flex flex-col">
            <label className="text-2xl">Địa chỉ nhận hàng</label>
            <TextField
              name="address"
              className={cx("input-field")}
              placeholder="Vui lòng nhập địa chỉ của bạn"
              fullWidth
              margin="normal"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={cx("error")}>
              {formik.touched.address && formik.errors.address}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Tỉnh/Thành phố</label>
            <Select
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
              className={cx("select-field")}
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                Vui lòng chọn tỉnh thành phố
              </MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 1</MenuItem>
              <MenuItem value="3">Option 1</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Quận/Huyện</label>
            <Select
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              className={cx("select-field")}
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                Vui lòng chọn quận/huyện
              </MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
              <MenuItem value="3">Option 3</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-2xl pt-4">Phưỡng/Xã</label>
            <Select
              value={wardId}
              onChange={(e) => setWardId(e.target.value)}
              className={cx("select-field")}
              fullWidth
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                Vui lòng chọn phường xã
              </MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
              <MenuItem value="3">Option 3</MenuItem>
            </Select>
          </div>
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="bg-primary float-right mt-8 text-white uppercase py-4 rounded-md px-24"
          >
            Lưu
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateAddress;