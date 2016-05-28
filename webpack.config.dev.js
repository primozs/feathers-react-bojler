var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './shared/index.js'
  ],

  output: {
    path: __dirname + '/dev/',
    filename: 'bundle.js',
    publicPath: '/dev/'
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
        loader: 'style!css!sass?outputStyle=expanded&' +
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
        loader: 'style!css?modules'
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'CLIENT': JSON.stringify('true')
      }
    })
  ]

};
