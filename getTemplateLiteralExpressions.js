const getTemplateLiteralExpressions = (templateLiteral) => {
  if (typeof templateLiteral !== "string") {
    throw new TypeError("Argument must be a string.");
  }

  if (templateLiteral.length === 0) {
    throw new TypeError("Argument must not be an empty string.");
  }

  const expressionRegExp = new RegExp(/\${([\s\S]*?)}/, "g");
  const literalExpressionsInfo = [];
  let currentRegExpMatch;

  while (
    (currentRegExpMatch = expressionRegExp.exec(templateLiteral)) !== null
  ) {
    literalExpressionsInfo.push({
      match: currentRegExpMatch[0],
      group: currentRegExpMatch[1],
    });
  }

  return literalExpressionsInfo;
};

module.exports = getTemplateLiteralExpressions;
