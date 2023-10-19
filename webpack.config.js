const DotenvWebpackPlugin = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  plugins: [new DotenvWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
};