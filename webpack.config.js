const path = require('path');
const WebpackBar = require("webpackbar");
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
  return {
    context: path.resolve(__dirname),
    devtool: "source-map",
    mode: options && options.mode ? options.mode : "development",
    entry: "./src/scripts/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // sprite icone svg da folder
      new SVGSpritemapPlugin("src/svgIcons/*.svg", {
        output: {
          filename: "icons-sprite.svg",
        },
      }),
      new MiniCssExtractPlugin({
        filename: "main.css",
      }),
      new WebpackBar(),
    ],
  };
};
