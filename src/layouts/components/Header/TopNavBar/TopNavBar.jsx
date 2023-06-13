import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Container} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Tippy from '@tippyjs/react/headless';
import {useDispatch, useSelector} from "react-redux";

import styles from "./TopNavBar.module.scss";
import config from "~/config/index.jsx";
import {RiEnglishInput, RiLogoutCircleRLine} from "react-icons/ri";
import {AiFillStar} from "react-icons/ai";
import {FiUserPlus} from "react-icons/fi"
import {MdOutlineFavoriteBorder} from "react-icons/md"
import {TbBrandSamsungpass} from "react-icons/tb"
import {fetchUserInfo, selectUser, setAuthenticated} from "~/store/reducers/userSlice.js";
import AuthService from "~/services/auth/AuthService.jsx";


const cx = classNames.bind(styles);

TopNavBar.propTypes = {};

function TopNavBar(props) {
    const isDesktop = useMediaQuery({minWidth: 1024})
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token && token.accessToken) {
            if (AuthService.isTokenExpired(token)) {
                dispatch(setAuthenticated(false));
                AuthService.logout()
            } else {
                dispatch(setAuthenticated(true));
            }
        }


        dispatch(fetchUserInfo());
    }, [dispatch]);

    const handleLogout = () => {
        AuthService.logout();
        dispatch(setAuthenticated(false));
        navigate(config.routes.login)
    }


    return (
        <div className={cx('wrapper')}>
            <Container>
                <div className={cx('top-navbar-content')}>
                    <span className={cx('top-navbar-item')}>Tiết kiệm hơn với ứng dụng</span>
                    <Link to={""}>
                        <span className={cx('top-navbar-item')}>Bán hàng cùng Lazada</span>
                    </Link>
                    {
                        isDesktop && (
                            <span className={cx('top-navbar-item')}>Chăm sóc khác hàng</span>
                        )
                    }
                    <span className={cx('top-navbar-item')}>Kiểm tra đơn hàngg</span>

                    {
                        isDesktop && (
                            <span>
                                <Tippy
                                    interactive
                                    offset={[12, 1]}
                                    render={attrs => (
                                        <div className={cx('dropdown')} tabIndex="-1" {...attrs}>
                                        <span className={cx('dropdown-item')}>
                                            <AiFillStar/>
                                           Tiếng Việt
                                        </span>
                                            <span className={cx('dropdown-item')}>
                                            <RiEnglishInput/>
                                           Tiếng Anh
                                        </span>
                                        </div>
                                    )}
                                >
                                <span className={cx('top-navbar-item')}>change language</span>
                            </Tippy>
                         </span>

                        )
                    }
                    {
                        !isAuthenticated ? (
                            <>
                                <Link to={config.routes.login}>
                                    <span className={cx('top-navbar-item')}>Đăng nhập</span>
                                </Link>
                                <Link to={config.routes.register}>
                                    <span className={cx('top-navbar-item')}>Đăng ký</span>
                                </Link>
                            </>
                        ) : (
                            <Tippy
                                interactive
                                offset={[12, 1]}
                                render={attrs => (
                                    <div className={cx('dropdown')} tabIndex="-1" {...attrs}>
                                        <span className={cx('dropdown-item')}> <FiUserPlus/>Thông tin tài khoản</span>
                                        <span className={cx('dropdown-item')}> <MdOutlineFavoriteBorder/>Thông tin đơn hàng</span>
                                        <span className={cx('dropdown-item')}> <TbBrandSamsungpass/>Đổi mật khẩu</span>
                                        <span onClick={handleLogout}
                                              className={cx('dropdown-item')}> <RiLogoutCircleRLine/>Đăng xuất</span>

                                    </div>
                                )}
                            >
                                <span
                                    className={cx('top-navbar-item')}>Xin Chào: {user?.data.lastName + " " + user?.data.firstName}
                                </span>
                            </Tippy>
                        )
                    }
                </div>
            </Container>
        </div>
    );
}

export default TopNavBar;