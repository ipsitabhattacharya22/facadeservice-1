const path = require('path')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    publicPath: 'dist/',
    path: path.resolve(__dirname, 'dist'),
    library: '',
    libraryTarget: 'commonjs'
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        }],
        include: path.resolve(__dirname, './src')
      }
    ]
  }
}
