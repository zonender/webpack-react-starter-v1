const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader', //here we are selecting the loader 
        test: /\.js$/ //and here we specify which file the loader will process 
      },
      {
        loader: ExtractTextPlugin.extract ({
          loader: 'css-loader'
        }),
        test: /\.css$/ //now any css file will be processed with both css and style loader
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
      } 
    ]
  },
  plugins: [
      new ExtractTextPlugin('style.css') // this will grap any css file produced by the css-loader and inserted into the style.css file
    ]
};

module.exports = config;