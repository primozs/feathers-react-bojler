var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var styleLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?sourceMap&outputStyle=expanded&' +
  'includePaths[]=' +
  (encodeURIComponent(path.resolve(process.cwd(), './node_modules')))
];

var cssLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'autoprefixer-loader?browsers=last 2 version'
];

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],

  output: {
    path: __dirname + '/',
    filename: 'app.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },

  module: {
    preLoaders: [{
      test: /\.js$|\.test.js$/,
      loaders: ['eslint'],
      include: [
        path.resolve(__dirname, 'client'),
        path.resolve(__dirname, 'server')
      ]
    }],
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
        loader: styleLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: cssLoaders.join('!')
      },
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'CLIENT': JSON.stringify('true')
      }
    })
  ]

};
