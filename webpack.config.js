const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: './client/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // compiling react to js
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      // compiling scss to css
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // image loader
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html'
    })
  ],
  devServer: {
    static: {
      // publicPath: 'auto'
      publicPath: '/build',
      // directory: path.resolve(__dirname, 'build')
    },
    // 
    proxy: {
      // will not know what to do with /api without this line since nothing in client-side routes (endpoints) match /api
      '/api': 'http://localhost:8888',
      '/authorize': 'http://localhost:8888'
    },
    // specific to client-side routing
    // automatically routes all endpoints to index.html if not 404, and then returns
    // historyApiFallback is false by default
    // related to * route on backend
    historyApiFallback: true,
  }
}