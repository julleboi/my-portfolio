import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const config: Configuration = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: { filename: '[name].bundle.js' },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { 
        test: /\.(scss)$/, 
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { 
            loader: 'postcss-loader', 
            options: { 
              postcssOptions: { 
                plugins: [autoprefixer] 
              } 
            } 
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  plugins: [
     new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    }),
    new HotModuleReplacementPlugin(),
  ],
  performance: { hints: false }
};

export default config;