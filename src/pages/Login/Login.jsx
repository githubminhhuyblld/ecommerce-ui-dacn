import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GoogleOAuthProvider,
  googleLogout,
  GoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";

import styles from "./Login.module.scss";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import AuthService from "~/services/auth/AuthService.jsx";
import config from "~/config/index.jsx";
import { fetchUserInfo, setAuthenticated } from "~/store/reducers/userSlice.js";
import { loginGoogleService } from "~/services/workspacesService.jsx";
import { setSuccess } from "~/store/reducers/cartsSlice";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

function Login(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    welcome_to_log_in,
    login_forgot,
    new_member,
    here,
    header_login,
    header_signup,
  } = languageData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "minhhuy",
      password: "123456",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Vui lòng nhập tên tài khoản"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await AuthService.login(
          values.username,
          values.password
        );
        if (response.accessToken) {
          dispatch(setAuthenticated(true));
          dispatch(setSuccess((prev) => !prev));
          await dispatch(fetchUserInfo());
          // window.history.back()
          navigate(config.routes.home);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response.status === 400) {
          setErrorMessage("Tài khoản hoặc mật khẩu không đúng");
          setIsLoading(false);
        }
      }
    },
  });
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (formik.values.password.length > 0) {
      setErrorMessage("");
    }
  }, [formik.values.password]);
  useEffect(() => {
    if (formik.values.username.length > 0) {
      setErrorMessage("");
    }
  }, [formik.values.username]);
  const handleLogoutGoogle = () => {
    googleLogout();
  };
  const loginSuccessHandler = async (credentialResponse) => {
    setIsLoading(true);
    const decoded = jwt_decode(credentialResponse.credential);
    const body = {
      email: decoded.email,
      familyName: decoded.given_name,
      givenName: decoded.family_name,
      image: decoded.picture,
    };
    const response = await loginGoogleService(body);
    const token = response?.data;
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      if (token.accessToken) {
        dispatch(setAuthenticated(true));
        dispatch(setSuccess((prev) => !prev));
        navigate(config.routes.home);
        await dispatch(fetchUserInfo());
        setIsLoading(false);
      }
    }
    else{
      setIsLoading(false);
    }
    
  };

  const loginErrorHandler = () => {
    console.log("Login Failed");
  };

  return (
    <div className={cx("wrapper")}>
      {isLoading && (
        <div className="pb-20">
          <LinearProgress color="secondary" />
        </div>
      )}
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <h3 className={cx("title")}>{welcome_to_log_in}!</h3>
          <form className={cx("form-login")}>
            {errorMessage.length > 0 && (
              <span className={cx("error-message")}>{errorMessage}</span>
            )}
            <TextField
              name="username"
              className={cx("input-field")}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tên tài khoản"
              fullWidth
              margin="normal"
            />
            <span className={`error`}>
              {formik.touched.username && formik.errors.username}
            </span>
            <TextField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={formik.values.showPassword ? "text" : "password"}
              onKeyPress={handleKeyPress}
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
            <a className={cx("forgot-pass")} href="">
              {login_forgot}
            </a>
            <div className="flex flex-col  md:flex-row md:items-center">
              <div className={cx("order")}>
                <GoogleOAuthProvider clientId="690152027840-d8gf9jqqn4rkdl4osirgt6rg2l8nsdka.apps.googleusercontent.com">
                  <div className="w-full">
                    <GoogleLogin
                      buttonText="Đăng nhập với Google"
                      cookiePolicy="single_host_origin"
                      onSuccess={loginSuccessHandler}
                      onError={loginErrorHandler}
                      logo_alignment="left"
                      width={"100%"}
                    />
                  </div>
                </GoogleOAuthProvider>
              </div>
              <Link
                style={{ width: "100%" }}
                className={cx("order-item")}
                to={""}
              >
                <BsFacebook /> <span>Facebook</span>
              </Link>
            </div>

            <p className={cx("register-link")}>
              {new_member}?{" "}
              <Link className="text-sky-600 mr-2" to={config.routes.register}>
                {header_signup}
              </Link>
              {here}
            </p>

            <div className={cx("submit")}>
              <button
                type="button"
                className={`btn ${cx("btn-login")}`}
                onClick={formik.handleSubmit}
              >
                {header_login}
              </button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
