var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var config = require('./webpack.config');

module.exports = webpackMerge(config, {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.join(__dirname, 'dist')
  }
});
