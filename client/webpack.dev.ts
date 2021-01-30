import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = {
  mode: 'development'
};

export default merge(common, config);