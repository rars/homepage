var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

config.output = {
  filename: 'bundle.min.js',
  publicPath: '',
  path: path.join(__dirname, 'dist')
};

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
