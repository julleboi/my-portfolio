import path from 'path';
import { Configuration } from "webpack";
import nodeExternals from 'webpack-node-externals';
import slsw from 'serverless-webpack';
import Dotenv from 'dotenv-webpack';

const config: Configuration = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js' ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: '../.env'
    }),
  ]
};

module.exports = config;