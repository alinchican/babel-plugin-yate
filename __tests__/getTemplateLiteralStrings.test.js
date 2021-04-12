const getTemplateLiteralStrings = require("../getTemplateLiteralStrings");

test("should throw without argument", () => {
  expect(() => getTemplateLiteralStrings()).toThrow();
});

test("should throw with invalid templateLiteral type", () => {
  expect(() =>
    getTemplateLiteralStrings(
      ["Welcome to ${place}, ${user}!"],
      [
        {
          match: "${place}",
          group: "place",
        },
      ]
    )
  ).toThrow();
});

test("should throw with empty templateLiteral", () => {
  expect(() =>
    getTemplateLiteralStrings("", [
      {
        match: "${place}",
        group: "place",
      },
    ])
  ).toThrow();
});

test("should throw without templateLiteralExpressions", () => {
  expect(() =>
    getTemplateLiteralStrings("Welcome to ${place}, ${user}!")
  ).toThrow();
});

test("should throw with invalid templateLiteralExpressions type", () => {
  expect(() =>
    getTemplateLiteralStrings("Welcome to ${place}, ${user}!", {
      match: "${place}",
      group: "place",
    })
  ).toThrow();
});

test("should return array of empty strings when no template literal strings are found", () => {
  expect(
    getTemplateLiteralStrings("${place}", [
      {
        match: "${place}",
        group: "place",
      },
    ])
  ).toEqual(["", ""]);
});

test("should return template literal strings", () => {
  expect(
    getTemplateLiteralStrings("Welcome to ${place}, ${user}!", [
      {
        match: "${place}",
        group: "place",
      },
      {
        match: "${user}",
        group: "user",
      },
    ])
  ).toEqual(["Welcome to ", ", ", "!"]);
});
