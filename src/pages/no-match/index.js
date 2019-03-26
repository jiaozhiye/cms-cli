import React, { Component } from 'react';

import css from './index.module.less';

export default class NoMatch extends Component {
  render() {
    return <div className={css['not-found']}>404 Not Found</div>;
  }
}
