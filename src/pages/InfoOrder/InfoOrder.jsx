import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import { animateScroll as scroll } from "react-scroll";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import { Pagination } from "@mui/material";

import styles from "./InfoOrder.module.scss";
import { RiMessage2Line } from "react-icons/ri";
import {
  fetchOrdersByUserId,
  selectOrderSuccess,
  selectOrdersByUserId,
  setOrderStatusSuccess,
  updateOrderCanceled,
} from "~/store/reducers/orderSlice";
import { selectUser } from "~/store/reducers/userSlice";
import config from "~/config";
import { convertCurrency } from "~/untils/convertCurrency";
import { AiOutlineArrowLeft } from "react-icons/ai";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import { CiDeliveryTruck } from "react-icons/ci";
import LanguageContext from "~/context/languageContext";
import { createPayment } from "~/store/reducers/paymentSlice";
import { createComment } from "~/store/reducers/commentSlice";
import AuthService from "~/services/auth/AuthService";
import convertTimeStamp from "~/untils/convertTimeStamp";

const cx = classNames.bind(styles);

InfoOrder.propTypes = {};
const steps = ["Chờ xác nhận", "Đang giao hàng", "Đã giao hàng"];
const PAGE_SIZE = 2;

function InfoOrder(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    order_detail,
    chat_now,
    orders_are_being_delivered,
    info_order_color,
    info_order_quantity,
    info_order,
    set_date,
    cancel_order,
    no_orders_yet,
    order_method_payment,
    method_pay_receive,
    info_home,
    total_price,
    td_order_total_price,
    fee_shipping,
    continue_to_buy,
    cart_name_product,
    wait_for_confirmation,
    confirmed,
    canceled,
  } = languageData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrdersByUserId);
  const user = useSelector(selectUser);
  const userId = user !== null && user?.id;
  const success = useSelector(selectOrderSuccess);
  useEffect(() => {
    if (AuthService.getCurrentUserId() !== null) {
      dispatch(
        fetchOrdersByUserId({
          userId: AuthService.getCurrentUserId(),
          page: 0,
          size: PAGE_SIZE,
        })
      );
    }
  }, [dispatch, userId, success]);

  const handleCancelOrder = (orderId) => {
    dispatch(
      updateOrderCanceled({
        userId: AuthService.getCurrentUserId(),
        orderId: orderId,
      })
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
  const handleStepper = (order) => {
    if (order.orderStatus === "PROCESSING") {
      return 0;
    }
    if (order.orderStatus === "READY") {
      return 1;
    }

    if (order.orderStatus === "DELIVERED") {
      return 2;
    }
  };
  const handlePaymentOrder = (orderId, totalPrice) => {
    dispatch(createPayment({ amount: totalPrice, orderInfo: orderId })).then(
      (paymentResponse) => {
        if (paymentResponse.payload.data !== null) {
          window.location.href = paymentResponse.payload.data;
        }
      }
    );
  };
  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
    setTimeout(() => {
      scroll.scrollToTop();
    }, 100);
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleSubmit = (productId, orderId) => {
    if(AuthService.getCurrentUser() != null){
      const body = {
        productId: productId,
        content: comment,
        userId: userId,
        rating: rating,
        orderId: orderId,
      };
      dispatch(createComment({ body: body })).then((response) => {
        if (response.payload === 200) {
          alert("Bạn đã đánh giá thành công!");
          setHasReviewed(true);
        }
      });
    }
    else{
      navigate(config.routes.login);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const totalItems = orders?.totalElements;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(
      fetchOrdersByUserId({
        userId: AuthService.getCurrentUserId(),
        page: newPage,
        size: PAGE_SIZE,
      })
    );
    scroll.scrollToTop();
  };

  return (
    <div className="w-full bg-gray-200 p-8">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          {orders?.content?.length > 0 ? (
            <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
              <h3 className="text-5xl mb-10">{order_detail}</h3>
              {orders?.content?.map((order, index) => {
                return (
                  <div key={index} className="mt-10">
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key={index} className="w-full">
                          <div className="bg-white p-8">
                            <div className="flex sm:justify-between  justify-around">
                              <div className="flex flex-col lg:flex-row items-center">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={item.shop.image}
                                  sx={{ width: 32, height: 32 }}
                                />
                                <h3 className="md:text-3xl text-xl font-bold mx-2">
                                  {item.shop.name}
                                </h3>
                                <span className="flex items-center md:text-3xl text-xl  mx-3 text-sky-500">
                                  <RiMessage2Line className="text-sky-500 cursor-pointer" />
                                  {chat_now}
                                </span>
                              </div>
                              <div className="flex items-center flex-col md:flex-row ">
                                {order.orderStatus === "READY" && (
                                  <div className="flex item-center">
                                    <CiDeliveryTruck className=" text-xl md:text-4xl mr-4 text-green-700" />
                                    <span className="text-green-700 text-xl md:text-3xl mr-3">
                                      {orders_are_being_delivered}
                                    </span>
                                  </div>
                                )}
                                <div
                                  className={`p-2 flex items-center justify-center ${
                                    order.orderStatus === "CANCELED"
                                      ? "bg-red-500"
                                      : order.orderStatus === "DELIVERED"
                                      ? "bg-green-500"
                                      : "bg-sky-400"
                                  }   rounded-full`}
                                >
                                  <p className=" text-xl md:text-3xl   sm:px-2 text-white">
                                    {order.orderStatus === "PROCESSING"
                                      ? `${wait_for_confirmation}`
                                      : order.orderStatus === "READY"
                                      ? `${confirmed} `
                                      : order.orderStatus === "DELIVERED"
                                      ? `Đã giao hàng `
                                      : order.orderStatus === "CANCELED"
                                      ? `${canceled}`
                                      : order.paymentType === "TRANSFER" &&
                                        order.orderStatus === "UNPAID"
                                      ? `Đang chờ thanh toán`
                                      : order.orderStatus === "READY" &&
                                        order.paymentStatus === "PAID"
                                      ? `Chờ nhận hàng`
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className=" bg-white w-full p-8 border-t-2 solid border-gray-300">
                            <div className="grid grid-cols-12">
                              <div className="col-span-12 lg:col-span-7">
                                <div className="flex items-center w-full">
                                  <div
                                    onClick={() =>
                                      handleProductClick(item.productId)
                                    }
                                    className="w-[120px] h-[120px] mr-5 cursor-pointer"
                                  >
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
                                        <em>
                                          {info_order_color}:{item.color}
                                        </em>
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
                                  <span>{info_order_quantity}</span>
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
                          {info_order} {order.id}
                        </p>
                        <p className="text-2xl mt-2 text-gray-500">
                          {set_date} {convertTimeStamp(order.createAt)}
                        </p>
                        <p className="text-2xl text-gray-800 mt-2">
                          method_pay_receive
                          {order.paymentType === "PAYMENT_ON_DELIVERY"
                            ? `${method_pay_receive}`
                            : "Thanh toán bằng tài khoản"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-4">
                      <div className="col-span-12 md:col-span-6 bg-white p-4">
                        <div className="w-full ">
                          <h3 className="pt-2">{order.name}</h3>
                          <div className="flex flex-col py-2 ">
                            <div className="w-auto mb-4">
                              <span className="bg-primary   mr-3 text-lg md:text-lg py-1 px-4  text-white rounded-full">
                                {info_home}
                              </span>
                            </div>
                            <p className="text-2xl flex-1">{order.address}</p>

                            <span>(84+) {order.numberPhone}</span>
                            {order.orderStatus === "DELIVERED" || order.orderStatus === "READY" && (
                              <div className="my-6">
                                <Box sx={{ width: "100%" }}>
                                  <Stepper
                                    activeStep={handleStepper(order)}
                                    alternativeLabel
                                  >
                                    {steps.map((label) => (
                                      <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                      </Step>
                                    ))}
                                  </Stepper>
                                </Box>
                              </div>
                            )}

                            {order.orderStatus === "READY" ||
                              (order.orderStatus === "PROCESSING" && (
                                <div className="my-8">
                                  <span
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="bg-red-500 p-4 text-white cursor-pointer hover:bg-red-700 rounded-xl"
                                  >
                                    {cancel_order}
                                  </span>
                                </div>
                              ))}
                            {order.orderStatus === "UNPAID" && (
                              <div className="my-8">
                                <span
                                  onClick={() =>
                                    handlePaymentOrder(
                                      order.id,
                                      order.totalPrice
                                    )
                                  }
                                  className="bg-green-500 p-4 text-white cursor-pointer hover:bg-green-700 rounded-xl"
                                >
                                  Thanh toán ngay
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-6 bg-white p-4">
                        <div className="w-full">
                          <h4 className="text-4xl mb-2">{total_price}</h4>
                          <div className="flex items-center justify-between">
                            <p>
                              {td_order_total_price}:({order.cartItems.length}{" "}
                              {cart_name_product})
                            </p>
                            <p>{convertCurrency(order.totalPrice)}</p>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <p>{fee_shipping}:</p>
                            <p>0đ</p>
                          </div>
                          <div className="border-b-2 solid h-1"></div>
                          <div className="flex items-center justify-between mb-4 mt-4">
                            <p>{total_price}</p>
                            <p className="text-3xl text-primary">
                              {convertCurrency(order.totalPrice)}
                            </p>
                          </div>
                          <span className="text-2xl">
                            {order_method_payment} {method_pay_receive}
                          </span>
                        </div>
                      </div>
                      {order.cartItems[0].comment === "UNCOMMENTED" &&
                        order.orderStatus === "DELIVERED" &&
                        !hasReviewed && (
                          <div className="bg-white col-span-12 flex flex-col   ">
                            <div className="px-6">
                              <h1 className="mb-4 text-xl font-bold mt-4">
                                Đánh giá sản phẩm
                              </h1>

                              <div className="mb-4 text-4xl">
                                <Rating
                                  name="simple-controlled"
                                  value={rating}
                                  onChange={(event, newValue) => {
                                    setRating(newValue);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="w-full p-6">
                              <textarea
                                className="mb-4 p-2 w-full border rounded "
                                rows={4}
                                placeholder="Nhận xét của bạn"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div>

                            <button
                              className="px-4  m-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                              onClick={() =>
                                handleSubmit(
                                  order.cartItems[0].productId,
                                  order.id
                                )
                              }
                            >
                              Gửi đánh giá
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}
              <div className="py-20 bg-white flex justify-center items-center">
                <Pagination
                  count={totalPages || 0}
                  page={currentPage + 1}
                  onChange={(event, newPage) =>
                    handleChangePage(event, newPage - 1)
                  }
                  size="large"
                  color="primary"
                />
              </div>
            </div>
          ) : (
            <div className="md:col-span-9 lg:col-span-10 sm:col-span-12 xs:col-span-12 col-span-12">
              <p className="text-4xl text-primary">{no_orders_yet}</p>
              <Link
                to={config.routes.home}
                className="p-5 mt-10 mb-12 flex w-full md:w-2/6 justify-center items-center text-[16px] bg-sky-400 opacity-100 rounded-2xl text-white hover:opacity-80"
              >
                <AiOutlineArrowLeft className="text-3xl mr-4" />{" "}
                {continue_to_buy}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default InfoOrder;
