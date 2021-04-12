const { isEqual } = require("lodash");
const getTranslationStrings = require("./getTranslationStrings");

const findTranslationKey = (templateLiteralStrings, translationKeys) => {
  if (!Array.isArray(templateLiteralStrings)) {
    throw new TypeError("templateLiteralStrings must be an array.");
  }

  if (templateLiteralStrings.length === 0) {
    throw new TypeError("templateLiteralStrings must not be an empty array.");
  }

  if (!Array.isArray(translationKeys)) {
    throw new TypeError("translationKeys must be an array.");
  }

  if (translationKeys.length === 0) {
    throw new TypeError("translationKeys must not be an empty array");
  }

  let translationKey = undefined;

  for (let thisTranslationKey of translationKeys) {
    const thisTranslationKeyStrings = getTranslationStrings(thisTranslationKey);

    if (isEqual(templateLiteralStrings, thisTranslationKeyStrings)) {
      translationKey = thisTranslationKey;
      break;
    }
  }

  return translationKey;
};

module.exports = findTranslationKey;
