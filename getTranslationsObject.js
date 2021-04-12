const path = require("path");
const isValidTranslationsObject = require("./isValidTranslationsObject");

const getTranslationsObject = (file) => {
  if (typeof file !== "string") {
    throw new TypeError("Argument must be a string.");
  }

  if (file.length === 0) {
    throw new TypeError("Argument must not be an empty string.");
  }

  const translationsFilePath = path.resolve(process.cwd(), file);
  let translationsObject;

  try {
    translationsObject = require(translationsFilePath);
  } catch (error) {
    throw new Error(
      `Can't find translation file. Provided path: ${translationsFilePath}`
    );
  }

  if (!isValidTranslationsObject(translationsObject)) {
    throw new Error("Translation file is invalid.");
  }

  return translationsObject;
};

module.exports = getTranslationsObject;
