import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Container} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from 'react-redux';


import styles from "./Category.module.scss";
import CategoryItem from "~/pages/Home/Category/CategoryItem/CategoryItem.jsx";
import {selectCategories} from "~/store/reducers/categoriesSlice.js";
import {fetchCategories} from "~/services/workspacesService.jsx";



Category.propTypes = {

};
const cx = classNames.bind(styles);

function Category(props) {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className={cx("wrapper")}>
            <Container style={{ padding: 0 }}>
                <div className={cx("category-header")}>
                    <div className={cx("category-header-name")}>Thể loại</div>
                </div>
                <div className={cx("category-content")}>
                    <CategoryItem categories={categories?.data}/>
                </div>
            </Container>
        </div>
    );
}

export default Category;