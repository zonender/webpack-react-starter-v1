var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader', //here we are selecting the loader 
        test: /\.js$/ //and here we specify which file the loader will process 
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/ //now any css file will be processed with both css and style loader
      }
    ]
  },
  watch: false
};
