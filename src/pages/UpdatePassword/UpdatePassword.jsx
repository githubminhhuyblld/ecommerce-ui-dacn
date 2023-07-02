import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import {
  resetUser,
  setAuthenticated,
  updatePassword,
} from "~/store/reducers/userSlice";
import AuthService from "~/services/auth/AuthService";
import { clearCart, setSuccess } from "~/store/reducers/cartsSlice";
import { useNavigate } from "react-router-dom";
import config from "~/config";
import LanguageContext from "~/context/languageContext";

function UpdatePassword(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { languageData } = useContext(LanguageContext);
  const {
    button_save,
    old_password,
    new_password,
    re_password,
    update_password_title
  } = languageData;
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogout = () => {
    AuthService.logout();
    dispatch(setAuthenticated(false));
    dispatch(setSuccess(false));
    dispatch(clearCart());
    dispatch(resetUser());
    localStorage.removeItem("shopInfo");
    navigate(config.routes.login);
  };

  const formik = useFormik({
    initialValues: {
      newPass: "",
      oldPass: "",
      rePass: "",
      showConfirmPassword: false,
      showNewPassword: false,
      showOldPassword: false,
    },
    validationSchema: Yup.object().shape({
      newPass: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải chứa ít nhất 6 kí tự")
        .max(20, "Mật khẩu không được vượt quá 20 kí tự"),
      rePass: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .oneOf([Yup.ref("newPass"), null], "Nhập lại mật khẩu không khớp"),
      oldPass: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      const token = JSON.parse(localStorage.getItem("token"));
      const body = {
        newPassword: values.newPass,
        oldPassword: values.oldPass,
      };
      if (token) {
        dispatch(
          updatePassword({
            userId: token.userId,
            body: body,
          })
        ).then((response) => {
          console.log(response);
          if (response.payload === 200) {
            toast.success("Đổi mật khẩu thành công", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
            handleLogout();
          } else {
            if (response.payload.status === 400) {
              setErrorMessage("Mật khẩu cũ không đúng!");
            }
          }
        });
      }
    },
  });
  useEffect(() => {
    if (formik.values.oldPass.length > 0) {
      setErrorMessage("");
    }
  }, [formik.values.oldPass]);

  return (
    <div className="w-full h-[100vh] bg-background ">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className=" px-4 col-span-12 md:col-span-9 lg:col-span-6 sm:col-span-12">
            <h3 className="text-4xl mb-8">{update_password_title}</h3>
            <form className="bg-white px-12 py-16">
              {errorMessage.length > 0 && (
                <div className="w-full flex items-center mb-4 rounded-xl justify-between bg-red-400 p-6">
                  <span className="text-3xl text-center w-full text-white">
                    {errorMessage}
                  </span>
                </div>
              )}
              <div className="flex flex-col mb-4">
                <label className="label-item">
                  {old_password}<span className="error">*</span>
                </label>
                <TextField
                  name="oldPass"
                  className="input-field"
                  placeholder={old_password}
                  value={formik.values.oldPass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={formik.values.showOldPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            formik.setFieldValue(
                              "showOldPassword",
                              !formik.values.showOldPassword
                            );
                          }}
                        >
                          {formik.values.showOldPassword ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">
                  {formik.touched.oldPass && formik.errors.oldPass}
                </span>
              </div>
              <div className="flex flex-col mb-4">
                <label className="label-item">
                {new_password}<span className="error">*</span>
                </label>
                <TextField
                  name="newPass"
                  className="input-field"
                  placeholder={new_password}
                  value={formik.values.newPass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={formik.values.showNewPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            formik.setFieldValue(
                              "showNewPassword",
                              !formik.values.showNewPassword
                            );
                          }}
                        >
                          {formik.values.showNewPassword ? (
                            <MdOutlineVisibilityOff />
                          ) : (
                            <MdOutlineVisibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="error">
                  {formik.touched.newPass && formik.errors.newPass}
                </span>
              </div>
              <div className="flex flex-col mb-4">
                <label className="label-item">
                {re_password}<span className="error">*</span>
                </label>
                <TextField
                  name="rePass"
                  className="input-field"
                  placeholder={re_password}
                  fullWidth
                  value={formik.values.rePass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={formik.values.showConfirmPassword ? "text" : "password"}
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
                  margin="normal"
                />
                <span className="error">
                  {formik.touched.rePass && formik.errors.rePass}
                </span>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  className="px-14 py-4 bg-green-600 text-white rounded-2xl text-3xl"
                >
                  {button_save}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UpdatePassword;
