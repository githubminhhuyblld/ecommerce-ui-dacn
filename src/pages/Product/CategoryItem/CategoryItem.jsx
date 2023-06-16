import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./CategoryItem.module.scss";
import { MdOutlineArrowRight } from "react-icons/md";

const cx = classNames.bind(styles);
CategoryItem.propTypes = {
  data: PropTypes.array.isRequired,
  activeCategoryId: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

function CategoryItem(props) {
  const { data, activeCategoryId, getData } = props;
  return (
    <div className={cx("category-content")}>
      {data?.map((item, index) => {
        return (
          <Link
            to={`/products/${item.id}/${item.name}`}
            onClick={() => getData(item)}
            key={item.id}
            className={cx({
              "box-category": true,
              active: item.id === activeCategoryId,
              "open-icon": item.id === activeCategoryId,
            })}
          >
            <MdOutlineArrowRight className={cx("arrow-icon")} />
            <h3 className={cx("category-item")}>{item?.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}

export default CategoryItem;
