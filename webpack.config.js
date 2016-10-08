var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// https://github.com/brechtbilliet/angular-typescript-webpack/blob/master/webpack/loaders.js

module.exports = {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },
    resolve: {
        root: path.join(__dirname, 'src', 'modules'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    resolveLoader: {
      modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'js',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'raw!sass'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: '\.jpg$',
                exclude: /node_modules/,
                loader: 'file'
            },
            {
                test: '\.png$',
                exclude: /node_modules/,
                loader: 'url'
            }
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
          title: 'rars',
          template: path.join(__dirname, 'src', 'index.html'),
          inject: 'body',
          hash: true,
          chunksSortMode: 'dependency'
        }),
      new ExtractTextPlugin('[name].styles.css')
    ]
};
