import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import {Avatar} from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';

import styles from "./Search.module.scss";
import {AiOutlineSearch} from "react-icons/ai"
import {selectSearchResults} from "~/store/reducers/searchSlice.js";
import {searchProducts} from "~/services/workspacesService.jsx";
import useDebounce from "~/hooks/useDebounce.js";


Search.propTypes = {};

const cx = classNames.bind(styles);

function Search(props) {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const dispatch = useDispatch();
    const results = useSelector(selectSearchResults);
    useEffect(() => {
        dispatch(searchProducts({page: 1, search: debouncedValue, size: 5}));
    }, [dispatch, debouncedValue]);
    console.log(results)

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleSearch = () => {
        if (searchValue.length > 0) {
            navigate(`/products/search/${searchValue}`);
            setShowResult(false)
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setShowResult(false);
            navigate(`/products/search/${searchValue}`);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Tippy
                visible={showResult && searchValue.length > 0}
                onClickOutside={handleHideResult}
                popperOptions={{strategy: "fixed"}}
                interactive
                placement="bottom-start"
                render={attrs => (
                    <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                        {results?.content?.length > 0 ? (
                            results?.content?.map((item, index) => {
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/product-detail/${item.id}`}
                                        className={cx("result-item")}
                                        onClick={() => setShowResult(false)}
                                    >
                                        <Avatar
                                            variant="square"
                                            sx={{width: 24, height: 24}}
                                            alt="Avatar"
                                            src={item.mainImage}
                                        />
                                        <h3 className={cx("product-name")}>{item.name}</h3>
                                    </Link>
                                );
                            })
                        ) : (
                            <p className={cx("empty")}>Không tìm thấy sản phẩm</p>
                        )}

                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input className={cx('search-input')}
                           spellCheck={false}
                           onChange={handleChange}
                           value={searchValue}
                           onKeyPress={handleKeyPress}
                           onFocus={() => setShowResult(true)}
                           type="text"
                           placeholder="Tìm kiếm trên Lazada"/>
                    <button className={cx('btn-search')} onClick={handleSearch}>
                        <AiOutlineSearch className={cx('search-icon')}/>
                    </button>
                </div>
            </Tippy>

        </div>
    );
}

export default Search;