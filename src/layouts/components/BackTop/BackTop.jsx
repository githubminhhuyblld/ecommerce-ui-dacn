import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { animateScroll as scroll } from "react-scroll";

import styles from "./BackTop.module.scss";
import { RiArrowUpSLine } from "react-icons/ri";
import { useScrollY } from "~/hooks/useScrollY.js";

BackTop.propTypes = {};
const cx = classNames.bind(styles);

function BackTop(props) {
  const ScrollToTop = () => {
    scroll.scrollToTop();
  };
  const [scrollY] = useScrollY();
  return (
    <div
      className={cx("wrapper")}
      style={{ visibility: `${scrollY > 600 ? "visible" : "hidden"}` }}
      onClick={() => ScrollToTop()}
    >
      <span>
        <RiArrowUpSLine className={cx("go__top-icon")} />
      </span>
    </div>
  );
}

export default BackTop;
