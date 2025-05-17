const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    fallback: {
      "path": false,
      "fs": false,
      "crypto": false,
      "stream": false,
      "buffer": false
    },
    alias: {
      '@novnc/novnc': path.resolve(__dirname, 'node_modules/@novnc/novnc')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/websockify': {
        target: 'ws://localhost:6080',
        ws: true
      },
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  resolveLoader: {
    modules: ['node_modules']
  }
}; 