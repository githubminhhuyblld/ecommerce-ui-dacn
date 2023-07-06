import React, {useContext, useEffect, useState} from "react";
import classNames from "classnames/bind";
import {Container, Grid} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import Moment from "moment";

import styles from "~/pages/Account/Account.module.scss";
import {selectUser} from "~/store/reducers/userSlice";
import {
    fetchOrdersByUserId,
    selectOrdersByUserId,
} from "~/store/reducers/orderSlice";
import {convertCurrency} from "~/untils/convertCurrency.js";
import config from "~/config/index.jsx";
import SidebarLeft from "~/layouts/components/SidebarLeft/SidebarLeft";
import {selectSuccessAddress} from "~/store/reducers/locationSlice";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

function Account() {

    const {languageData} = useContext(LanguageContext);
    const {
        sidebar_account_management,
        personal_information,
        info_edit,
        receive_special_offers_via_gmail,
        info_address,
        button_add_address,
        default_shipping_address,
        default_billing_address,
        recent_orders,
        order_code,
        order_date,
        cart_name_product,
        total_price,
        manage,
    } = languageData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const orders = useSelector(selectOrdersByUserId);
    const email = user !== null && user?.email;
    const fullName = user !== null && user?.lastName + user?.firstName;
    const address = user !== null && user?.address;
    const userId = user !== null && user?.id;
    const success = useSelector(selectSuccessAddress);
    useEffect(() => {
        dispatch(fetchOrdersByUserId(userId));
    }, [dispatch, userId]);

    const defaultAddress =
        Array.isArray(address) && address?.find((item) => item.type === "DEFAULT");

    const columns = [
        {
            name: (
                <span style={{color: "#757575", fontSize: "120%", textAlign: "left"}}>
          {order_code} #
        </span>
            ),
            selector: (row) => row.id,
            style: {
                textAlign: "left",
            },
        },
        {
            name: (
                <span style={{color: "#757575", fontSize: "120%", textAlign: "left"}}>
          {order_date}
        </span>
            ),
            selector: (row) => Moment(row.createAt).format("DD/MM/yyyy"),
            style: {
                textAlign: "left",
            },
        },
        {
            name: (
                <span style={{color: "#757575", fontSize: "120%", textAlign: "left"}}>
          {cart_name_product}
        </span>
            ),
            selector: (row) => (
                <img
                    style={{width: "50px", height: "50px", margin: "20px"}}
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
                <span style={{color: "#757575", fontSize: "120%", textAlign: "left"}}>
          {total_price}
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
                <Link style={{color: "#1a9cb7"}} to={""}>
                    {manage}
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
                        <SidebarLeft/>
                    </div>
                    <div className="col-span-12 md:col-span-9 lg:col-span-10 sm:col-span-12">
                        <div className={cx("manageAccount")}>{sidebar_account_management}</div>
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
                                        {personal_information}
                                        <div className={cx("hl")}></div>
                                        <Link
                                            className={cx("edit", "fontSize70")}
                                            to={`/edit-profile/${userId}`}
                                        >
                                            {info_edit}
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
                                        <input id={"promotion"} type={"checkbox"}/>
                                        <label
                                            className={cx("hover-pointer", "fontSize80")}
                                            htmlFor={"promotion"}
                                        >
                                            {receive_special_offers_via_gmail}
                                        </label>
                                    </div>
                                </div>
                            </Grid>
                            <Grid
                                className={cx("items")}
                                item
                                container
                                xl={8}
                                lg={8}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Grid className={cx('item')}
                                      item
                                      xl={6}
                                      lg={6}
                                      md={12}
                                      sm={12}
                                      xs={12}>
                                    <div className={cx("title", "fontSize110")}>
                                        {info_address}
                                        <div className={cx("hl")}></div>
                                        {address === null ? (
                                            <Link
                                                className={cx("edit", "fontSize70")}
                                                to={config.routes.createAddress}
                                            >
                                                {button_add_address}
                                            </Link>
                                        ) : (
                                            <Link
                                                className={cx("edit", "fontSize70")}
                                                to={`/edit-address/${address?.[0]?.id}`}
                                            >
                                                {info_edit}
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
                                        {default_shipping_address}
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
                                </Grid>
                                <Grid className={cx('item')}
                                      item
                                      xl={6}
                                      lg={6}
                                      md={12}
                                      sm={12}
                                      xs={12}>
                                    <div
                                        className={cx(
                                            "colorGray",
                                            "fontSize80",
                                            "padding-t-b-2",
                                            "colorGray-75",
                                            "padding-t-50"
                                        )}
                                    >
                                        {default_billing_address}
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
                                </Grid>
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
                                        <div style={{fontSize: "80%"}}>{recent_orders}</div>
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
