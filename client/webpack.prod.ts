import path from 'path';
import * as webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
});

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
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
  plugins: [htmlPlugin],
  performance: { hints: false }
};

export default config;