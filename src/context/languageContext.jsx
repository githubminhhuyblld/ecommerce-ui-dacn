import { createContext, useState } from "react";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import instance from "~/interceptors/axios";

const languageTypes = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
];

export const LanguageContext = createContext();
export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(languageTypes[0]);
  const [languageData, setLanguageData] = useState({});

  useEffect(() => {
    const getLanguage = async () => {
      const response = await instance.get(
        `/languages/changeLanguage?locale=${language.code}`
      );
      if (response.data) {
        setLanguageData(response.data);
      }
    };
    getLanguage();
  }, [language]);

  const context = {
    language,
    setLanguage,
    languageData,
    setLanguageData,
    languageTypes,
  };
  return (
    <LanguageContext.Provider value={context}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContext;

LanguageContextProvider.propTypes = {
  children: PropTypes.any,
};
