import React, { useContext, useEffect, useState } from "react";
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
import {
  selectSearchLoading,
  selectSearchResults,
} from "~/store/reducers/searchSlice.js";
import {
  fetchProductsByCategoryId,
  searchProducts,
} from "~/services/workspacesService.jsx";
import LanguageContext from "~/context/languageContext";
import convertNameToEnglish from "~/untils/convertLanguage";

Content.propTypes = {
  setIsCategoryId: PropTypes.func,
};
const cx = classNames.bind(styles);

const PAGE_SIZE = 8;

function Content(props) {
  const { languageData } = useContext(LanguageContext);
  const {
    sorted_by,
    best_match,
    low_to_high,
    high_to_low,
    no_products_found,
    items_searched_by,
  } = languageData;

  const [selectedValue, setSelectedValue] = useState("All");
  const { id, search } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsCategory);
  const resultsSearch = useSelector(selectSearchResults);
  const isLoadingCategory = useSelector(selectLoadingCategory);
  const isLoadingSearch = useSelector(selectSearchLoading);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
  useEffect(() => {
    const displayProducts =
      id === "search" ? resultsSearch?.content : products?.content;
    const totalItems =
      id === "search" ? resultsSearch?.totalElements : products?.totalElements;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    setDisplayProducts(displayProducts);
    setTotalItems(totalItems);
    setTotalPages(totalPages);
  }, [products, resultsSearch, id]);

  const handleChangeFilter = async (event) => {
    const value = event.target.value;
    switch (value) {
      case "All":
        setSelectedValue("All");
        setDisplayProducts(
          [...displayProducts].sort((a, b) => {
            return a.id - b.id;
          })
        );
        break;
      case "priceAsc":
        setSelectedValue("priceAsc");
        setDisplayProducts(
          [...displayProducts].sort((a, b) => {
            return a.newPrice - b.newPrice;
          })
        );
        break;
      case "priceDesc":
        setSelectedValue("priceDesc");
        setDisplayProducts(
          [...displayProducts].sort((a, b) => {
            return b.newPrice - a.newPrice;
          })
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("filter")}>
        <div
          style={
            id
              ? { justifyContent: "space-between" }
              : { justifyContent: "flex-start" }
          }
          className={cx("function-header")}
        >
          <p className={cx("result")}>
            {products?.totalElements || resultsSearch?.totalElements}{" "}
            {items_searched_by} {convertNameToEnglish(id, languageData)}
          </p>
          <div className={cx("filter-item")}>
            <div className="flex flex-col md:flex-row md:items-center">
              <span style={{textAlign:"left"}} className={cx("label")}>{sorted_by}</span>
              <FormControl
                size="small"
                className={cx("item")}
                variant="outlined"
              >
                <Select
                  labelId="select-label"
                  id="select"
                  variant="outlined"
                  value={selectedValue}
                  onChange={handleChangeFilter}
                  style={{
                    fontSize: "14px",
                    backgroundColor: "var(--white-color)",
                  }}
                >
                  <MenuItem style={{ fontSize: "14px" }} value="All">
                    {best_match}
                  </MenuItem>
                  <MenuItem style={{ fontSize: "14px" }} value="priceAsc">
                    {low_to_high}
                  </MenuItem>
                  <MenuItem style={{ fontSize: "14px" }} value="priceDesc">
                    {high_to_low}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
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
            <div className={cx("empty")}> {no_products_found} </div>
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
