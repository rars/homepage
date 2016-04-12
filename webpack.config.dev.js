var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

config.devtool = 'source-map';

config.output = {
  filename: 'bundle.js',
  publicPath: '/',
  path: path.join(__dirname, 'dist')
};

module.exports = config;
