import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./Register.module.scss";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import AuthService from "~/services/auth/AuthService.jsx";
import config from "~/config/index.jsx";
import {
  checkEmailExists,
  checkUsernameExists,
} from "~/services/workspacesService.jsx";

const cx = classNames.bind(styles);

Register.propTypes = {};

function Register(props) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      numberPhone: "",
      showPassword: false,
      showConfirmPassword: false,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required("Vui lòng nhập tên người dùng")
        .test("check-username", "Tên người dùng đã tồn tại", async (value) => {
          const response = await checkUsernameExists(value);
          const data = response.data;
          return !data;
        }),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự")
        .max(20, "Mật khẩu không được vượt quá 20 kí tự"),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("password"), null], "Nhập lại mật khẩu không khớp"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email")
        .test("check-email", "Emai đã được sử dụng", async (value) => {
          const response = await checkEmailExists(value);
          const data = response.data;
          return !data;
        }),
      firstName: Yup.string().required("Vui lòng nhập tên"),
      lastName: Yup.string().required("Vui lòng nhập họ"),
      numberPhone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^\d+$/, "Số điện thoại chỉ được chứa các chữ số")
        .min(10, "Số điện thoại phải chứa ít nhất 10 chữ số")
        .max(12, "Số điện thoại không được vượt quá 12 chữ số"),
    }),
    onSubmit: async (values) => {
      const response = await AuthService.register(
        values.username,
        values.password,
        values.email,
        values.firstName,
        values.lastName,
        values.numberPhone
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Đăng ký thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        navigate(config.routes.login);
      }
    },
  });
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>Tạo tài khoản Lazada!</h3>
      <form className={cx("form-register")}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={4} style={{ width: "100%" }}>
            <div className={cx("form-left")}>
              <label className={cx("label-item")}>
                Tên tài khoản <span>*</span>
              </label>
              <TextField
                name="username"
                className={cx("input-field")}
                placeholder="Tên tài khoản"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              <span className={cx("error")}>
                {formik.touched.username && formik.errors.username}
              </span>
              <label className={cx("label-item")}>
                Mật khẩu <span>*</span>
              </label>
              <TextField
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={formik.values.showPassword ? "text" : "password"}
                className={cx("input-field")}
                fullWidth
                placeholder="Mật khẩu"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          formik.setFieldValue(
                            "showPassword",
                            !formik.values.showPassword
                          );
                        }}
                      >
                        {formik.values.showPassword ? (
                          <MdOutlineVisibilityOff />
                        ) : (
                          <MdOutlineVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span className={cx("error")}>
                {formik.touched.password && formik.errors.password}
              </span>
              <label className={cx("label-item")}>
                Nhập lại mật khẩu <span>*</span>
              </label>
              <TextField
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={formik.values.showConfirmPassword ? "text" : "password"}
                className={cx("input-field")}
                fullWidth
                placeholder="Nhập lại mật khẩu"
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          formik.setFieldValue(
                            "showConfirmPassword",
                            !formik.values.showConfirmPassword
                          );
                        }}
                      >
                        {formik.values.showConfirmPassword ? (
                          <MdOutlineVisibilityOff />
                        ) : (
                          <MdOutlineVisibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <span className={cx("error")}>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </span>

              <label className={cx("label-item")}>
                Email <span>*</span>
              </label>
              <TextField
                name="email"
                className={cx("input-field")}
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              <span className={cx("error")}>
                {formik.touched.email && formik.errors.email}
              </span>
              <label className={cx("label-item")}>
                Sô điện thoại <span>*</span>
              </label>
              <TextField
                name="numberPhone"
                className={cx("input-field")}
                placeholder="Số điện thoại"
                type={"email"}
                value={formik.values.numberPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              <span className={cx("error")}>
                {formik.touched.numberPhone && formik.errors.numberPhone}
              </span>
            </div>
          </Grid>
          <Grid item sm={12} md={6} lg={4}>
            <div className={cx("form-right")}>
              <label className={cx("label-item")}>
                Họ tên đệm<span>*</span>
              </label>
              <TextField
                name="lastName"
                className={cx("input-field")}
                placeholder="Họ tên đệm"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              <span className={cx("error")}>
                {formik.touched.lastName && formik.errors.lastName}
              </span>
              <label className={cx("label-item")}>
                Tên<span>*</span>
              </label>
              <TextField
                name="firstName"
                className={cx("input-field")}
                placeholder="Tên"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                margin="normal"
              />
              <span className={cx("error")}>
                {formik.touched.firstName && formik.errors.firstName}
              </span>

              <p className={cx("rule")}>
                Tôi đã đọc và đồng ý với Điều Khoản Sử Dụng và Chính Sách Bảo
                Mật của Lazada của Lazada, bao gồm quyền thu thập, sử dụng, và
                tiết lộ dữ liệu cá nhân của tôi theo pháp luật quy định.
              </p>
              <button
                type="button"
                onClick={formik.handleSubmit}
                className={`btn ${cx("btn-register")}`}
              >
                Đăng ký
              </button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Register;
