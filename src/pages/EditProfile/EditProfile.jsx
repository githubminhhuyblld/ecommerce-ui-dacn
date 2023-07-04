import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "~/pages/EditProfile/EditProfile.module.scss";
import config from "~/config/index.jsx";
import { selectUser } from "~/store/reducers/userSlice.js";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import AvatarEmpty from "~/assets/user/avatar.jpg";

const cx = classNames.bind(styles);
dayjs.locale("vi");

function EditProfile() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const user = useSelector(selectUser);
  const fullName = user !== null && user.lastName + user.firstName;
  const numberPhone = user !== null && user.numberPhone
  const genderDefault =
    user !== null && user?.gender !== null ? user?.gender : "FEMALE";
  const handleDateChangeBirthDay = (date) => {
    setSelectedDate(date.valueOf());
  };
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

  console.log(user);
  const [gender, setGender] = useState(genderDefault);

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập họ và tên"),
    phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
  });
  const formik = useFormik({
    initialValues: {
      name: fullName,
      phoneNumber: numberPhone,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });
  const genders = [
    { gender: "Nam", value: "MALE" },
    { gender: "Nữ", value: "FEMALE" },
  ];

  return (
    <div className="w-full bg-gray-200 p-8">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
            <h3 className="text-4xl mb-4">Chỉnh sửa thông tin cá nhân</h3>
            <div className="bg-white py-12 px-8 rounded-lg">
              <Grid container spacing={2}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <div className="flex flex-col">
                    <label className="text-2xl ">Họ và tên</label>
                    <TextField
                      name="name"
                      className="input-field"
                      placeholder="Họ và Tên"
                      type="text"
                      fullWidth
                      margin="normal"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <span className="error">{formik.errors.name}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl mb-2">Giới tính</label>
                    <Select
                      name="gender"
                      className="select-field"
                      value={gender}
                      onChange={handleChangeGender}
                    >
                      {genders.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.value}>{item.gender}</MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl mb-2">Ngày sinh</label>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale="vi"
                    >
                      <DatePicker
                        name="birthDate"
                        value={selectedDate}
                        onChange={handleDateChangeBirthDay}
                        className="datepicker-container"
                        inputClassName="datepicker-input"
                        labelClassName="datepicker-label"
                        format="DD/MM/YYYY"
                        fullWidth
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <label className="text-2xl">Số điện thoại</label>
                      <TextField
                        name="phoneNumber"
                        className="input-field"
                        placeholder="Số điện thoại"
                        type="number"
                        fullWidth
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        margin="normal"
                      />
                      {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        <span className="error">
                          {formik.errors.phoneNumber}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-[200px] h-[200px] rounded-full">
                    <UploadSingleImage
                      imageProduct={AvatarEmpty}
                      open={open}
                      images={images}
                      name={"User"}
                      maxNumber={maxNumber}
                      onChange={onChange}
                      showButton={showButton}
                    />
                  </div>
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <div className="flex flex-col">
                    <span className="text-2xl">Địa chỉ Email</span>
                    <span className="font-bold">minhhuy1222001@gmail.com</span>
                  </div>
                </Grid>
              </Grid>
              <div className="mt-12">
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  className="py-6 px-16 uppercase hover:bg-green-700 bg-green-600 text-white rounded-3xl"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EditProfile;
