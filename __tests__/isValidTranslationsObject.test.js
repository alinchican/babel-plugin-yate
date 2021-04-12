const isValidTranslationsObject = require("../isValidTranslationsObject");

test("should throw without argument", () => {
  expect(() => isValidTranslationsObject()).toThrow();
});

test("should throw with empty argument", () => {
  expect(() => isValidTranslationsObject({})).toThrow();
});

test("should return false without default key when using context", () => {
  expect(
    isValidTranslationsObject({
      "Hello {user}!": {
        friendly: "Salut!",
      },
    })
  ).toBe(false);
});

test("should return false without all parameters in translation value", () => {
  expect(
    isValidTranslationsObject({
      "Hello {user}!": "Salut!",
    })
  ).toBe(false);
});

test("should return false without all parameters in translation value when using context", () => {
  expect(
    isValidTranslationsObject({
      "Hello {user}!": {
        default: "Salut!",
      },
    })
  ).toBe(false);
});

test("should return true with context", () => {
  expect(
    isValidTranslationsObject({
      "Hello {user}!": {
        default: "Salut {user}!",
        good: "Yoo {user}!",
      },
    })
  ).toBe(true);
});

test("should return true without context", () => {
  expect(
    isValidTranslationsObject({
      "Hello {user}!": "Salut {user}!",
    })
  ).toBe(true);
});
