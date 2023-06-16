import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "~/layouts/components/ButtonList/ButtonList.module.scss";
import Button from "~/layouts/components/ButtonList/Button/Button.jsx";
import PropTypes from "prop-types";

ButtonList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
const cx = classNames.bind(styles);

function ButtonList(props) {
  const { options, onSelect } = props;
  const [activeButton, setActiveButton] = useState(options[0]?.label);
  const handleClick = (value) => {
    setActiveButton(value);
    onSelect(value);
  };

  return (
    <div className={cx("wrapper")}>
      {options?.map((option, index) => (
        <Button
          key={option.id}
          label={option.label}
          isActive={activeButton === option.label}
          onClick={() => handleClick(option.label)}
        />
      ))}
    </div>
  );
}

export default ButtonList;
