const getTranslation = require("../getTranslation");
const constants = require("../constants");

test("should throw without arguments", () => {
  expect(() => getTranslation()).toThrow();
});

test("should throw invalid string argument type", () => {
  expect(() =>
    getTranslation([], constants.DEFAULT_TRANSLATION_CONTEXT, {
      "Welcome to ${place}, ${user}!": "{user}, bine ai venit la {place}!",
    })
  ).toThrow();
});

test("should throw with empty string argument", () => {
  expect(() =>
    getTranslation("", constants.DEFAULT_TRANSLATION_CONTEXT, {
      "Welcome to ${place}, ${user}!": "{user}, bine ai venit la {place}!",
    })
  ).toThrow();
});

test("should throw without context argument", () => {
  expect(() =>
    getTranslation("string", {
      "Welcome to ${place}, ${user}!": "{user}, bine ai venit la {place}!",
    })
  ).toThrow();
});

test("should throw with invalid context argument type", () => {
  expect(() =>
    getTranslation("string", [], {
      "Welcome to ${place}, ${user}!": "{user}, bine ai venit la {place}!",
    })
  ).toThrow();
});

test("should throw with empty context argument", () => {
  expect(() =>
    getTranslation("string", "", {
      "Welcome to ${place}, ${user}!": "{user}, bine ai venit la {place}!",
    })
  ).toThrow();
});

test("should throw without translationsObject argument", () => {
  expect(() =>
    getTranslation("string", constants.DEFAULT_TRANSLATION_CONTEXT)
  ).toThrow();
});

test("should throw with invalid translationsObject argument type", () => {
  expect(() =>
    getTranslation("string", constants.DEFAULT_TRANSLATION_CONTEXT, [])
  ).toThrow();
});

test("should throw with empty translationsObject", () => {
  expect(() =>
    getTranslation("string", constants.DEFAULT_TRANSLATION_CONTEXT, {})
  ).toThrow();
});

test("should return original string if translation is not found", () => {
  expect(
    getTranslation(
      "Welcome to ${place}, ${user}!",
      constants.DEFAULT_TRANSLATION_CONTEXT,
      {
        "Hello {user}": "{user}, salut!",
      }
    )
  ).toEqual("Welcome to ${place}, ${user}!");
});

test("should return original string if string translation in object with context is not found", () => {
  expect(
    getTranslation(
      "Welcome to ${place}, ${user}!",
      constants.DEFAULT_TRANSLATION_CONTEXT,
      {
        "Hello {user}": {
          [constants.DEFAULT_TRANSLATION_CONTEXT]: "{user}, salut!",
        },
      }
    )
  ).toEqual("Welcome to ${place}, ${user}!");
});

test("should return translation with translation string", () => {
  expect(
    getTranslation(
      "Welcome to ${place}, ${user}!",
      constants.DEFAULT_TRANSLATION_CONTEXT,
      {
        "Welcome to {place}, {user}!": "{user}, bine ai venit la {place}!",
        "Hello {user}": "{user}, salut!",
      }
    )
  ).toEqual("${user}, bine ai venit la ${place}!");
});

test("should return translation with requested context", () => {
  expect(
    getTranslation("Welcome to ${place}, ${user}!", "contextExample", {
      "Welcome to {place}, {user}!": {
        default: "{user}, bine ai venit la {place}!",
        contextExample: "{user}, bine te-am regasit la {place}!",
      },
      "Hello {user}": "{user}, salut!",
    })
  ).toEqual("${user}, bine te-am regasit la ${place}!");
});

test("should return original string if requested context and translation value contains only a string", () => {
  expect(
    getTranslation("Welcome to ${place}, ${user}!", "contextExample", {
      "Welcome to {place}, {user}!": "{user}, bine ai venit la {place}!",
      "Hello {user}": "{user}, salut!",
    })
  ).toEqual("Welcome to ${place}, ${user}!");
});

test("should return original string if requested context in not found", () => {
  expect(
    getTranslation("Welcome to ${place}, ${user}!", "contextExample", {
      "Welcome to {place}, {user}!": {
        default: "{user}, bine ai venit la {place}!",
      },
      "Hello {user}": "{user}, salut!",
    })
  ).toEqual("Welcome to ${place}, ${user}!");
});

test("should return translation when expressions are containing strings", () => {
  expect(
    getTranslation(
      'Welcome to ${"place"}, ${"user"}!',
      constants.DEFAULT_TRANSLATION_CONTEXT,
      {
        "Welcome to {place}, {user}!": "{user}, bine ai venit la {place}!",
        "Hello {user}": "{user}, salut!",
      }
    )
  ).toEqual('${"user"}, bine ai venit la ${"place"}!');
});

test("should return translation without parameters", () => {
  expect(
    getTranslation("Welcome people!", constants.DEFAULT_TRANSLATION_CONTEXT, {
      "Welcome people!": "Salut oameni!",
    })
  ).toEqual("Salut oameni!");
});
