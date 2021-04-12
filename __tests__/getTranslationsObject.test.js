const getTranslationsObject = require("../getTranslationsObject");

test("should throw without argument", () => {
  expect(() => getTranslationsObject()).toThrow();
});

test("should throw with invalid argument type", () => {
  expect(() => getTranslationsObject([])).toThrow();
});

test("should throw with empty argument", () => {
  expect(() => getTranslationsObject("")).toThrow();
});

test("should throw with non-existing file", () => {
  expect(() => getTranslationsObject("./translationsNonExistent.js")).toThrow();
});

test("should throw with invalid file", () => {
  expect(() =>
    getTranslationsObject("./__mocks__/translationsInvalid.js")
  ).toThrow();
});

test("should return translations object", () => {
  expect(getTranslationsObject("./__mocks__/translations.js")).toEqual({
    "Welcome to {place}, {name}!": "Salut {name}, bine ai venit la {place}!",
    "Yooo {name}, welcome to {place}!": {
      default: "Salut {name} la {place}!",
      home: "YOOOOO {name} la {place}!",
    },
    Hello: "Salut!",
    "Offer available from {minAmount} {currency} to {maxAmount} {currency}":
      "Offer available from {minAmount} {currency} to {maxAmount} {currency}",
    "Hello {country}": "Salutare {Budapest}, pardon, {country}",
  });
});
