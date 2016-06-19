var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index'
  ],
  output: {
    path: path.join(__dirname, '/client/build/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development, 
      // ./client/build/ directory is being served 
      host: 'localhost',
      port: 3030,
      // server: { baseDir: ['client/build'] } //uncomment to use this instead of express/node server
      files: [
        "client/build/*.js"
      ]
    }),
    new CopyWebpackPlugin
    ([
      {
        from: __dirname + '/client/src/index.html',
        to: __dirname + '/client/build/index.html'
      }
    ])
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
                  locals: ['module']
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }]
          ]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader"},
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
      { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;

// module.exports = {
//   entry: [
//     './client/src/index.js',
//   ],
//   output: {
//     path: __dirname,
//     publicPath: '/',
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [{
//       exclude: /node_modules/,
//       loader: 'babel',
//       query: {
//         presets: ['react', 'es2015', 'stage-1'],
//       },
//     }],
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx'],
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//   },
// };
