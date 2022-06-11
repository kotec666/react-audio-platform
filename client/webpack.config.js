const path = require('path')
require('dotenv').config({})
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = () => {
  return {
    mode: "development",
    entry: "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          exclude: /node_modules/,
        },
        {
          test: /.svg$/i,
          issuer: /.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
          ]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            "sass-loader"
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
    },
    devServer: {
      port: 3000,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      // }
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html'}), new webpack.EnvironmentPlugin({ REACT_APP_API_URL:process.env.REACT_APP_API_URL }), new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),],
  }

}

