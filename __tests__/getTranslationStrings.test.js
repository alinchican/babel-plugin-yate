const getTranslationStrings = require("../getTranslationStrings");

test("should throw without argument", () => {
  expect(() => getTranslationStrings()).toThrow();
});

test("should throw with invalid argument", () => {
  expect(() => getTranslationStrings([])).toThrow();
});

test("should throw with empty argument", () => {
  expect(() => getTranslationStrings("")).toThrow();
});

test("should return translation strings", () => {
  expect(getTranslationStrings("Welcome to {place}, {user}!")).toEqual([
    "Welcome to ",
    ", ",
    "!",
  ]);
});
