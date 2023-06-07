import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import {Container, Grid} from "@mui/material";
import {useMediaQuery} from "react-responsive";

import styles from "./Product.module.scss";
import Category from "~/pages/Product/Category/Category.jsx";
import Content from "~/pages/Product/Content/Content.jsx";


Product.propTypes = {};
const cx = classNames.bind(styles);

function Product(props) {
    const maxWidthLg = useMediaQuery({maxWidth: 1100})
    const isTablet = useMediaQuery({minWidth: 900})
    return (
        <div className={cx("wrapper")}>
            <Grid container spacing={4}>
                {
                    isTablet && (
                        <Grid item md={maxWidthLg ? 3 : 2}>
                            <Category/>
                        </Grid>
                    )
                }
                <Grid style={{width: "100%"}} item sm={12} md={maxWidthLg ? 9 : 10}>
                    <Content/>
                </Grid>

            </Grid>
        </div>
    );
}

export default Product;