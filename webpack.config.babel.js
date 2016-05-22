import path from 'path';
import webpack from 'webpack';

module.exports = [
  {
    // library
    entry: {
      'build/mithril-validation': './src/main.js',
    },
    externals: [{
      'validator': true,
      'mithril': 'm',
    }],
    resolve: {
      modulesDirectories: ['node_modules'],
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
    ],
    output: {
      path: path.join(__dirname),
      filename: '[name].js',
      library: 'mv',
      libraryTarget: 'umd'
    },
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        preset: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]
  }, {
    entry: {
      'example/build/main': './example/src/main.js'
    },
    externals: [{
      'validator': true,
      'mithril': 'm',
      'jquery': 'jQuery',
    }],
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      // new webpack.optimize.UglifyJsPlugin(),
    ],
    output: {
      path: path.join(__dirname),
      filename: '[name].js'
    },
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        preset: ['es2015'],
        plugins: ['transform-runtime']
      }
    }]
  }
];
