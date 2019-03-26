import React, { Component } from 'react';

import css from './index.module.less';

class Home extends Component {
  render() {
    return <div className={css.welcome_text}>欢迎使用</div>;
  }
}

export default Home;
