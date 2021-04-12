const findTranslationKey = require("../findTranslationKey");

test("should throw without arguments", () => {
  expect(() => findTranslationKey()).toThrow();
});

test("should throw with invalid template literal strings argument type", () => {
  expect(() => findTranslationKey("templateLiteralStrings")).toThrow();
});

test("should throw with empty template literal strings array", () => {
  expect(() => findTranslationKey([])).toThrow();
});

test("should throw with missing translationKeys argument", () => {
  expect(() => findTranslationKey(["templateLiteralStrings"])).toThrow();
});

test("should throw with invalid translation keys argument type", () => {
  expect(() =>
    findTranslationKey(["templateLiteralStrings"], "translationKey")
  ).toThrow();
});

test("should throw with empty translation keys array", () => {
  expect(() => findTranslationKey(["templateLiteralStrings"], [])).toThrow();
});

test("should return undefined when no translation is found", () => {
  expect(
    findTranslationKey(["templateLiteralStrings"], ["translationKey"])
  ).toBeUndefined();
});

test("should return translation", () => {
  expect(
    findTranslationKey(
      ["Welcome ", " home"],
      ["Welcome {user} home", "Greetings {user}"]
    )
  ).toEqual("Welcome {user} home");
});
