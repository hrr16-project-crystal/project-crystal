// const source = `${__dirname}/client/src/index`;
// const command = process.env.npm_lifecycle_event;
// const cssnano = require('cssnano');
// const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBrowserPlugin = require('webpack-browser-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// // const loadBrowse = new WebpackBrowserPlugin();
// const removeDup = new webpack.optimize.DedupePlugin();
// const extractCSS = new ExtractTextPlugin("style.min.css");
// const minJS = new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false,
//   },
// });
// const addHTML = new HtmlWebpackPlugin({
//   template: `${source}index.html`,
//   minify: {
//     collapseWhitespace: true,
//     conservativeCollapse: true, // test this
//     html5: true,
//     removeComments: true,
//     sortAttributes: true,
//     sortClassName: true,
//   },
// });

// // Configuration settings according to npm command used
// const settings = {
//   // npm run start
//   start: {
//     filename: 'bundle.js',
//     loaders: {
//       js: ['babel?presets[]=es2015,presets[]=react'],
//       css: ExtractTextPlugin.extract('isomorphic-style', 'css', 'postcss'),
//     },
//     plugins: [/*loadBrowse,*/ extractCSS, addHTML],
//   },

//   // npm run build
//   build: {
//     filename: 'bundle.min.js',
//     loaders: {
//       js: ['babel?presets[]=es2015,presets[]=react', 'eslint'],
//       css: ExtractTextPlugin.extract('isomorphic-style', 'css', 'postcss'),
//     },
//     plugins: [/*loadBrowse,*/ extractCSS, addHTML, removeDup/*, minJS*/],
//   },
// };

// module.exports = {
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//     hot: true
//   },
//   entry: source,
//   output: {
//     // path: `${__dirname}/client/build/`,
//     path: __dirname,
//     publicPath: '/',
//     filename: settings[command].filename,
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         include: source,
//         loaders: settings[command].loaders.js,
//       },
//       {
//         test: /\.css$/,
//         include: source,
//         loader: settings[command].loaders.css,
//       },
//       {
//         test: /.*\.(gif|png|jpe?g|svg)$/i,
//         include: source,
//         loaders: [
//           'file?name=assets/[name].[ext]',
//           // 'image-webpack'
//         ]
//       }
//     ],
//   },
//   postcss: [autoprefixer, cssnano],
//   plugins: settings[command].plugins,
// };

module.exports = {
  entry: [
    './client/src/index.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
  },
};
