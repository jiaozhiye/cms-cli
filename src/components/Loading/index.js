import React, { Component } from 'react';
import { Spin } from 'antd';

import css from './index.module.less';

export default class Loading extends Component {
  render() {
    return (
      <div className={css['loading-wrapper']}>
        <Spin tip="Loading..." />
      </div>
    );
  }
}
