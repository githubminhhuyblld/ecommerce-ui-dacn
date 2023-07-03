import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { IconButton } from "@mui/material";

import styles from "./Header.module.scss";
import config from "~/config/index.jsx";
import Logo from "~/assets/logo/lazadaz.png";
import TopNavBar from "~/layouts/components/Header/TopNavBar/TopNavBar.jsx";
import Search from "~/layouts/components/Header/Search/Search.jsx";
import Cart from "~/layouts/components/Header/Cart/Cart.jsx";
import { RxHamburgerMenu } from "react-icons/rx";

const cx = classNames.bind(styles);

function Header(props) {
  const isTablet = useMediaQuery({ minWidth: 768 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div className={cx("wrapper")}>
      <TopNavBar
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Container>
        <header className={cx("header-wrapper")}>
          <Grid container alignItems="center" className={cx("header-height")}>
            {isTablet ? (
              <Grid item md={2} lg={2} sm={2}>
                <Link to={config.routes.home} className={cx("logo-wrapper")}>
                  <img className={cx("logo")} src={Logo} alt="logo" />
                </Link>
              </Grid>
            ) : (
              <span className={cx("menu")}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <RxHamburgerMenu />
                </IconButton>
              </span>
            )}
            <Grid item md={7} lg={7} sm={7} style={{ flex: 1 }}>
              <Search />
            </Grid>
            <Grid item md={3} lg={3} sm={3}>
              <Cart />
            </Grid>
          </Grid>
        </header>
      </Container>
    </div>
  );
}

Header.propTypes = {};

export default Header;
