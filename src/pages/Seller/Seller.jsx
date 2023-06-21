import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";

import styles from "./Seller.module.scss";
import { selectUser } from "~/store/reducers/userSlice";
import Background from "~/assets/seller/back-ground-seller.jpg";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";

const cx = classNames.bind(styles);

Seller.propTypes = {};

function Seller(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [open, setOpen] = useState(true);
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    setShowButton(false);
    setOpen(false);
    setIsChangeImage(true);
    setImages(imageList);
  };
  console.log(images);
  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className={cx("wrapper")}
    >
      <Container>
        <Grid container justifyContent="flex-end" spacing={8}>
          <Grid item lg={5} md={12} sm={12}>
            <div className="w-full bg-white mt-24 p-12 rounded-xl">
              <h3 className="text-5xl mb-12 text-primary">Đăng ký bán hàng cùng Lazada</h3>
              <div className=" w-[150px] h-[150px] object-cover">
                <UploadSingleImage
                  imageProduct={
                    "https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg"
                  }
                  open={open}
                  images={images}
                  name={"User"}
                  maxNumber={maxNumber}
                  onChange={onChange}
                  showButton={showButton}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className={cx("label-item")}>
                  Tên Shop<span>*</span>
                </label>
                <TextField
                  name="name"
                  className={cx("input-field")}
                  placeholder="Tên Shop"
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className={cx("label-item")}>
                  Mô tả<span>*</span>
                </label>
                <TextField
                  name="description"
                  className={cx("input-field")}
                  placeholder="Mô tả"
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className={cx("label-item")}>
                  Địa chỉ<span>*</span>
                </label>
                <TextField
                  name="address"
                  className={cx("input-field")}
                  placeholder="Địa chỉ"
                  fullWidth
                  margin="normal"
                />
              </div>
              <button className="w-full bg-sky-700 text-3xl mt-8 p-6 rounded-2xl text-white">
                Đăng ký
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Seller;
