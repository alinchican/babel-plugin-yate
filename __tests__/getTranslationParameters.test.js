const getTranslationParameters = require("../getTranslationParameters");

test("should throw without argument", () => {
  expect(() => getTranslationParameters()).toThrow();
});

test("should throw with invalid argument type", () => {
  expect(() => getTranslationParameters([])).toThrow();
});

test("should throw with empty argument", () => {
  expect(() => getTranslationParameters("")).toThrow();
});

test("should return empty translation parameters", () => {
  expect(getTranslationParameters("Welcome to place!")).toEqual([]);
});

test("should return translation parameters", () => {
  expect(getTranslationParameters("Welcome to {place}, {user}!")).toEqual([
    {
      match: "{place}",
      group: "place",
    },
    {
      match: "{user}",
      group: "user",
    },
  ]);
});
