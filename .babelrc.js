const babelTransformLogRender = require("./plugins/babel-transform-log-render");
const babelTransformLogStateChanges = require("./plugins/babel-transform-log-state-changes");

module.exports = {
  presets: ["react-app"],
  plugins: [babelTransformLogRender, babelTransformLogStateChanges]
};
