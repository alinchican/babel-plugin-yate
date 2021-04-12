const babel = require("@babel/core");
const plugin = require("../");

test("should return original string if translation is not found", () => {
  const testCode = "customTagName`Welcome user to ${place}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          tagName: "customTagName",
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });
  expect(code).toMatchSnapshot();
});

test("should throw when translation file is not found", () => {
  const testCode = "t`Hello to ${place}, ${name}!`";

  expect(() =>
    babel.transform(testCode, {
      plugins: [[plugin]],
    })
  ).toThrow();
});

test("should transform code with custom tagName", () => {
  const testCode = "customTagName`Welcome to ${place}, ${name}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          tagName: "customTagName",
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should transform code with default tagName", () => {
  const testCode = "t`Welcome to ${place}, ${name}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should skip code not matching tagName", () => {
  const testCode = "random`Welcome to ${place}, ${name}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should throw when using multiple string context variables", () => {
  const testCode = "t('default', 'test')`Hello to ${place}, ${name}!`";

  expect(() =>
    babel.transform(testCode, {
      plugins: [[plugin]],
    })
  ).toThrow();
});

test("should throw with invalid context variable type (array)", () => {
  const testCode = "t(['default'])`Hello to ${place}, ${name}!`";

  expect(() =>
    babel.transform(testCode, {
      plugins: [[plugin]],
    })
  ).toThrow();
});

test("should return translation using function without context", () => {
  const testCode = "t()`Welcome to ${place}, ${name}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should return translation using function with default context", () => {
  const testCode = "t('default')`Welcome to ${place}, ${name}!`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should return translation containing repeated parameters", () => {
  const testCode =
    "t`Offer available from ${minAmount} ${currency} to ${maxAmount} ${currency}`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});

test("should return translation containing strings looking like parameters", () => {
  const testCode = "t`Hello ${`Bucharest`}`";

  const { code } = babel.transform(testCode, {
    plugins: [
      [
        plugin,
        {
          translationsFile: "./__mocks__/translations.js",
        },
      ],
    ],
  });

  expect(code).toMatchSnapshot();
});
