var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var scss_rule = {
  test: /\.scss$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'bundle.css',
      },
    },
    { loader: 'extract-loader' },
    { loader: 'css-loader' },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
      }
    },
  ]
}
var app_jsx_config = {
  entry: './src/client/app/index.jsx', //APP_DIR + '/index.jsx', // //
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    rules: [scss_rule,
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?url=false' ]
      },
      {
        test : /\.jsx?/,
        include : APP_DIR, //'./src/client/app/',//APP_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
    ,
  },
  //debug: true,
  devtool: "#eval-source-map",
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
};

var app_scss_config =
  {
    entry: './app.scss',
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'style-bundle.js',
    },
    module: {
      rules: [scss_rule]
    },
  }

var app_config =
  {
    entry: "./app.js",
    output: {
      filename: "bundle.js"
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }]
    },
  }
//app_jsx_config, 
config = [app_scss_config, app_config]
module.exports = config;