# CRA babel-eslint

Example babel transform and eslint plugins developed for my talk at React Sydney on Nov 4, 2019.

## Installation

### babel transform plugins

Import and add the plugins to babel config.

.babelrc.js

```js
const babelTransformLogRender = require("./plugins/babel-transform-log-render");
const babelTransformLogStateChange = require("./plugins/babel-transform-log-state-change");

module.exports = {
  presets: ["react-app"],
  plugins: [babelTransformLogRender, babelTransformLogStateChange] // plugin goes here
};
```

### esling plugins

Install the plugin locally in destination project by using the right local path:

```
$ yarn add ../eslint-plugin-dinesh-says-no --dev
```

Add `dinesh-says-no` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["dinesh-says-no"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "dinesh-says-no/no-cats": "error"
  }
}
```
