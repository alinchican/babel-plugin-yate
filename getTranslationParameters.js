const getTranslationParameters = (string) => {
  if (typeof string !== "string") {
    throw new TypeError("Argument must be a string.");
  }

  if (string.length === 0) {
    throw new TypeError("Argument must not be an empty string.");
  }

  const parameterRegExp = new RegExp(/{([\s\S]*?)}/, "g");
  const parametersInfo = [];
  let currentRegExpMatch;

  while ((currentRegExpMatch = parameterRegExp.exec(string)) !== null) {
    const isParameterFound = parametersInfo.find(
      (parameter) => parameter.match === currentRegExpMatch[0]
    );

    if (!isParameterFound) {
      parametersInfo.push({
        match: currentRegExpMatch[0],
        group: currentRegExpMatch[1],
      });
    }
  }

  return parametersInfo;
};

module.exports = getTranslationParameters;
