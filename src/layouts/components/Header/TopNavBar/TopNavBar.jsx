import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Tippy from '@tippyjs/react/headless';

import styles from "./TopNavBar.module.scss";
import config from "~/config/index.jsx";
import {RiEnglishInput} from "react-icons/ri";
import {AiFillStar} from "react-icons/ai";
import {FiUserPlus} from "react-icons/fi"
import {MdOutlineFavoriteBorder} from "react-icons/md"
import {TbBrandSamsungpass} from "react-icons/tb"

const cx = classNames.bind(styles);

TopNavBar.propTypes = {};

function TopNavBar(props) {
    const [isUser, setIsUser] = useState(false)
    const isDesktop = useMediaQuery({minWidth: 1024})
    const userDropdown = [
        {id: 1, name: "Thông tin tài khoản", icon: <FiUserPlus/>},
        {id: 2, name: "Thông tin đơn hàng", icon: <MdOutlineFavoriteBorder/>},
        {id: 3, name: "Đổi mật khẩu", icon: <TbBrandSamsungpass/>},

    ]

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
                        !isUser ? (
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
                                        {
                                            userDropdown.map((item, index) => {
                                                return (
                                                    <span key={item.id} className={cx('dropdown-item')}>
                                                        {item.icon}
                                                        {item.name}
                                                    </span>
                                                )
                                            })
                                        }

                                    </div>
                                )}
                            >
                                <span className={cx('top-navbar-item')}>Xin Chào: Nguyễn Minh Huy</span>
                            </Tippy>
                        )
                    }
                </div>
            </Container>
        </div>
    );
}

export default TopNavBar;