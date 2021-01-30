import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = {
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
};

export default merge(common, config);