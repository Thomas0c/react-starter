import WebpackIsomorphicTools from 'webpack-isomorphic-tools/plugin';

module.exports = {
  debug: true,
  webpack_assets_file_path: './webpack-assets.json',
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    }
  }
};
