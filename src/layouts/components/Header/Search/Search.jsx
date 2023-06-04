import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import {Avatar} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

import styles from "./Search.module.scss";
import {AiOutlineSearch} from "react-icons/ai"

Search.propTypes = {};

const cx = classNames.bind(styles);

function Search(props) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [products, setProducts] = useState([])
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <div className={cx('wrapper')}>
            <Tippy
                visible={showResult && searchValue.length > 0}
                onClickOutside={handleHideResult}
                interactive
                placement="bottom-start"
                render={attrs => (
                    <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                        <Link
                            to={``}
                            className={cx("result-item")}>

                            <Avatar
                                variant="circular"
                                sx={{ width: 24, height: 24 }}
                                alt="Avatar"
                                src={""}
                            />
                            <h3 className={cx("product-name")}>[Hoàn Tiền 15%] [KÈM VIDEO] Áo Nữ Tay Lỡ Dáng Croptop Cổ Ve Kiểu Dáng Trẻ Trung Thời Trang JayStore TOP NU 010</h3>
                        </Link>

                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input className={cx('search-input')}
                           spellCheck={false}
                           onChange={handleChange}
                           value={searchValue}
                           onFocus={() => setShowResult(true)}
                           type="text"
                           placeholder="Tìm kiếm trên Lazada"/>
                    <button className={cx('btn-search')}>
                        <AiOutlineSearch className={cx('search-icon')}/>
                    </button>
                </div>
            </Tippy>

        </div>
    );
}

export default Search;