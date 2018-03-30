const path = require("path");
const glob = require("glob-all");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");

const base = require("./webpack.base.config");

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    // strip comments in Vue code
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.BROWSER": true
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename:
        process.env.NODE_ENV === "production"
          ? "assets/js/[name].[hash].js"
          : "assets/js/[name].js"
    })
  ])
});

config.module.rules
  .filter(x => {
    return x.loader == "vue-loader";
  })
  .forEach(x => (x.options.extractCSS = true));

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new HtmlWebpackPlugin({
      processEnv: process.env.NODE_ENV,
      filename: path.resolve(__dirname, "../dist/index.html"),
      template: path.resolve(__dirname, "../index.html"),
      inject: true,
      hash: false,
      cache: false,
      chunks: ["app", "vendor"]
    })
  );
  config.plugins.push(
    new ExtractTextPlugin("assets/styles.[hash].css"),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  config.plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );

  config.plugins.push(
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );

  config.plugins.push(
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, "../src/components/**/*.vue"),
        path.join(__dirname, "../src/theme/**/*.vue"),
        path.join(__dirname, "../src/pages/**/*.vue")
      ]),
      minimize: true,
      purifyOptions: {
        info: true,
        whitelist: [
          ".field:not(.is-narrow)",
          ".field-label.is-normal",
          ".message.is-info .message-body",
          ".link-more",
          ".field.is-horizontal",
          ".icon",
          ".column.is-one-third, .column.is-one-third-tablet"
        ]
      }
    })
  );
} else {
  config.plugins.push(new ExtractTextPlugin("assets/styles.css"));
}

module.exports = config;
