const { differenceWith, isEqual, isPlainObject, isEmpty } = require("lodash");
const getTranslationParameters = require("./getTranslationParameters");

const isValidTranslationsObject = (translationsObject) => {
  if (!isPlainObject(translationsObject)) {
    throw new TypeError("translationsObject must be an object.");
  }

  if (isEmpty(translationsObject)) {
    throw new TypeError("translationsObject must not be an empty object.");
  }

  // Let's start validation by looping over translationObject entries
  for (let [translationKey, translationValue] of Object.entries(
    translationsObject
  )) {
    // Get translation parameters for the string that needs to be translated
    const translationKeyParameters = getTranslationParameters(translationKey);

    // Check if the translation is a simple string
    if (typeof translationValue === "string") {
      // Get translation parameters for translation
      const translationValueParameters = getTranslationParameters(
        translationValue
      );

      // Check if we have all parameters
      // from the string that needs translated in translation string
      if (
        differenceWith(
          translationKeyParameters,
          translationValueParameters,
          isEqual
        ).length !== 0
      ) {
        // Not a valid translation
        // Return early, no need to continue
        return false;
      }
    }

    // Check if the translation is using context
    if (isPlainObject(translationValue)) {
      // Check if the translation contains default context in keys
      if (!Object.keys(translationValue).includes("default")) {
        // Not a valid translation
        // Return early, no need to continue
        return false;
      }

      // Loop over translation contexts
      for (let translationContext of Object.values(translationValue)) {
        const translationValueParameters = getTranslationParameters(
          translationContext
        );

        // Check if we have all parameters
        // from the string that needs translated in translation string
        // TODO: A little bit WET (not DRY), right? See above ^
        // Refactor into a function, something like compareTranslationParameters
        if (
          differenceWith(
            translationKeyParameters,
            translationValueParameters,
            isEqual
          ).length !== 0
        ) {
          // Not a valid translation
          // Return early, no need to continue
          return false;
        }
      }
    }
  }

  return true;
};

module.exports = isValidTranslationsObject;
