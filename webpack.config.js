const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'] // BOTH are needed!
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html"
    })
  ]
}