const path = require("path");
const webpack = require("webpack");
const vueConfig = require("./vue-loader.config");
const isProd = process.env.NODE_ENV === "production";

const config = {
  devtool: isProd ? "" : "#source-map",
  entry: {
    app: "./src/client-entry.js",
    vendor: ["vue", "vue-router", "vuex", "axios"]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".vue"],
    alias: {
      src: path.resolve(__dirname, "../src"),
      assets: path.resolve(__dirname, "../src/assets"),
      components: path.resolve(__dirname, "../src/components"),
      theme: path.resolve(__dirname, "./src/theme")
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename:
      process.env.NODE_ENV === "production"
        ? "assets/js/[name].[hash].js"
        : "assets/js/[name].js"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.vue$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          css: "css-loader",
          scss: "css-loader|sass-loader"
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/[name].[ext]?[hash]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "assets/fonts/[name]_[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: []
};

module.exports = config;
