import React from "react";
import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import Footer from "~/layouts/components/Footer/Footer.jsx";
import Header from "~/layouts/components/Header/Header.jsx";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx('content')}>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
