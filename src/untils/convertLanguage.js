const convertNameToEnglish = (id, languageData) => {
  // eslint-disable-next-line no-prototype-builtins
  if (languageData.hasOwnProperty(id)) {
    return languageData["category_item_" + id];
  } else {
    return languageData["category_item_" + id];
  }
};

export default convertNameToEnglish;
