const pathInternal = require('path');

const moduleObj = {
  rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel-loader']
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ]
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }

  ]
}


function serverConfig(env) {
  if (env !== undefined) {
    if (env.rootdir !== undefined) {
      __dirname = env.rootdir;
    }
  }
  const node_modules = pathInternal.resolve(__dirname, 'node_modules');
  const webpack = require(node_modules + '/webpack');
  const path = require(node_modules + '/path');
  const nodeExternals = require(node_modules + '/webpack-node-externals');

  var APP_DIR = path.resolve(__dirname, './src');

  var isnotBoomerang = (env.environment !== 'boomerang' && env.environment !== undefined);

  const server = {
    entry: {
      'server': APP_DIR + '/server/index.js'
    },
    target: 'node',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: moduleObj,
    externals: [nodeExternals(), 'electron'],
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.environment || 'production')
      })
    ]
  }

  if (isnotBoomerang) {
    console.log("NODE_ENV = " + env.environment);
    console.log("NON boomerang env - ignoring @boomerang package");
    var serverPlugins = [];
    serverPlugins.push(
      new webpack.IgnorePlugin(/@boomerang/)
    );
    serverPlugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.environment)
      })
    );
    server['plugins'] = serverPlugins;
  }

  return server;

}

function clientConfig(env) {
  if (env !== undefined) {
    if (env.rootdir !== undefined) {
      __dirname = env.rootdir;
    }
  }
  const node_modules = pathInternal.resolve(__dirname, 'node_modules');
  const path = require(node_modules + '/path');
  const HtmlWebPackPlugin = require(node_modules + '/html-webpack-plugin');
  const CopyPlugin = require(node_modules + '/copy-webpack-plugin');

  var APP_DIR = path.resolve(__dirname, './src');

  var isnotBoomerang = (env.environment !== 'boomerang' && env.environment !== undefined);

  const client = {
    entry: {
      'client': APP_DIR + '/client/index.js'
    },
    target: 'web',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/public')
    },
    module: moduleObj,
    plugins: [
      new HtmlWebPackPlugin({
        template: APP_DIR + '/client/index.html',
      })
    ]
  }

  if (!isnotBoomerang) {
    console.log("NODE_ENV = " + env.environment);
    console.log("boomerang env - copying boomerang header from dist");
    var clientPlugins = [];
    clientPlugins.push(
      new CopyPlugin({
        patterns: [{
          from: "node_modules/facadeservice/dist/",
          to: "dist/[name].[ext]"
        }, ]
      })
    );
    clientPlugins.push(
      new HtmlWebPackPlugin({
        template: APP_DIR + '/client/index.html',
      })
    );
    client['plugins'] = clientPlugins;
  }

  return client;
}

module.exports = {
  serverConfig,
  clientConfig
};
