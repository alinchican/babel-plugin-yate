const getTemplateLiteralExpressions = require("../getTemplateLiteralExpressions");

test("should throw without argument", () => {
  expect(() => getTemplateLiteralExpressions()).toThrow();
});

test("should throw with invalid argument type", () => {
  expect(() => getTemplateLiteralExpressions([])).toThrow();
});

test("should throw with empty argument", () => {
  expect(() => getTemplateLiteralExpressions("")).toThrow();
});

test("should return empty array when no template literal expressions are found", () => {
  expect(getTemplateLiteralExpressions("Welcome!")).toEqual([]);
});

test("should return template literal expressions array", () => {
  expect(
    getTemplateLiteralExpressions("Welcome to ${place}, ${user} !")
  ).toEqual([
    {
      match: "${place}",
      group: "place",
    },
    {
      match: "${user}",
      group: "user",
    },
  ]);
});
