import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Grid, Select, MenuItem } from "@mui/material";
import { TextField } from "@material-ui/core";

import styles from "./CreateAddress.module.scss";

const cx = classNames.bind(styles);

CreateAddress.propTypes = {};

function CreateAddress(props) {
  const [select, setSelect] = useState("none");

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  return (
    <div className={cx("wrapper")}>
      <Grid container >
        <Grid item lg={6} md={12} sm={12} className="bg-white px-12 py-8">
          <label className="text-2xl ">Họ tên</label>
          <TextField
            name="name"
            className={cx("input-field")}
            placeholder="Họ tên"
            fullWidth
            margin="normal"
          />
          <label className="text-2xl pt-4">Số điện thoại</label>
          <TextField
            name="numberPhone"
            className={cx("input-field")}
            placeholder="Vui lòng nhập số điện thoại của bạn"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} className="bg-white px-12 py-8">
          <label className="text-2xl">Địa chỉ nhận hàng</label>
          <TextField
            name="address"
            className={cx("input-field")}
            placeholder="Vui lòng nhập địa chỉ của bạn"
            fullWidth
          />
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Tỉnh/Thành phố</label>
            <Select
              value={select}
              onChange={handleChange}
              className={cx("select-field")}
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                Vui lòng chọn tỉnh thành phố
              </MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
              <MenuItem value="3">Option 3</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Quận/Huyện</label>
            <Select
              value={select}
              onChange={handleChange}
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
          <div className="flex flex-col">
            <label className="text-2xl pt-4">Phưỡng/Xã</label>
            <Select
              value={select}
              onChange={handleChange}
              className={cx("select-field")}
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
            className="bg-primary float-right text-white uppercase py-4 rounded-md px-24"
          >
            Lưu
          </button>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateAddress;
