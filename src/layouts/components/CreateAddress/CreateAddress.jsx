import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Grid, Select, MenuItem } from "@mui/material";
import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CreateAddress.module.scss";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
  selectDistricts,
  selectProvinces,
  selectWards,
} from "~/store/reducers/locationSlice";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

CreateAddress.propTypes = {
  handleSaveAddress: PropTypes.func.isRequired,
  provinceDefault: PropTypes.string.isRequired,
  districIdDefault: PropTypes.string.isRequired,
  wardIdDefault: PropTypes.string,
  fullNameDefault: PropTypes.string,
  numberPhoneDefault: PropTypes.string,
  addressDefault: PropTypes.string,
};

function CreateAddress(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    info_name,
    info_telephone,
    order_address,
    province_city,
    district,
    ward,
    button_save,
    please_enter_your_address,
    please_enter_your_telephone,
    please_enter_your_city,
    please_enter_your_district,
    please_enter_your_ward,
  } = languageData;

  const {
    handleSaveAddress,
    provinceDefault,
    districIdDefault,
    wardIdDefault,
    fullNameDefault,
    numberPhoneDefault,
    addressDefault,
  } = props;
  const dispatch = useDispatch();
  const [provinceId, setProvinceId] = useState(provinceDefault);
  const [districtId, setDistrictId] = useState(districIdDefault);
  const [wardId, setWardId] = useState(wardIdDefault);
  const [isInitialized, setIsInitialized] = useState(false);

  const provinces = useSelector(selectProvinces);
  const districts = useSelector(selectDistricts);
  const wards = useSelector(selectWards);

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);
  useEffect(() => {
    if (provinceDefault !== "none") {
      setProvinceId(provinceDefault);
      setDistrictId(districIdDefault);
      setWardId(wardIdDefault);
    }
  }, [provinceDefault]);

  useEffect(() => {
    if (provinces.length > 0 && !isInitialized) {
      setProvinceId(provinceDefault);
      setDistrictId(districIdDefault);
      setWardId(wardIdDefault);
      setIsInitialized(true);
    }
  }, [
    provinces,
    wardIdDefault,
    districIdDefault,
    provinceDefault,
    isInitialized,
  ]);
  useEffect(() => {
    if (provinceId !== "none") {
      dispatch(fetchDistricts(provinceId));
    }
  }, [dispatch, provinceId]);
  useEffect(() => {
    if (districtId !== "none") {
      dispatch(fetchWards(districtId));
    }
  }, [dispatch, districtId]);
  const getItemNameById = (items, itemId) => {
    const item = items?.find((item) => item.code === itemId);
    return item ? item.name : "";
  };
  const getProvinceNameById = (provinceId) => {
    const numericProvinceId = parseInt(provinceId);
    return getItemNameById(provinces, numericProvinceId);
  };

  const getDistrictNameById = (districtId) => {
    const numericDistrictId = parseInt(districtId);
    return getItemNameById(districts?.districts, numericDistrictId);
  };

  const getWardNameById = (wardId) => {
    const numericWardId = parseInt(wardId);
    return getItemNameById(wards?.wards, numericWardId);
  };
  const provinceName = getProvinceNameById(provinceId);
  const districtName = getDistrictNameById(districtId);
  const wardName = getWardNameById(wardId);

  const handleProvinceChange = (provId) => {
    setProvinceId(provId);
    dispatch(fetchDistricts(provId));
  };

  const handleDistrictChange = (distId) => {
    setDistrictId(distId);
    dispatch(fetchWards(distId));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập họ tên"),
    numberPhone: Yup.string().required("Vui lòng nhập số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });
  const formik = useFormik({
    initialValues: {
      name: fullNameDefault === "none" ? "" : fullNameDefault,
      numberPhone: numberPhoneDefault === "none" ? "" : numberPhoneDefault,
      address: addressDefault === "none" ? "" : addressDefault,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSaveAddress(
        provinceId,
        districtId,
        wardId,
        values.name,
        values.numberPhone,
        values.address,
        values.address +
          "," +
          wardName +
          "," +
          districtName +
          "," +
          provinceName
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
            <label className="text-2xl">{info_name}</label>
            <TextField
              name="name"
              className={cx("input-field")}
              placeholder={info_name}
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
            <label className="text-2xl pt-4">{info_telephone}</label>
            <TextField
              name="numberPhone"
              className={cx("input-field")}
              placeholder={please_enter_your_telephone}
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
            <label className="text-2xl">{order_address}</label>
            <TextField
              name="address"
              className={cx("input-field")}
              placeholder={please_enter_your_address}
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
            <label className="text-2xl pt-4">{province_city}</label>
            <Select
              value={provinceId}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className={cx("select-field")}
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                {please_enter_your_city}
              </MenuItem>
              {provinces.map((item, index) => {
                return (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl pt-4">{district}</label>
            <Select
              value={districtId}
              disabled={provinceId === "none"}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className={cx("select-field", {
                "select-field-disabled": provinceId === "none",
              })}
              style={provinceId === "none" ? { cursor: "not-allowed" } : {}}
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                <span
                  className="w-full"
                  style={provinceId === "none" ? { cursor: "not-allowed" } : {}}
                >
                  {please_enter_your_district}
                </span>
              </MenuItem>
              {districts?.districts?.map((item, index) => {
                return (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-2xl pt-4">{ward}</label>
            <Select
              value={wardId}
              onChange={(e) => setWardId(e.target.value)}
              disabled={districtId === "none"}
              className={cx("select-field", {
                "select-field-disabled": districtId === "none",
              })}
              style={districtId === "none" ? { cursor: "not-allowed" } : {}}
              fullWidth
            >
              <MenuItem value="none" disabled sx={{ display: "none" }}>
                <span
                  className="w-full"
                  style={districtId === "none" ? { cursor: "not-allowed" } : {}}
                >
                  {please_enter_your_ward}
                </span>
              </MenuItem>
              {wards?.wards?.map((item, index) => {
                return (
                  <MenuItem key={item.code} value={item.code}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <button
            type="button"
            onClick={formik.handleSubmit}
            className="bg-primary float-right mt-8 text-white uppercase py-4 rounded-md px-24"
          >
            {button_save}
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateAddress;
