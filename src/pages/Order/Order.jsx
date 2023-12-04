import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import styles from "./Order.module.scss";
import CreateAddress from "~/layouts/components/CreateAddress/CreateAddress";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCircle } from "react-icons/gi";
import {
  clearCartItem,
  selectCartItems,
  selectedProducts,
  setSuccess,
} from "~/store/reducers/cartsSlice";
import { convertCurrency } from "~/untils/convertCurrency";
import { selectUser } from "~/store/reducers/userSlice";
import config from "~/config";
import {
  addAddress,
  selectDistricts,
  selectProvinces,
  selectSuccessAddress,
  selectWards,
} from "~/store/reducers/locationSlice";
import CheckoutTable from "../Checkout/CheckoutTable/CheckoutTable";
import { createOrder } from "~/store/reducers/orderSlice";
import LanguageContext from "~/context/languageContext";
import { createPayment } from "~/store/reducers/paymentSlice";

const cx = classNames.bind(styles);

Order.propTypes = {};

function Order(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    delivery_information,
    method_pay_receive,
    zaloPay_wallet,
    order_information,
    temporary_calculation,
    cart_name_product,
    fee_shipping,
    reduced_shipping_fees,
    total_price,
    button_put_order,
    info_edit,
    info_home,
    td_order_total_price,
  } = languageData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("PAYMENT_ON_DELIVERY");
  const provinces = useSelector(selectProvinces);
  const districts = useSelector(selectDistricts);
  const wards = useSelector(selectWards);
  const carts = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const address = user !== null && user?.address;
  const email = user !== null && user?.email;
  const userId = user !== null && user?.id;
  const cartItems = useSelector(selectedProducts);
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.newPrice * item.amount;
  }, 0);
  const defaultAddress =
    Array.isArray(address) && address?.find((item) => item.type === "DEFAULT");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const getItemNameById = (items, itemId) => {
    const item = items.find((item) => item.code === itemId);
    return item ? item.name : "";
  };
  const getProvinceNameById = (provinceId) => {
    return getItemNameById(provinces, provinceId);
  };

  const getDistrictNameById = (districtId) => {
    return getItemNameById(districts?.districts, districtId);
  };

  const getWardNameById = (wardId) => {
    return getItemNameById(wards?.wards, wardId);
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
    const token = JSON.parse(localStorage.getItem("token"));

    const body = {
      provinceId: provinceId,
      districtId: districtId,
      wardId: wardId,
      fullName: name,
      numberPhone: numberPhone,
      address: address,
      fullAddress:
        address + "," + wardName + "," + districtName + "," + provinceName,
    };
    dispatch(addAddress({ userId: token.userId, body: body }))
      .then((response) => {
        if (response.payload === 200) {
          dispatch(setSuccess((prev) => !prev));
          toast.success("Lưu địa chỉ thành công", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: "toast-message",
          });
        }
      })
      .catch((error) => {});
  };

  const handleCreateOrder = () => {
    if (user === null) {
      navigate(config.routes.login);
    } else if (address !== null) {
      const body = {
        address: defaultAddress
          ? defaultAddress.fullAddress
          : address[0]?.fullAddress,
        email: email,
        name: defaultAddress ? defaultAddress.fullName : address[0]?.fullName,
        numberPhone: defaultAddress
          ? defaultAddress.numberPhone
          : address[0]?.numberPhone,
        totalPrice: totalPrice,
        userId: userId,
        cartItems: cartItems,
        paymentType: selectedValue,
      };
      dispatch(createOrder({ userId: userId, body: body })).then((response) => {
        if (response.payload.data !== null) {
          if (selectedValue === "PAYMENT_ON_DELIVERY") {
            toast.success("Đặt đơn hàng thành công", {
              position: toast.POSITION.TOP_LEFT,
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              bodyClassName: "toast-message",
            });
            navigate(config.routes.infoOrder);
          }
        }
        const orderId = response.payload.data;
        if (selectedValue === "TRANSFER") {
          dispatch(
            createPayment({ amount: totalPrice, orderInfo: orderId })
          ).then((paymentResponse) => {
            if (paymentResponse.payload.data !== null) {
              console.log(paymentResponse);
              window.location.href = paymentResponse.payload.data;
              setTimeout(() => {
                dispatch(clearCartItem());
                dispatch(setSuccess((prev) => !prev));
              }, 5000);
            }
          });
        } else {
          dispatch(clearCartItem());
          dispatch(setSuccess((prev) => !prev));
        }
      });
    } else {
      toast.warning("Lưu địa chỉ trước khi đặt hàng", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: "toast-message",
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Container>
        <h2 className="text-4xl text-black py-4">{delivery_information}</h2>
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
                      to={`/edit-address/${
                        defaultAddress ? defaultAddress.id : address[0]?.id
                      }`}
                      className="text-sky-500"
                    >
                      {info_edit}
                    </Link>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="bg-primary py-1 px-4 uppercase text-white rounded-full">
                      {info_home}
                    </span>
                    <p className="ml-3">
                      {defaultAddress
                        ? defaultAddress.fullAddress
                        : address[0]?.fullAddress}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white mt-6 p-6">
                  <CheckoutTable carts={cartItems} isOrder={true} />
                </div>
              </div>
            ) : (
              <>
                <CreateAddress
                  handleSaveAddress={handleSaveAddress}
                  provinceDefault="none"
                  districIdDefault="none"
                  wardIdDefault="none"
                  fullNameDefault="none"
                  numberPhoneDefault="none"
                />
              </>
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
                    className={`inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg  cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 ${
                      selectedValue === "PAYMENT_ON_DELIVERY"
                        ? "dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600"
                        : ""
                    } hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700`}
                  >
                    <div className="block">
                      <div className="w-full">{method_pay_receive}</div>
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
                      <div className="w-full">{zaloPay_wallet}</div>
                    </div>
                    {selectedValue === "TRANSFER" ? (
                      <AiFillCheckCircle />
                    ) : (
                      <GiCircle />
                    )}
                  </label>
                </li>
              </ul>
              <h3 className="text-4xl px-4">{order_information}</h3>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>
                  {temporary_calculation} ({cartItems?.length}{" "}
                  {cart_name_product})
                </p>
                <span className="text-3xl text-black">
                  {convertCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>{fee_shipping}</p>
                <span className="text-black text-3xl">0</span>
              </div>
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p> {reduced_shipping_fees}</p>
                <span className="text-black text-3xl">0</span>
              </div>
              <hr className="border-gray-300 border-t-2" />
              <div className="flex justify-between px-4 py-6 text-gray-500">
                <p>{total_price}</p>
                <span className="text-primary text-4xl">
                  {convertCurrency(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCreateOrder}
                className={`p-6 mt-8 opacity-100  cursor-pointer bg-primary w-full text-white uppercase text-2xl `}
              >
                {button_put_order}
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Order;
