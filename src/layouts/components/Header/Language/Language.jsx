// import Tippy from "@tippyjs/react/headless";
// import PropTypes from "prop-types";
// import { AiFillStar } from "react-icons/ai";
// import { RiEnglishInput } from "react-icons/ri";

// import classNames from "classnames/bind";
// import styles from "./Language.module.scss";
// import { useState } from "react";

// const cx = classNames.bind(styles);

// const Language = ({
//   language,
//   setLanguage,
//   languageData,
//   setLanguageData,
//   languageTypes,
// }) => {
//   const handleChange = (event) => {
//     setLanguage(event.target.value);
//   };
//   return (
//     <form className={cx("select")}>
//       <select id="standard-select" value={language} onChange={handleChange}>
//         <option value="VietNam">VietNam</option>
//         <option value="English">English</option>
//       </select>
//     </form>
//   );
// };
// export default Language;
// Language.propTypes = {
//   language: PropTypes.any,
//   setLanguage: PropTypes.any,
//   languageData: PropTypes.any,
//   setLanguageData: PropTypes.any,
//   languageTypes: PropTypes.any,
// };

import axios from "axios";
import { useContext, useEffect } from "react";
import { LanguageContext } from "../../../../context/languageContext.jsx";

const Language = () => {
  const { language, setLanguage, setLanguageData, languageTypes } =
    useContext(LanguageContext);

  const handleChange = (event) => {
    const selectedLanguageCode = event.target.value;
    const selectedLanguage = languageTypes.find(
      (lang) => lang.code === selectedLanguageCode
    );
    setLanguage(selectedLanguage);
  };

  return (
    <form>
      <select value={language.code} onChange={handleChange}>
        {languageTypes.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default Language;
