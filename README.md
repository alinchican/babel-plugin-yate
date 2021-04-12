# babel-plugin-yate
[![Node.js Package](https://github.com/alinchican/babel-plugin-yate/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/alinchican/babel-plugin-yate/actions/workflows/npm-publish.yml)

Simple and efficient i18n babel plugin. It replaces strings at build time.

babel-plugin-macros macro also included for use in create-react-app.

**Input**

```js
t`Hello ${name}!`;
t`Hello ${name}, welcome to ${place}!`;
t("default")`Hello ${name}!`;
t("informal")`Hello ${name}!`;
```

**Output**

```js
t`Salut ${name}!`;
t`Bine ai venit la ${place}, ${name}}! ${name}, ma bucur ca esti aici!`;
t`Salut ${name}!`;
t`Yo ${name}!`;
```

## Translation file

Multiple expressions in template literals are allowed. Translations can contain repeated parameters.

```js
const translations = {
  // Without context
  "Welcome to {place}, {name}!": "Salut {name}, bine ai venit la {place}!",
  // With context
  "Hello {name}, welcome to {place}!": {
    default: "Salut {name}, bine ai venit la {place}!",
    home: "Waaazzaaaa {name}, bine te-am gasit bro' la {place}!"
  },
  // Repeated parameters
  "Offer available from {min} {currency} to {max} {currency}":
    "Oferta maxima este de {max} {currency}. Oferta minima este in moneda {currency}, iar valorea este {min}. Deci de la {min} la {max} {currency} pentru dummies.",
  // With strings resembling parameters
  "Hello {country}": "Salutare {Budapest}, pardon, {country}"
};

module.exports = translations;
```

## Usage as a babel plugin

If using ESLint, make sure to register "t" as a global variable in your config file.

```js
"globals": {
  "t": true
}
```

### Configuration

Example using a .babelrc file:

```js
{
  "plugins": [
    ["yate", {
      "translationsFile": "./translations.js",
      "tagName": "t"
    }]
  ]
}
```

### Options

There are two options available, **both are optional**:

**translationsFile**

Path to a module that exports a translations object. _defaults to "./translations.js"_

**tagName**

The name of the tag expression that wraps the template literals. _defaults to "t"_

## Usage as macro

Translation file path is **./translations.js**

You can rename the translation function as you need.

Example:

```js
import t from "babel-plugin-yate/macro";

const App = () => <span>{t`String to be translated`}</span>;
```
