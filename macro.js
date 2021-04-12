const { createMacro } = require("babel-plugin-macros");
const getTranslation = require("./getTranslation");
const getTranslationsObject = require("./getTranslationsObject");

const yate = ({ references, state, babel }) => {
  const { types } = babel;

  references.default.forEach((referencePath) => {
    const {
      node: { tag, quasi },
    } = referencePath.parentPath;

    const { file, opts: options } = state;

    const { translationsFile = "./translations.js" } = options;

    const isTag = types.isIdentifier(tag);
    const isCallExpression = types.isCallExpression(tag);

    // Get source file code
    const fileCode = file.code;

    const templateLiteralEnclosed = fileCode.substring(quasi.start, quasi.end);

    // Extract template literal without back-tick enclosure
    const templateLiteral = templateLiteralEnclosed.substring(
      1,
      templateLiteralEnclosed.length - 1
    );

    let context = undefined;

    // Check if tag
    if (isTag) {
      // Set context as default
      context = "default";
    }

    // Check if call expression
    if (isCallExpression) {
      // Throw if we have more than 1 context
      if (tag.arguments.length > 1) {
        throw referencePath.buildCodeFrameError(
          "Can handle only 1 context argument."
        );
      }

      // We have 1 context, hooray
      if (tag.arguments.length === 1) {
        // Throw is context argument is not a string literal
        if (!types.isStringLiteral(tag.arguments[0])) {
          throw new Error("Context argument must be a string literal.");
        }

        // Set context
        context = tag.arguments[0].value;
      }

      // If we don't have a context argument assume default context
      if (tag.arguments.length === 0) {
        context = "default";
      }
    }

    // Get translations object
    const translationsObject = getTranslationsObject(translationsFile);

    // Get translated template literal
    let templateLiteralTranslation;

    // Get translation
    templateLiteralTranslation = getTranslation(
      templateLiteral,
      context,
      translationsObject
    );

    // Compose source code replacement
    const sourceString = "`" + templateLiteralTranslation + "`";

    // Replace with translation in source code
    referencePath.parentPath.replaceWithSourceString(sourceString);
  });
};

module.exports = createMacro(yate);
