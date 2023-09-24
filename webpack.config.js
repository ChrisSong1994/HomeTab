const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    home: "./src/home.js",
    popup: "./src/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  devtool:"eval-source-map",
  devServer: {
    open: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "主页",
      chunks: ["home"],
      filename: "home.html",
      template: './src/assets/home.html'
    }),
    new HtmlWebpackPlugin({
      title: "popup页",
      chunks: ["popup"],
      filename: "popup.html",
      template: './src/assets/popup.html'
    }),
  ],
};
