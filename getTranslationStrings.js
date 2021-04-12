const getTranslationStrings = (translation) => {
  if (typeof translation !== "string") {
    throw new TypeError("Argument must be a string.");
  }

  if (translation.length === 0) {
    throw new TypeError("Argument must not be an empty string.");
  }

  const translationStringRegex = new RegExp("(?:{(?:[^{}]*)})", "g");
  const translationStrings = translation.split(translationStringRegex);

  return translationStrings;
};

module.exports = getTranslationStrings;
