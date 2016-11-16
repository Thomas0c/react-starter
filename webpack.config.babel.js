import path from 'path';

import AssetsPlugin from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import webpack from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');

import config from './config';

const isProduction = config.env === 'production';

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicTools
= new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration')); // eslint-disable-line

export default {
  entry: isProduction ? [
    './client/index.js'
  ] : [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './client/index.js'
  ],
  context: path.resolve(__dirname, './'),
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]-[hash:base64:4]!postcss')
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: !isProduction
        }
      }, {
        test: webpackIsomorphicTools.regular_expression('images'),
        exclude: /node_modules/,
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    ...isProduction ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }),
      webpackIsomorphicTools
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      webpackIsomorphicTools.development()
    ]
  ],
  postcss: [
    nested(),
    autoprefixer()
  ],
  bail: isProduction,
  cache: !isProduction,
  stats: {
    children: false
  }
};
