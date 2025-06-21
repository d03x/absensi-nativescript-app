const webpack = require("@nativescript/webpack");

module.exports = (env) => {
  webpack.init(env);
  const config = webpack.resolveConfig();
  config.module.rules.forEach((rule) => {
    if (rule.use) {
      rule.use.forEach((loader) => {
        if (typeof loader === "object" && loader.loader === "sass-loader") {
          loader.options = loader.options || {};
          loader.options.implementation = require("sass"); // pastikan pakai Dart Sass
        }
      });
    }
  });

  return config;
};
