/**
 * Created by MingYin Lv on 2017/3/10 下午5:39.
 */

import path from 'path';
import config from './config';

export const createUrl = (url) => {
  return path.join(config.publicDir, url);
};

export const join = path.join;
