/* global module, __dirname */

module.exports = {
  devtool: 'source-map',
  mode: 'none',
  module: {
    rules: [
      // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        resolve: {
          extensions: ['.js'],
        },
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true},
        },
        enforce: 'post',
        exclude: /node_modules/,
      },
      {
        test: /\.coffee$/,
        use: [
          {loader: 'coffee-loader'},
        ],
      },
    ],
  },
  entry: './src/index.js',
  output: {
    path: __dirname + '/public/',
    filename: 'index.js',
  },
};
