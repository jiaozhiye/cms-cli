import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';

import { LocaleProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '@/assets/css/style.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* props.children -> 一级路由的出口 */}
        <LocaleProvider locale={zhCN}>{this.props.children}</LocaleProvider>
      </Provider>
    );
  }
}
