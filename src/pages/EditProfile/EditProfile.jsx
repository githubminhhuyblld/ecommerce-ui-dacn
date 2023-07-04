import { useEffect, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Container, Grid, Select, MenuItem } from "@mui/material";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import styles from "~/pages/EditProfile/EditProfile.module.scss";
import config from "~/config/index.jsx";
import { selectUser } from "~/store/reducers/userSlice.js";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";

const cx = classNames.bind(styles);
dayjs.locale("vi");

function EditProfile() {
  const [gender, setGender] = useState("MALE");
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  const handleDateChangeBirthDay = (date) => {
    setSelectedDate(date.valueOf());
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

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
                  <div>
                    <label className="text-2xl mb-2">Họ và tên</label>
                    <TextField
                      name="name"
                      className="input-field"
                      placeholder="Họ và Tên"
                      type="text"
                      fullWidth
                      margin="normal"
                    />
                    <span className="error"></span>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl mb-2">Giới tính</label>
                    <Select
                      className="select-field"
                      value={gender}
                      onChange={handleChangeGender}
                    >
                      <MenuItem value="MALE">Nam</MenuItem>
                      <MenuItem value="FEMALE">Nữ</MenuItem>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-2xl mb-2">Ngày sinh</label>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale="vi"
                    >
                      <DatePicker
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
                    <div>
                      <label className="text-2xl">Số điện thoại</label>
                      <TextField
                        name="name"
                        className="input-field"
                        placeholder="Số điện thoại"
                        type="number"
                        fullWidth
                        margin="normal"
                      />
                      <span className="error"></span>
                    </div>
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
                <button className="py-6 px-16 uppercase hover:bg-green-700 bg-green-600 text-white rounded-3xl">
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
