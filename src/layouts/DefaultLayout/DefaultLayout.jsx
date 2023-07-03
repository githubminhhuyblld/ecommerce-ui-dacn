import React from "react";
import classNames from "classnames/bind";
import { useMediaQuery } from "react-responsive";

import styles from "./DefaultLayout.module.scss";
import Footer from "~/layouts/components/Footer/Footer.jsx";
import Header from "~/layouts/components/Header/Header.jsx";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("content")}>{children}</div>
      {isDesktop && <Footer />}
    </div>
  );
}

export default DefaultLayout;
