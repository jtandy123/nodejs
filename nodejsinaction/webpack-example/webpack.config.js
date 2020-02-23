const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: [{
        loader: 'babel-loader', 
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }],
      exclude: /node_modules/
    }]
  }
};