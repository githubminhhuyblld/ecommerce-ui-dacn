import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import styles from "./Category.module.scss";
import {selectCategories} from "~/store/reducers/categoriesSlice.js";
import {fetchCategories} from "~/services/workspacesService.jsx";
import {MenuCategoryIcon} from "~/components/Icon/index.jsx";
import CategoryItem from "~/pages/Product/CategoryItem/CategoryItem.jsx";

const cx = classNames.bind(styles);

function Category(props) {
    const {id} = useParams()
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [activeCategoryId, setActiveCategoryId] = useState(id);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    const handleGetData = (data) => {
        setActiveCategoryId(data.id)

    }
    console.log(categories)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-header')}>
                <MenuCategoryIcon className={cx('menu-icon')}/>
                <h3 className={cx('header-text')}>Tất cả danh mục</h3>
            </div>
            <div className={cx('divider')}></div>
            <CategoryItem activeCategoryId={activeCategoryId} getData={handleGetData} data={categories.data}/>
        </div>
    );
}

export default Category;