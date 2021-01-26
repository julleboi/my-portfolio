import { Configuration } from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const htmlPlugin = new HtmlWebPackPlugin({
  template: './public/index.html'
});

const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
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