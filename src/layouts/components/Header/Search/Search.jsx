import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { getProductBySearch } from "~/services/workspacesService.jsx";
import useDebounce from "~/hooks/useDebounce.js";
import LanguageContext from "~/context/languageContext";

Search.propTypes = {};

const cx = classNames.bind(styles);

function Search(props) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const debouncedValue = useDebounce(searchValue, 500);
  const [searchResult, setSearchResults] = useState([]);
  useEffect(() => {
    getProductBySearch({ page: 0, search: debouncedValue, size: 5 })
      .then((res) => setSearchResults(res))
      .catch((error) => {
        if (error.response.status === 404) {
          setSearchResults([]);
        }
      });
  }, [debouncedValue]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleSearch = () => {
    if (searchValue.length > 0) {
      navigate(`/products/search/${searchValue}`);
      setShowResult(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShowResult(false);
      navigate(`/products/search/${searchValue}`);
    }
  };

  const { languageData } = useContext(LanguageContext);
  const {
    search_in_lazada,
  } = languageData;

  return (
    <div className={cx("wrapper")}>
      <Tippy
        visible={showResult && searchValue.length > 0}
        onClickOutside={handleHideResult}
        popperOptions={{ strategy: "fixed" }}
        interactive
        placement="bottom-start"
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            {searchResult?.content?.length > 0 ? (
              searchResult?.content?.map((item, index) => {
                return (
                  <Link
                    key={item.id}
                    to={`/product-detail/${item.id}`}
                    className={cx("result-item")}
                    onClick={() => setShowResult(false)}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{ width: 32, height: 32 }}
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
        <div className={cx("search")}>
          <input
            className={cx("search-input")}
            spellCheck={false}
            onChange={handleChange}
            value={searchValue}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowResult(true)}
            type="text"
            placeholder={`${search_in_lazada}`}
          />
          <button className={cx("btn-search")} onClick={handleSearch}>
            <AiOutlineSearch className={cx("search-icon")} />
          </button>
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
