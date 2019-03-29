import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import actionCreators from '@/store/actions';
import config from '@/assets/js/config';
import { getToken, removeToken } from '@/assets/js/auth';

import { message } from 'antd';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

console.info(config.env);

const instance = axios.create({
  baseURL: config.serverUrl,
  timeout: 5000,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  paramsSerializer: params => {
    // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
    return qs.stringify(params, { arrayFormat: 'repeat' });
  }
});

// 请求拦截
instance.interceptors.request.use(
  config => {
    // 请求头信息，token 验证
    config.headers = { 'x-access-token': getToken() || '' };
    config.cancelToken = source.token;
    store.dispatch(actionCreators.createBtnLoadingState(true));
    return config;
  },
  error => {
    store.dispatch(actionCreators.createBtnLoadingState(false));
    message.error('请求超时！');
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  ({ data }) => {
    // 数据异常
    if (Number(data.code) !== 1) {
      message.error(data.message);
      // token 过期，需要重新登录
      if (data.code === -2) {
        removeToken();
        window.history.pushState({}, '', '/login');
      }
    }
    store.dispatch(actionCreators.createBtnLoadingState(false));
    return data;
  },
  error => {
    store.dispatch(actionCreators.createBtnLoadingState(false));
    return Promise.reject(error);
  }
);

export { instance, source };
