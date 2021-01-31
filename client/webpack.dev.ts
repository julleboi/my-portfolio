import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000'
      }
    }
  }
};

export default merge(common, config);