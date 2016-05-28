var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: __dirname + "/shared/index.js",

  output: {
    path: __dirname + '/dist/static/',
    filename: 'bundle.js'
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
        test: /\.png$/,
        loader: 'file-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      },
      {
        test: /\.otf$/,
        loader: 'file-loader?mimetype=application/font/opentype'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','css?minimize!sass?outputStyle=expanded&') +
        'includePaths[]=' +
        (encodeURIComponent(
          path.resolve(process.cwd(), './node_modules')
        )) +
        '&includePaths[]=' +
        (encodeURIComponent(
            path.resolve( process.cwd(),
              './node_modules/grommet/node_modules'))
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css?minimize&modules')
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'CLIENT': JSON.stringify('true')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("app.css")
  ]
};
