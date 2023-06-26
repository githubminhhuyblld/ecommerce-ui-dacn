import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";

import styles from "~/pages/Account/Account.module.scss";
import { selectUser } from "~/store/reducers/userSlice";
import {
  fetchOrdersByUserId,
  selectOrdersByUserId,
} from "~/store/reducers/orderSlice";
import { convertCurrency } from "~/untils/convertCurrency.js";
import config from "~/config/index.jsx";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";

const cx = classNames.bind(styles);

function Account() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrdersByUserId);
  const email = user !== null && user?.email;
  const fullName = user !== null && user?.lastName + user?.firstName;
  const address = user !== null && user?.address;
  const userId = user !== null && user?.id;
  useEffect(() => {
    dispatch(fetchOrdersByUserId(userId));
  }, [dispatch, userId]);

  const defaultAddress =
    Array.isArray(address) && address?.find((item) => item.type === "DEFAULT");

  const columns = [
    {
      name: (
        <span style={{ color: "#757575", fontSize: "120%", textAlign: "left" }}>
          Đơn hàng số #
        </span>
      ),
      selector: (row) => row.id,
      style: {
        textAlign: "left",
      },
    },
    {
      name: (
        <span style={{ color: "#757575", fontSize: "120%", textAlign: "left" }}>
          Ngày đặt hàng
        </span>
      ),
      selector: (row) => Moment(row.createAt).format("DD/MM/yyyy"),
      style: {
        textAlign: "left",
      },
    },
    {
      name: (
        <span style={{ color: "#757575", fontSize: "120%", textAlign: "left" }}>
          Sản phẩm
        </span>
      ),
      selector: (row) => (
        <img
          style={{ width: "50px", height: "50px", margin: "20px" }}
          src={row.cartItems[0].mainImage}
          alt={""}
        />
      ),
      style: {
        textAlign: "left",
      },
    },
    {
      name: (
        <span style={{ color: "#757575", fontSize: "120%", textAlign: "left" }}>
          Tổng cộng
        </span>
      ),
      selector: (row) => convertCurrency(row.totalPrice),
      style: {
        textAlign: "left",
      },
    },
    {
      name: "",
      selector: (row) => (
        <Link style={{ color: "#1a9cb7" }} to={""}>
          QUẢN LÝ
        </Link>
      ),
      style: {
        textAlign: "left",
      },
    },
  ];

  return (
    <div className="w-full bg-gray-200 p-8">
      <Container>
        <div className="grid grid-cols-12 gap-4 py-12">
          <div className="md:col-span-3 px-2 lg:col-span-2 hidden md:block">
            <SidebarLeft />
          </div>
          <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
            <div className={cx("manageAccount")}>Quản lý tài khoản</div>
            <Grid container spacing={2}>
              <Grid
                className={cx("items")}
                item
                xl={4}
                lg={4}
                md={12}
                sm={12}
                xs={12}
              >
                <div className={cx("item")}>
                  <div className={cx("title", "fontSize110")}>
                    Thông tin cá nhân
                    <div className={cx("hl")}></div>
                    <Link
                      className={cx("edit", "fontSize70")}
                      to={config.routes.editProfile}
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                  <div
                    className={cx("colorGray", "fontSize90", "padding-t-b-2")}
                  >
                    {fullName}
                  </div>
                  <div
                    className={cx("colorGray", "fontSize90", "padding-t-b-2")}
                  >
                    {email}
                  </div>
                  <div className={cx("flex")}>
                    <input id={"promotion"} type={"checkbox"} />
                    <label
                      className={cx("hover-pointer", "fontSize80")}
                      htmlFor={"promotion"}
                    >
                      Nhận thông tin ưu đãi qua gmail
                    </label>
                  </div>
                </div>
              </Grid>
              <Grid
                className={cx("items")}
                item
                xl={8}
                lg={8}
                md={12}
                sm={12}
                xs={12}
              >
                <div className={cx("item")}>
                  <div className={cx("flex")}>
                    <div className={cx("flexItem")}>
                      <div className={cx("title", "fontSize110")}>
                        Số địa chỉ
                        <div className={cx("hl")}></div>
                        {address === null ? (
                          <Link
                            className={cx("edit", "fontSize70")}
                            to={config.routes.createAddress}
                          >
                            Thêm địa chỉ
                          </Link>
                        ) : (
                          <Link
                            className={cx("edit", "fontSize70")}
                            to={`/edit-address/${userId}`}
                          >
                            Chỉnh sửa
                          </Link>
                        )}
                      </div>
                      <div
                        className={cx(
                          "colorGray",
                          "fontSize80",
                          "padding-t-b-2",
                          "colorGray-75"
                        )}
                      >
                        Địa chỉ nhận hàng mặt định
                      </div>
                      {address?.length > 0 && (
                        <>
                          <div className={cx("fontBold", "padding-t-b-2")}>
                            {defaultAddress
                              ? defaultAddress.fullName
                              : address[0]?.fullName}
                          </div>
                          <div className={cx("fontSize80", "colorGray")}>
                            {defaultAddress
                              ? defaultAddress.fullAddress
                              : address[0]?.fullAddress}
                          </div>
                          <div className={cx("fontSize80", "colorGray")}>
                            (+84){" "}
                            {defaultAddress
                              ? defaultAddress.numberPhone
                              : address[0]?.numberPhone}
                          </div>
                        </>
                      )}
                    </div>
                    <div className={cx("hl-full")}></div>
                    <div className={cx("flexItem", "padding-l-20")}>
                      <div
                        className={cx(
                          "colorGray",
                          "fontSize80",
                          "padding-t-b-2",
                          "colorGray-75",
                          "padding-t-50"
                        )}
                      >
                        Địa chỉ thanh toán mặc định
                      </div>
                      {address?.length > 0 && (
                        <>
                          <div className={cx("fontBold", "padding-t-b-2")}>
                            {defaultAddress
                              ? defaultAddress.fullName
                              : address[0]?.fullName}
                          </div>
                          <div className={cx("fontSize80", "colorGray")}>
                            {defaultAddress
                              ? defaultAddress.fullAddress
                              : address[0]?.fullAddress}
                          </div>
                          <div className={cx("fontSize80", "colorGray")}>
                            (+84){" "}
                            {defaultAddress
                              ? defaultAddress.numberPhone
                              : address[0]?.numberPhone}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                className={cx("items")}
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <DataTable
                  title={
                    <div style={{ fontSize: "80%" }}>Đơn hàng gần đây</div>
                  }
                  columns={columns}
                  data={orders}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Account;
