import React from "react";
import Tippy from "@tippyjs/react/headless";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import { RiEnglishInput } from "react-icons/ri";

import classNames from "classnames/bind";
import styles from "./Language.module.scss";

const cx = classNames.bind(styles);

import { useContext } from "react";
import LanguageContext from "~/context/languageContext";

const Language = (props) => {
  const { isTablet } = props;
  const {
    language,
    setLanguage,
    setLanguageData,
    languageTypes,
    languageData,
  } = useContext(LanguageContext);
  const handleLanguageChange = (langCode) => {
    const selectedLanguage = languageTypes.find(
      (lang) => lang.code === langCode
    );
    setLanguage(selectedLanguage);
  };
  const { language_vi, language_en } = languageData;

  return (
    <form>
      <Tippy
        interactive
        offset={[12, 1]}
        render={(attrs) => (
          <div className={cx("dropdown")} tabIndex="-1" {...attrs}>
            <span
              onClick={() => handleLanguageChange("vi")}
              className={cx("dropdown-item")}
            >
              <AiFillStar />
              {language_vi}
            </span>
            <span
              onClick={() => handleLanguageChange("en")}
              className={cx("dropdown-item")}
            >
              <RiEnglishInput />
              {language_en}
            </span>
          </div>
        )}
      >
        {isTablet ? (
          <span className="text-3xl py-3  cursor-pointer  mb-2">
            Change language
          </span>
        ) : (
          <span className={cx("top-navbar-item")}>Change language</span>
        )}
      </Tippy>
    </form>
  );
};
Language.propTypes = {
  isTablet: PropTypes.bool,
};

export default Language;
