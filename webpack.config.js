const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = (_env, options) => {
  const mode = options.mode;
  const runInDev = mode === "development";

  return {
    target: "web",
    entry: {
      home: "./src/home.js",
      popup: "./src/popup.js",
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx", ".json"],
    },
    devtool: runInDev ? "eval-source-map" : false,
    devServer: {
      open: ["/home.html"],
      port: 9000,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
            "less-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
          ],
        },
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
                      modules: false,
                    },
                  ],
                  "@babel/preset-react",
                ],
                plugins: ["@umijs/babel-plugin-auto-css-modules"], // 开启css modules  自动识别
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "manifest.json"),
            to: path.resolve(__dirname, "dist/manifest.json"),
          },
          {
            from: path.resolve(__dirname, "public/**/*"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        title: "主页",
        chunks: ["home"],
        filename: "home.html",
        template: "./src/assets/home.html",
      }),
      new HtmlWebpackPlugin({
        title: "popup页",
        chunks: ["popup"],
        filename: "popup.html",
        template: "./src/assets/popup.html",
      }),
    ],
  };
};
