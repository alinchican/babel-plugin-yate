const fs = require('fs');
const getTranslation = require("./getTranslation");
const getTranslationsObject = require("./getTranslationsObject");
const constants = require("./constants");

module.exports = function ({ types }) {
  return {
    pre(state) {

      const {
        translationsFile = constants.DEFAULT_TRANSLATIONS_FILE,
      } = this.opts;

      const translationsObject = getTranslationsObject(translationsFile);

      this.notFound = {};
      this.translationsFile = translationsFile;
      this.translationsObject = translationsObject;
    },
    post(state) {
      if (Object.keys(this.notFound).length > 0) {
        const newData = { ...this.translationsObject, ...this.notFound };
        const outputString = JSON.stringify(newData, null, 2);

        fs.writeFileSync(this.translationsFile, outputString);
      }
    },
    visitor: {
      TaggedTemplateExpression(path, state) {
        const {
          node: { tag, quasi },
        } = path;
        const { file, opts: options } = state;

        const {
          tagName = constants.DEFAULT_TAGNAME,
        } = options;

        const isTag = types.isIdentifier(tag, { name: tagName });
        const isCallExpression = types.isCallExpression(tag);

        const hasCallee = types.isIdentifier(tag.callee, {
          name: tagName,
        });

        // Skip if translation isn't needed
        if (!isTag && !isCallExpression && !hasCallee) {
          return;
        }

        // Get source file code
        const fileCode = file.code;

        const templateLiteralEnclosed = fileCode.substring(
          quasi.start,
          quasi.end
        );

        // Extract template literal without back-tick enclosure
        const templateLiteral = templateLiteralEnclosed.substring(
          1,
          templateLiteralEnclosed.length - 1
        );

        let context = undefined;

        // Check if tag
        if (isTag) {
          // Set context as default
          context = constants.DEFAULT_TRANSLATION_CONTEXT;
        }

        // Check if call expression
        if (isCallExpression) {
          // Throw if we have more than 1 context
          if (tag.arguments.length > 1) {
            throw path.buildCodeFrameError(
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
            context = constants.DEFAULT_TRANSLATION_CONTEXT;
          }
        }

        // Get translated template literal
        let templateLiteralTranslation;

        // Get translation
        templateLiteralTranslation = getTranslation(
          templateLiteral,
          context,
          this.translationsObject
        );

        // Compose source code replacement
        const sourceString = "`" + templateLiteralTranslation.string + "`";

        if (templateLiteralTranslation.notFound) {
          const formattedTranslationString = templateLiteralTranslation.string.split('${').join('{');
          this.notFound[formattedTranslationString] = formattedTranslationString
        }

        // Replace with translation in source code
        path.replaceWithSourceString(sourceString);
      },
    }
  };
};
