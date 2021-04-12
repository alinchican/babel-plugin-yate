module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ["node"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:jest/recommended",
  ],
};
