import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { TextField, InputAdornment, IconButton, Grid} from '@material-ui/core';
import {Link} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';




import styles from "./Login.module.scss";
import {MdOutlineVisibilityOff,MdOutlineVisibility} from "react-icons/md";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook} from "react-icons/bs";


const cx = classNames.bind(styles);

Login.propTypes = {

};

function Login(props) {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Vui lòng nhập tên tài khoản'),
            password: Yup.string().required('Vui lòng nhập mật khẩu')
                .min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự')
                .max(30, 'Mật khẩu không được vượt quá 30 kí tự'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <div className={cx('wrapper')}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item sm={8} md={6} lg={4}>
                    <form className={cx("form-login")}>
                        <h3 className={cx("title")}>Chào mừng đến với Lazada. Đăng nhập ngay!</h3>
                        <TextField
                            name="username"
                            className={cx('input-field')}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Tên tài khoản"
                            fullWidth
                            margin="normal"
                        />
                        <span className={cx('error')}>{formik.touched.username && formik.errors.username}</span>
                        <TextField
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type={formik.values.showPassword ? 'text' : 'password'}
                            className={cx('input-field')}
                            fullWidth
                            placeholder="Mật khẩu"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                formik.setFieldValue('showPassword', !formik.values.showPassword);
                                            }}
                                        >
                                            {formik.values.showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <span className={cx('error')}>{formik.touched.password && formik.errors.password}</span>
                        <a className={cx("forgot-pass")} href="">Quên mật khẩu</a>
                        <div className={cx('order')}>
                            <Link className={cx('order-item')} to={""}>
                                <FcGoogle/> <span>Google</span>
                            </Link>
                            <Link className={cx('order-item')} to={""}>
                                <BsFacebook/> <span>Facebook</span>
                            </Link>
                        </div>

                     <div className={cx("submit")}>
                         <button type="button" className={`btn ${cx('btn-login')}`} onClick={formik.handleSubmit}>
                             Đăng nhập
                         </button>
                     </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;