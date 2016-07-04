const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {

  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index',
  ],
  output: {
    path: path.join(__dirname, '/client/build/'),
    sourceMapFilename: 'bundle.map',
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./client/build/ directory is being served
      host: 'localhost',
      port: 3030,
      // uncomment to use this instead of express/node server
      // server: { baseDir: ['client/build'] }
      files: [
        'client/build/*.js',
      ],
    }),
    new CopyWebpackPlugin(
      [
        {
          from: `${__dirname}/client/src/index.html`,
          to: `${__dirname}/client/build/index.html`,
        },
        {
          from: `${__dirname}/client/src/assets/favicon.ico`,
          to: `${__dirname}/client/build/favicon.ico`,
        },
      ]
    ),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react'],
                },
              ],
            }],
          ],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.svg$/, loader:
        'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
      { test: /\.woff$/, loader:
        'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
      { test: /\.woff2$/, loader:
        'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader:
        'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
      { test: /\.eot$/, loader:
        'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
    ],
  },
  postcss: () => [precss, autoprefixer],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
