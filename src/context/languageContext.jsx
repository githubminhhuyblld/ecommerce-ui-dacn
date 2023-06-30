import axios from "axios";
import { createContext } from "react";
import React, { useEffect } from "react";
import { BASE_URL } from "../interceptors/axios.jsx";
import PropTypes from "prop-types";

const languageTypes = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
];

export const LanguageContext = createContext();
export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(languageTypes[0]);
  const [languageData, setLanguageData] = React.useState({});
  // const baseUrl = BASE_URL;

  useEffect(() => {
    const getLanguage = async () => {
      const response = await axios.get(
        `${BASE_URL}/languages/changeLanguage?locale=${language.code}`
      );
      setLanguageData(response.data);
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
}
export default LanguageContext;
// Compare this snippet from src\pages\Home\Home.jsx:

LanguageContextProvider.propTypes = {
  children: PropTypes.any,
};
