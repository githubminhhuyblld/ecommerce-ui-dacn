import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import moment from "moment";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./OrdersTable.module.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { convertCurrency } from "~/untils/convertCurrency";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  deleteOrder,
  setOrderStatusSuccess,
  updateOrderCanceled,
  updateOrderReady,
} from "~/store/reducers/orderSlice";
const cx = classNames.bind(styles);

OrdersTable.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.array,
};
function OrdersTable(props) {
  const { title, orders } = props;
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const convertTimeStamp = (timestamp) => {
    const formattedDate = moment(timestamp)
      .tz("Asia/Ho_Chi_Minh")
      .format("DD [tháng] MM YYYY HH:mm:ss");
    return formattedDate;
  };

  const handleCancelOrder = (orderId) => {
    dispatch(
      updateOrderCanceled({ userId: token.userId, orderId: orderId })
    ).then((response) => {
      if (response.payload === 200) {
        dispatch(setOrderStatusSuccess((prev) => !prev));
        toast.success("Hủy đơn hàng thành công thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  const handleReadyOrder = (orderId) => {
    dispatch(updateOrderReady({ userId: token.userId, orderId: orderId })).then(
      (response) => {
        if (response.payload === 200) {
          console.log(response);
          dispatch(setOrderStatusSuccess((prev) => !prev));
          toast.success("Xác nhận đơn hàng thành công thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    );
  };
  const handleRemoveOrderId = (orderId) => {
    dispatch(deleteOrder({ userId: token.userId, orderId: orderId })).then(
      (response) => {
        if (response.payload === 200) {
          dispatch(setOrderStatusSuccess((prev) => !prev));
          toast.success("Xóa đơn hàng thành công thành công!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    );
  };
  return (
    <div className="w-full p-6">
      <h3 className=" p-4 bg-sky-200 rounded-lg text-4xl text-gray-700 mb-8">
        {title}
      </h3>
      {orders?.map((order, index) => {
        return (
          <div
            key={order.id}
            className="bg-white p-4 w-full rounded-lg shadow-2xl mb-8 "
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-3">
                <span className="text-2xl flex-1">Mã đơn hàng:{order.id}</span>
                <div className="flex items-center">
                  {order.orderStatus === "READY" && (
                    <div className="flex item-center">
                      <CiDeliveryTruck className="text-4xl mr-4 text-green-700" />
                      <span className="text-green-700 text-3xl mr-3">
                        Đơn hàng đang được giao
                      </span>
                    </div>
                  )}
                  <span
                    className={`py-2 px-4 text-white text-xl md:text-3xl rounded-full  ${
                      order.orderStatus === "CANCELED"
                        ? "bg-red-500"
                        : order.orderStatus === "DELIVERED"
                        ? "bg-green-500"
                        : "bg-sky-500"
                    }`}
                  >
                    {order.orderStatus === "PROCESSING"
                      ? "Chờ xác nhận"
                      : order.orderStatus === "READY"
                      ? "Đã xác nhận"
                      : order.orderStatus === "DELIVERED"
                      ? "Đã giao hàng"
                      : order.orderStatus === "CANCELED"
                      ? "Đã hủy đơn"
                      : order.paymentType === "TRANSFER" &&
                        order.orderStatus === "UNPAID"
                      ? `Đang chờ thanh toán`
                      : ""}
                  </span>
                </div>
              </div>
              {order.cartItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" p-4 flex flex-col items-center  md:flex-row  md:justify-center border-t-2 border-b-2 border-gray-300"
                  >
                    <div className="w-[80px] h-[80px] mb-6">
                      <img
                        className="w-full h-full object-cover"
                        alt={item.name}
                        src={item.mainImage}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="px-6 flex flex-col justify-center ">
                        <p className="text-2xl md:text-2xl  mb-2">
                          {item.name}
                        </p>
                        <span className="text-2xl mb-2">x{item.amount}</span>
                        {item.color && <em> Màu:{item.color}</em>}
                        {item.size && <em> Size:{item.size}</em>}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="line-through text-gray-400 text-3xl">
                        {convertCurrency(item.oldPrice)}
                      </span>
                      <span className="text-primary ml-3 text-3xl">
                        {convertCurrency(item.newPrice)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="py-6">
                <div className="flex items-center justify-center text-center  md:justify-start">
                  <span>Người đặt: {order.name}</span>
                </div>
                <div className="flex items-center justify-center text-center  md:justify-start">
                  <span>Số điện thoại: {order.numberPhone}</span>
                </div>

                <div className="flex items-center justify-center text-center  md:justify-start">
                  <span>
                    Ngày tạo đơn hàng: {convertTimeStamp(order.createAt)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div className="flex  flex-col lg:flex-row ">
                    <p className="text-2xl text-center md:text-left">
                      Địa chỉ giao hàng:
                    </p>
                    <p className="text-2xl text-center md:text-left">
                      {order.address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <AiFillDollarCircle className="text-5xl text-primary" />
                    <p className="text-2xl md:text-4xl ">
                      Thành tiền:{" "}
                      <span className="text-primary">
                        {convertCurrency(order.totalPrice)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  {order.orderStatus === "READY" && (
                    <span
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-red-500 p-4 text-white cursor-pointer hover:bg-red-700 rounded-xl"
                    >
                      Hủy đơn hàng
                    </span>
                  )}
                  {order.orderStatus === "PROCESSING" && (
                    <span
                      onClick={() => handleReadyOrder(order.id)}
                      className="bg-green-500 p-4 text-white cursor-pointer hover:bg-green-700 rounded-xl"
                    >
                      Xác nhận đơn hàng
                    </span>
                  )}
                  {order.orderStatus === "CANCELED" && (
                    <span
                      onClick={() => handleRemoveOrderId(order.id)}
                      className="bg-red-500 p-4 text-white cursor-pointer hover:bg-red-700 rounded-xl"
                    >
                      Xóa đơn hàng
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersTable;
