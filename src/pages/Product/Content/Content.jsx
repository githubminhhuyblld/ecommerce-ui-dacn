import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
} from "@material-ui/core";
import { Grid, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Content.module.scss";
import ProductItem from "~/pages/Product/ProductItem/ProductItem.jsx";
import {
  productsCategorySlice,
  selectLoadingCategory,
  selectProductsCategory,
} from "~/store/reducers/ProductsCategorySlice.js";
import { selectSearchLoading, selectSearchResults } from "~/store/reducers/searchSlice.js";
import {
  fetchProductsByCategoryId,
  searchProducts,
} from "~/services/workspacesService.jsx";

Content.propTypes = {
  setIsCategoryId: PropTypes.func,
};
const cx = classNames.bind(styles);

const PAGE_SIZE = 8;

function Content(props) {
  const [selectedValue, setSelectedValue] = useState("option1");
  const { id, search } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsCategory);
  const resultsSearch = useSelector(selectSearchResults);
  const isLoadingCategory = useSelector(selectLoadingCategory);
  const isLoadingSearch = useSelector(selectSearchLoading)
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (id !== "search") {
      dispatch(
        fetchProductsByCategoryId({
          categoryId: id,
          page: currentPage,
          size: PAGE_SIZE,
        })
      );
    }
  }, [dispatch, id, currentPage, search]);

  useEffect(() => {
    setCurrentPage(0);
    dispatch(productsCategorySlice.actions.resetData());
    if (id === "search") {
      dispatch(searchProducts({ page: 0, search, size: PAGE_SIZE }));
    } else {
      dispatch(
        fetchProductsByCategoryId({ categoryId: id, page: 0, size: PAGE_SIZE })
      );
    }
  }, [dispatch, id, search]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    if (id === "search") {
      dispatch(
        searchProducts({ page: newPage, search: search, size: PAGE_SIZE })
      );
    } else {
      dispatch(
        fetchProductsByCategoryId({
          categoryId: id,
          page: newPage,
          size: PAGE_SIZE,
        })
      );
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const displayProducts =
    id === "search" ? resultsSearch?.content : products?.content;
  const totalItems =
    id === "search" ? resultsSearch?.totalElements : products?.totalElements;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("filter")}>
        <div
          style={
            id
              ? { justifyContent: "space-between" }
              : { justifyContent: "flex-end" }
          }
          className={cx("function-header")}
        >
          <p className={cx("result")}>
            {products?.totalElements || resultsSearch?.totalElements} mặt hàng
            được tìm kiếm theo {search}
          </p>
          <div className={cx("filter-item")}>
            <span className={cx("label")}>Sắp xếp theo:</span>
            <FormControl className={cx("item")} variant="outlined">
              <Select
                labelId="select-label"
                id="select"
                variant="outlined"
                value={selectedValue}
                onChange={handleChange}
                style={{
                  fontSize: "14px",
                  backgroundColor: "var(--white-color)",
                }}
              >
                <MenuItem style={{ fontSize: "14px" }} value="option1">
                  Phù hợp nhất
                </MenuItem>
                <MenuItem style={{ fontSize: "14px" }} value="option2">
                  Giá từ thấp đến cao
                </MenuItem>
                <MenuItem style={{ fontSize: "14px" }} value="option3">
                  Giá từ cao xuống thấp
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {isLoadingCategory || isLoadingSearch ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          {products?.content?.length > 0 ||
          resultsSearch?.content?.length > 0 ? (
            <div className={cx("content")}>
              <Grid container spacing={2}>
                {displayProducts?.map((item) => (
                  <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
                    <ProductItem product={item} />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div className={cx("empty")}>Không tìm thấy sản phẩm</div>
          )}
          {displayProducts?.length > 0 && (
            <div className={cx("pagination")}>
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
          )}
        </>
      )}
    </div>
  );
}

export default Content;
