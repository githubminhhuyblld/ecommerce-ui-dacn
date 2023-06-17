import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Order.module.scss";
import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCircle } from "react-icons/gi";
import { selectCartItems } from "~/store/reducers/cartsSlice";
import { convertCurrency } from "~/untils/convertCurrency";
import { selectUser } from "~/store/reducers/userSlice";
import config from "~/config";
import {
  selectDistricts,
  selectProvinces,
  selectWards,
} from "~/store/reducers/locationSlice";

const cx = classNames.bind(styles);

Order.propTypes = {};

function Order(props) {
  const [selectedValue, setSelectedValue] = useState("PAYMENT_ON_DELIVERY");
  const provinces = useSelector(selectProvinces);
  const districts = useSelector(selectDistricts);
  const wards = useSelector(selectWards);
  const carts = useSelector(selectCartItems);
  const totalPrice = carts?.data?.[0]?.totalPrice;
  const cartItemsLength = carts?.data?.[0]?.cartItems?.length;
  const user = useSelector(selectUser);
  const address = user !== null && user?.data?.address;
  const name =
    user !== null && user?.data?.lastName + " " + user?.data?.firstName;
  const numberPhone = user !== null && user?.data?.numberPhone;
  const defaultAddress =
    Array.isArray(address) && address.find((item) => item.type === "DEFAULT");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const getItemNameById = (items, itemId) => {
    const item = items.find((item) => item.id === itemId);
    return item ? item.name : "";
  };
  const getProvinceNameById = (provinceId) => {
    return getItemNameById(provinces, provinceId);
  };

  const getDistrictNameById = (districtId) => {
    return getItemNameById(districts, districtId);
  };

  const getWardNameById = (wardId) => {
    return getItemNameById(wards, wardId);
  };

  const handleSaveAddress = (
    provinceId,
    districtId,
    wardId,
    name,
    numberPhone,
    address
  ) => {
    const provinceName = getProvinceNameById(provinceId);
    const districtName = getDistrictNameById(districtId);
    const wardName = getWardNameById(wardId);
    console.log(address);
    console.log(provinceName);
    console.log(districtName);
    console.log(wardName);
    console.log(name);
    console.log(provinceName);
  };

  console.log(selectedValue);
  return (
    <div className={cx("wrapper")}>
      <Container>
        <h2 className="text-4xl text-black py-4">Thông tin giao hàng</h2>
        <Grid container spacing={2}>
          <Grid container item lg={8} md={8} sm={12}>
            {address?.length > 0 ? (
              <div className="w-full">
                <div className="bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="text-3xl mr-5">
                        {defaultAddress
                          ? defaultAddress.fullName
                          : address[0]?.fullName}
                      </h3>
                      <span>
                        {defaultAddress
                          ? defaultAddress.numberPhone
                          : address[0]?.numberPhone}
                      </span>
                    </div>
                    <Link
                      to={config.routes.editAddress}
                      className="text-sky-500"
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="bg-primary py-1 px-4 uppercase text-white rounded-full">
                      Nhà riêng
                    </span>
                    <p className="ml-3">
                      {defaultAddress
                        ? defaultAddress.fullAddress
                        : address[0]?.fullAddress}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <CreateAddress
                handleSaveAddress={handleSaveAddress}
                provinceDefault="none"
                districIdDefault="none"
                wardIdDefault="none"
                fullNameDefault=""
                numberPhoneDefault=""
              />
            )}
          </Grid>

          <Grid item lg={4} md={4} xs={12} sm={12}>
            <div className="w-full bg-white px-4 py-4">
              <ul className="flex flex-col w-full gap-6 sm:grid-cols-6 md:grid-cols-2 mt-6 mb-10 px-4">
                <li>
                  <input
                    type="radio"
                    id="PAYMENT_ON_DELIVERY"
                    name="payment"
                    value="PAYMENT_ON_DELIVERY"
                    className="hidden peer"
                    required
                    onChange={handleRadioChange}
                    checked={selectedValue === "PAYMENT_ON_DELIVERY"}
                  />
                  <label
                    htmlFor="PAYMENT_ON_DELIVERY"
                    className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                      selectedValue === "PAYMENT_ON_DELIVERY"
                        ? "dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        : ""
                    } hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
                  >
                    <div className="block">
                      <div className="w-full">Thanh toán khi nhận hàng</div>
                    </div>
                    {selectedValue === "PAYMENT_ON_DELIVERY" ? (
                      <AiFillCheckCircle />
                    ) : (
                      <GiCircle />
                    )}
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="TRANSFER"
                    name="payment"
                    value="TRANSFER"
                    className="hidden peer"
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor="TRANSFER"
                    className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                      selectedValue === "TRANSFER"
                        ? "dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        : ""
                    } hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
                  >
                    <div className="block">
                      <div className="w-full">Ví ZaloPay</div>
                    </div>
                    {selectedValue === "TRANSFER" ? (
                      <AiFillCheckCircle />
                    ) : (
                      <GiCircle />
                    )}
                  </label>
                </li>
              </ul>
              <h3 className="text-4xl px-4">Thông tin đơn hàng</h3>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>Tạm tính ({cartItemsLength} Sản phẩm)</p>
                <span className="text-3xl text-black">
                  {convertCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>Phí vận chuyển</p>
                <span className="text-black text-3xl">0</span>
              </div>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p> Giảm phí vận chuyển</p>
                <span className="text-black text-3xl">0</span>
              </div>
              <hr className="border-gray-300 border-t-2" />
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>Tổng cộng</p>
                <span className="text-primary text-4xl">
                  {convertCurrency(totalPrice)}
                </span>
              </div>
              <button
                type="button"
                className="p-6 mt-8 opacity-100  bg-primary w-full text-white uppercase text-2xl "
              >
                Đặt hàng
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Order;
