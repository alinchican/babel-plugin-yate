const { escapeRegExp } = require("lodash");

const getTemplateLiteralStrings = (
  templateLiteral,
  templateLiteralExpressions
) => {
  if (typeof templateLiteral !== "string") {
    throw new TypeError("Argument must be a string.");
  }

  if (templateLiteral.length === 0) {
    throw new TypeError("Argument must not be an empty string.");
  }

  if (!Array.isArray(templateLiteralExpressions)) {
    throw new TypeError("templateLiteralExpressions must be an array.");
  }

  let templateLiteralStrings = [];

  if (templateLiteralExpressions.length !== 0) {
    const templateLiteralExpressionContent = templateLiteralExpressions.map(
      (expression) => {
        return escapeRegExp(expression.group);
      }
    );

    const templateLiteralStringRegex = new RegExp(
      "(?:\\${(?:" + templateLiteralExpressionContent.join("|") + ")})",
      "g"
    );

    templateLiteralStrings = templateLiteral.split(templateLiteralStringRegex);
  } else {
    templateLiteralStrings.push(templateLiteral);
  }

  return templateLiteralStrings;
};

module.exports = getTemplateLiteralStrings;
