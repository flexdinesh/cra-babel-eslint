const babelTransformLogRender = require("./plugins/babel-transform-log-render");

module.exports = {
  presets: ["react-app"],
  plugins: [babelTransformLogRender]
};
