const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",

    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    plugins: [
      // create the template
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E.",
      }),

      // minify the CSS
      new MiniCssExtractPlugin(),

      // create the service worker
      new GenerateSW(),

      // create the manifest
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Edit your text!",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: "./",
        publicPath: "./",
        fingerprints: false,
        crossorigin: null,
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("images", "icons"),
          },
        ],
      }),
    ],

    module: {
      // define loaders for file types
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
