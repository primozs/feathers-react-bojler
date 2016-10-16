var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var sassLoaders = [
  'css-loader?minimize',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?sourceMap&outputStyle=expanded&'  +
  'includePaths[]=' +
  (encodeURIComponent(path.resolve(process.cwd(), './node_modules')))
];

var cssLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 2 version'
];

const vendor = [
  'react', 'react-dom'
];


var statsOptions = {
  filename: "stats.json",
  fields: null,
  transform: function (data) {
    data.modules.forEach(function (m) {
      delete m.source;
    });
    delete data.children;
    return JSON.stringify(data, null, 2);
  }
};

module.exports = {
  devtool: 'source-map',

  entry: {
    app: __dirname + '/client/index.js',
    vendor: vendor
  },

  output: {
    path: __dirname + '/dist/static/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(woff|ttf|png|gif|jpg|jpeg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new ProgressBarPlugin({
      format: ' build [:bar] :percent (:elapsed seconds) :msg',
      clear: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'manifest'],
      // name: 'vendor',
      minChunks: Infinity,
      children: true,
      async: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'CLIENT': JSON.stringify('true')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].[chunkhash].css', {disable: false, allChunks: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle  : true,
      compress: {
        drop_debugger: true,
        warnings: false,
        drop_console: true,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true
      },
      comments: /^\**!|^ [0-9]+ $|@preserve|@license/
    }),
    new CompressionPlugin(),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
    }),
    new StatsWriterPlugin(statsOptions)
  ]
};
