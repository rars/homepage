var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');
var config = require('./webpack.config');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(config, { 
  output: {
    filename: '[name].min.js',
    publicPath: '/',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require', 'angular']
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
