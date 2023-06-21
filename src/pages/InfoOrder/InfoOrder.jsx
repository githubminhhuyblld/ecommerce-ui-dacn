import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

import styles from "./InfoOrder.module.scss";
import { RiMessage2Line } from "react-icons/ri";
import {
  fetchOrdersByUserId,
  selectOrdersByUserId,
} from "~/store/reducers/orderSlice";
import { selectUser } from "~/store/reducers/userSlice";
import config from "~/config";
import { convertCurrency } from "~/untils/convertCurrency";
import { AiOutlineArrowLeft } from "react-icons/ai";

const cx = classNames.bind(styles);

InfoOrder.propTypes = {};

function InfoOrder(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrdersByUserId);
  const user = useSelector(selectUser);
  const userId = user !== null && user?.data?.id;
  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

  const convertTimeStamp = (timestamp) => {
    const formattedDate = moment(timestamp)
      .tz("Asia/Ho_Chi_Minh")
      .format("DD [tháng] MM YYYY HH:mm:ss");
    return formattedDate;
  };
  const sidebarLeft = [
    {
      id: 1,
      title: "Quản lý tài khoản",
      children: [
        { id: 1, name: "Thông tin cá nhân", to: config.routes.account },
        { id: 2, name: "Số địa chỉ", to: "" },
        { id: 3, name: "  Tùy chọn thanh toán", to: "" },
      ],
    },
    {
      id: 2,
      title: "Đơn hàng của tôi",
      children: [
        { id: 1, name: "Đơn hàng đổi trả", to: "" },
        { id: 2, name: "Đona hàng hủy", to: "" },
      ],
    },
    {
      id: 2,
      title: "Nhận xét của tôi",
      children: [],
    },
    {
      id: 2,
      title: "Sản phẩm yêu thích & Gian hang đang theo dõi",
      children: [],
    },
  ];
  return (
    <div className="w-full bg-gray-200 p-8">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            {sidebarLeft.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className="md:text-2xl lg:text-3xl">{item.title}</h3>
                  <ul className="px-6 py-6 flex flex-col">
                    {item.children.map((child, index) => {
                      return (
                        <Link
                          to={child.to}
                          key={index}
                          className="text-gray-500 text-2xl py-2"
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {orders.length > 0 ? (
            <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
              <h3 className="text-5xl mb-10">Chi tiết đơn hàng</h3>
              {orders.map((order, index) => {
                return (
                  <div key={order.id} className="mt-10">
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key={index} className="w-full">
                          <div className="bg-white p-8">
                            <div className="flex sm:justify-between  justify-around">
                              <div className="flex flex-col md:flex-row items-center">
                                <h3 className="text-3xl font-bold mr-2">
                                  {item.shop.name}
                                </h3>
                                <span className="flex items-center mx-3 text-sky-500">
                                  <RiMessage2Line className="text-sky-500 cursor-pointer" />{" "}
                                  Trò chuyện ngay
                                </span>
                              </div>
                              <div className="p-2 flex items-center justify-center bg-sky-400 rounded-full">
                                <p className="text-sm sm:text-2xl   sm:px-2 text-white">
                                  {order.orderStatus === "PROCESSING"
                                    ? "Đang xác nhận"
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className=" bg-white w-full p-8 border-t-2 solid border-gray-300">
                            <div className="grid grid-cols-12">
                              <div className="col-span-12 lg:col-span-7">
                                <div className="flex items-center w-full">
                                  <div className="w-[120px] h-[120px] mr-5">
                                    <img
                                      className="w-full h-full object-contain rounded-lg"
                                      src={item.mainImage}
                                    />
                                  </div>
                                  <div className="w-full flex flex-col">
                                    <h3 className="text-[1.6rem] sm:text-[1.4rem] mb-3">
                                      {item.name}
                                    </h3>
                                    <span className="text-gray-400 text-2xl">
                                      {item.color && (
                                        <em>Màu sắc:{item.color}</em>
                                      )}
                                      {item.size && <em>, Size:{item.size}</em>}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 lg:col-span-3">
                                <div className="flex flex-col items-center">
                                  <span>{convertCurrency(item.newPrice)}</span>
                                </div>
                              </div>
                              <div className="col-span-12 lg:col-span-2">
                                <div className="flex flex-col items-center">
                                  <span>Số lượng</span>
                                  <p>{item.amount}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="w-full bg-white mt-4">
                      <div className="p-6">
                        <p className="text-2xl text-black ">
                          Đơn hàng {order.id}
                        </p>
                        <p className="text-2xl mt-2 text-gray-500">
                          Đặt ngày {convertTimeStamp(order.createAt)}
                        </p>
                        <p className="text-2xl text-gray-800 mt-2">
                          Trả tiền bới thanh toán khi nhận hàng
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-4">
                      <div className="col-span-12 md:col-span-6 bg-white p-4">
                        <div className="w-full ">
                          <h3 className="pt-2">Nguyễn Minh Huy</h3>
                          <div className="flex py-2 sm:flex-row">
                            <span className="bg-primary  flex items-center mr-3 text-lg md:text-lg py-0 px-4  text-white rounded-full">
                              Nhà riêng
                            </span>
                            <p className="text-2xl flex-1">{order.address}</p>
                          </div>
                          <span>0383476965</span>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 bg-white p-4">
                        <div className="w-full">
                          <h4 className="text-4xl mb-2">Tổng cộng</h4>
                          <div className="flex items-center justify-between">
                            <p>Tổng tiền:(1 Sản phẩm)</p>
                            <p>{convertCurrency(order.totalPrice)}</p>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <p>Phí vận chuyển:</p>
                            <p>0đ</p>
                          </div>
                          <div className="border-b-2 solid h-1"></div>
                          <div className="flex items-center justify-between mb-4 mt-4">
                            <p>Tổng cộng</p>
                            <p className="text-3xl text-primary">
                              {convertCurrency(order.totalPrice)}
                            </p>
                          </div>
                          <span className="text-2xl">
                            Thanh toán bằng hình thức Thanh toán khi nhận hàng
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="md:col-span-9 lg:col-span-10 sm:col-span-12 xs:col-span-12 col-span-12">
              <p className="text-4xl text-primary">Chưa có đơn hàng nào</p>
              <Link
                to={config.routes.home}
                className="p-5 mt-10 mb-12 flex w-full md:w-2/6 justify-center items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
              >
                <AiOutlineArrowLeft className="text-3xl mr-4" /> Tiếp tục mua
                hàng
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default InfoOrder;
