import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Skeleton } from "@mui/material";

import styles from "./CategoryItem.module.scss";
import { useSelector } from "react-redux";
import { selectCategoriesLoading } from "~/store/reducers/categoriesSlice.js";
import LanguageContext from "~/context/languageContext";
import convertNameToEnglish from "~/untils/convertLanguage";

CategoryItem.propTypes = {
  categories: PropTypes.array,
};
const cx = classNames.bind(styles);


function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#f57224",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#f57224",
        borderRadius: "100%",
      }}
      onClick={onClick}
    />
  );
}


function CategoryItem(props) {

const { languageData } = useContext(LanguageContext);

  const { categories } = props;
  const loading = useSelector(selectCategoriesLoading);
  const renderCategoryItem = (item) => {
    if (loading) {
      return (
        <div key={item.id} className={cx("category-item")}>
          <Skeleton
            variant="rectangular"
            width={83}
            height={88}
            animation="wave"
          />
          <Skeleton variant="text" width={80} height={24} animation="wave" />
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={`/products/${item.id}/${item.name}`}
        className={cx("category-item")}
      >
        <div className={cx("box-image")}>
          <img className={cx("image")} alt={item.name} src={item.iconUrl} />
        </div>
        <h3 className={cx("category-name")}>{convertNameToEnglish(item.id, languageData)}</h3>
      </Link>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 8,
    slidesToScroll: 4,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {categories?.map((item) => renderCategoryItem(item))}
      </Slider>
    </div>
  );
}

export default CategoryItem;
