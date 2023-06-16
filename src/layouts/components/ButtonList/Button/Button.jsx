import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "~/layouts/components/ButtonList/ButtonList.module.scss";

const cx = classNames.bind(styles);
Button.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

function Button(props) {
  const { label, isActive, onClick } = props;
  const buttonStyle = {
    backgroundColor: isActive ? "var(--primary-color)" : "transparent",
    color: isActive ? "#FFFFFF" : "var(--text-color)",
    border: `1px solid var(--primary-color)`,
    padding: "8px 12px",
    borderRadius: "4px",
    marginRight: "8px",
    marginTop: "6px",
    cursor: "pointer",
  };
  return (
    <span style={buttonStyle} onClick={onClick}>
      {label}
    </span>
  );
}

export default Button;
