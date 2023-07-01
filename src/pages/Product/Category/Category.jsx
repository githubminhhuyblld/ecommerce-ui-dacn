import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./Category.module.scss";
import { selectCategories } from "~/store/reducers/categoriesSlice.js";
import { fetchCategories } from "~/services/workspacesService.jsx";
import { MenuCategoryIcon } from "~/components/Icon/index.jsx";
import CategoryItem from "~/pages/Product/CategoryItem/CategoryItem.jsx";
import LanguageContext from "~/context/languageContext";

const cx = classNames.bind(styles);

function Category(props) {

  const { languageData } = useContext(LanguageContext);
  const { all_category } = languageData;
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(id);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, id]);
  const handleGetData = (data) => {
    setActiveCategoryId(data.id);
  };


  return (
    <div className={cx("wrapper")}>
      <div className={cx("category-header")}>
        <MenuCategoryIcon className={cx("menu-icon")} />
        <h3 className={cx("header-text")}>{all_category}</h3>
      </div>
      <div className={cx("divider")}></div>
      <CategoryItem
        activeCategoryId={activeCategoryId}
        getData={handleGetData}
        data={categories?.data?.length > 0 ? categories?.data : []}
      />
    </div>
  );
}

export default Category;
