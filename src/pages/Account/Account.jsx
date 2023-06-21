import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import styles from "~/pages/Account/Account.module.scss";
import { selectUser } from "~/store/reducers/userSlice";
import {
  fetchOrdersByUserId,
  selectOrdersByUserId,
} from "~/store/reducers/orderSlice";

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
  console.log(orders);

  const defaultAddress =
    Array.isArray(address) && address?.find((item) => item.type === "DEFAULT");

  console.log(user);
  const columns = [
    {
      name: (
        <span style={{ color: "#757575", fontSize: "120%", textAlign: "left" }}>
          Đơn hàng số #
        </span>
      ),
      selector: (row) => row.oid,
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
      selector: (row) => row.year,
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
          src={row.image}
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
      selector: (row) => "đ " + row.total,
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

  const data = [
    {
      id: 1,
      oid: 13123123123,
      year: "17/02/2023",
      image:
        "data:image/jpeg;base64,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",
      total: 30000000,
    },
    {
      id: 2,
      oid: 23215456541,
      year: "05/06/2023",
      image:
        "data:image/jpeg;base64,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",
      total: 32000000,
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <Container>
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
                <Link className={cx("edit", "fontSize70")} to={""}>
                  Chỉnh sửa
                </Link>
              </div>
              <div className={cx("colorGray", "fontSize90", "padding-t-b-2")}>
                {fullName}
              </div>
              <div className={cx("colorGray", "fontSize90", "padding-t-b-2")}>
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
                    <Link className={cx("edit", "fontSize70")} to={""}>
                      Chỉnh sửa
                    </Link>
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
              title={<div style={{ fontSize: "80%" }}>Đơn hàng gần đây</div>}
              columns={columns}
              data={data}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Account;
