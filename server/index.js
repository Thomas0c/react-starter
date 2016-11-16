/* eslint-disable import/no-commonjs */

require('babel-register');
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]-[hash:base64:4]',
  mode: 'local',
  rootDir: './client'
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const projectBase = require('path').resolve(__dirname, '../');

global.webpackIsomorphicTools
= new WebpackIsomorphicTools(require('../webpack-isomorphic-tools-configuration')) // eslint-disable-line
.server(projectBase, () => {
  require('./server'); // eslint-disable-line
});
