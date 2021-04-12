const { isEmpty, isPlainObject } = require("lodash");
const getTemplateLiteralExpressions = require("./getTemplateLiteralExpressions");
const getTemplateLiteralStrings = require("./getTemplateLiteralStrings");
const getTranslationParameters = require("./getTranslationParameters");
const findTranslationKey = require("./findTranslationKey");
const constants = require("./constants");

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getTranslation = (string, context, translationsObject) => {
  if (typeof string !== "string") {
    throw new TypeError("String argument must be a string.");
  }

  if (string.length === 0) {
    throw new TypeError("String argument must not be an empty string.");
  }

  if (typeof context !== "string") {
    throw new TypeError("Context argument must be a string.");
  }

  if (context.length === 0) {
    throw new TypeError("Context argument must not be an empty string.");
  }

  if (!isPlainObject(translationsObject)) {
    throw new TypeError("translationsObject must be an object.");
  }

  if (isEmpty(translationsObject)) {
    throw new TypeError("translationsObject must not be an empty object.");
  }

  // Get template literal expressions
  const templateLiteralExpressions = getTemplateLiteralExpressions(string);

  // Get template literal strings
  const templateLiteralStrings = getTemplateLiteralStrings(
    string,
    templateLiteralExpressions
  );

  // Find translation string or object
  const translationKeys = Object.keys(translationsObject);

  const translationKey = findTranslationKey(
    templateLiteralStrings,
    translationKeys
  );

  // If no translation is found return original string
  // (the string that need to be translated)
  if (!translationKey) return string;

  const translationValues = translationsObject[translationKey];

  let translationTemplate = undefined;

  // Let's see if translationValues is a string
  if (typeof translationValues === "string") {
    // Check for context
    if (context !== constants.DEFAULT_TRANSLATION_CONTEXT) {
      // Sorry, we can't assume context, return original string
      return string;
    } else {
      // If the context is default
      // translationValues IS the translation template
      translationTemplate = translationValues;
    }
  }

  // Let's see if translationValues is an object
  // TODO: A little bit WET (not DRY), right? See above ^
  // Refactor into a function, something like findTranslationValue
  if (isPlainObject(translationValues)) {
    if (Object.keys(translationValues).includes(context)) {
      translationTemplate = translationValues[context];
    } else {
      // Couldn't find the specified context, we can't asume it
      // Return original string
      return string;
    }
  }

  // Generate translation
  const translationParameters = getTranslationParameters(translationKey);

  let translation = translationTemplate;

  translationParameters.forEach((translationParameter, index) => {
    const translationParameterRegExp = new RegExp(
      escapeRegExp(translationParameter.match),
      "g"
    );

    translation = translation.replace(
      translationParameterRegExp,
      templateLiteralExpressions[index].match
    );
  });

  return translation;
};

module.exports = getTranslation;
