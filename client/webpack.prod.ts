import path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

export default merge(common, config);