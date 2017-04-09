/**
 * Created by MingYin Lv on 2017/2/23 下午1:31.
 */

import 'whatwg-fetch';
import qs from 'qs';
import { notification } from 'antd';
import config from './config';
import { createUrl } from './pathUtil';

/**
 * @param {String} urlSuffix URL后缀(接口名称)
 * @param {Object} [options] 参数列表
 * @returns {Promise}
 */
export default (urlSuffix, options) => {
  // URL 前缀
  const urlPrefix = config.apiAddress;
  // 默认参数
  const opts = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // 默认错误信息
  const currentErrorText = '网络异常，请稍后再试';

  // 合并参数
  Object.assign(opts, options);

  // 处理参数
  opts.body = opts.body ? qs.stringify(opts.body) : undefined;

  return fetch(urlPrefix + urlSuffix, opts)
    .then((response) => {
      // 请求 OK
      if (response.ok) {
        return response.json();
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then((data) => {
      // 服务端状态 OK
      if (data.error_code === 0) {
        return data.data;
      } else if (data.error_code === 4) {
        window.location.href = createUrl('/login');
        throw new Error('请登陆');
      }
      throw new Error(data.msg);
    })
    .catch((ex) => {
      // 弹出消息提示
      const errorText = ex.message ? ex.message : currentErrorText;
      notification.error({
        message: '操作失败',
        description: errorText,
      });
      throw ex;
    });
};

