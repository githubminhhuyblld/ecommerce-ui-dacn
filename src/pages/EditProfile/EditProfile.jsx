import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";

import config from "~/config/index.jsx";
import {
  fetchUserInfo,
  selectUser,
  updateInfoUser,
} from "~/store/reducers/userSlice.js";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import UploadSingleImage from "~/layouts/components/UploadSingleImage/UploadSingleImage";
import AvatarEmpty from "~/assets/user/avatar.jpg";
import { storage } from "~/firebase";
import AuthService from "~/services/auth/AuthService";

dayjs.locale("vi");

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeDate, setIsChangeDate] = useState(false);
  const [success, setsuccess] = useState(false);
  const user = useSelector(selectUser);
  const lastName = user !== null && user.lastName;
  const firstName = user !== null && user.firstName;
  const numberPhone = user !== null && user.numberPhone;
  const email = user !== null && user.email;
  useEffect(() => {
    if (AuthService.isTokenExpired(token)) {
      navigate(config.routes.login);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [success]);
  useEffect(() => {
    if (user !== null) {
      const defaultDate = dayjs.unix(user.dateOfBirth / 1000);
      setSelectedDate(defaultDate);
      setGender(user !== null ? user.gender : "FEMALE");
    }
  }, [user]);

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChangeBirthDay = (date) => {
    setSelectedDate(date.valueOf());
    setIsChangeDate(true);
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
  const [gender, setGender] = useState("");

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Vui lòng nhập tên"),
    lastName: Yup.string().required("Vui lòng nhập họ và tên đệm"),
    phoneNumber: Yup.string().required("Vui lòng nhập số điện thoại"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: numberPhone,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      let downloadURL = user?.image;
      if (images.length > 0) {
        const storageRef = ref(storage, `users/${images[0]?.file.name}`);
        const snapshot = await uploadBytes(storageRef, images[0].file);
        downloadURL = await getDownloadURL(snapshot.ref);
      }
      const body = {
        dateOfBirth: isChangeDate ? selectedDate : user.dateOfBirth,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: gender,
        numberPhone: values.phoneNumber,
        image: downloadURL,
      };
      if (token) {
        dispatch(updateInfoUser({ userId: token.userId, body: body })).then(
          (response) => {
            console.log(response);
            if (response.payload === 200) {
              toast.success("Cập nhật tông tin thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              });
            }
            setIsLoading(false);
            setsuccess((prev) => !prev);
          }
        );
      } else {
        navigate(config.routes.login);
        setIsLoading(false);
        setsuccess((prev) => !prev);
      }
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
            <div className="mb-12">
              {isLoading && <LinearProgress color="secondary" />}
            </div>
            <div className="bg-white py-12 px-8 rounded-lg">
              <Grid container spacing={2}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <div className="flex flex-col">
                    <label className="text-2xl ">Họ và tên đệm</label>
                    <TextField
                      name="lastName"
                      className="input-field"
                      placeholder="Tên"
                      type="text"
                      fullWidth
                      margin="normal"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <span className="error">{formik.errors.lastName}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl ">Tên</label>
                    <TextField
                      name="firstName"
                      className="input-field"
                      placeholder="Tên"
                      type="text"
                      fullWidth
                      margin="normal"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <span className="error">{formik.errors.firstName}</span>
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
                          <MenuItem key={index} value={item.value}>
                            {item.gender}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl mb-2">Ngày sinh</label>
                    <div className="w-full h-[46px]">
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ height: "46px !important" }}
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
                      imageProduct={user !== null ? user?.image : AvatarEmpty}
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
                    <span className="font-bold">{email}</span>
                  </div>
                </Grid>
              </Grid>
              <div className="mt-12 ">
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  className="py-6 px-16 text-2xl md:text-3xl uppercase hover:bg-green-700 bg-green-600 text-white rounded-3xl"
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
