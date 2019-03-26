import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import HeadAvatar from './avatar';
import css from './index.module.less';

import { Layout, Icon } from 'antd';
const { Header } = Layout;

class AppHeader extends Component {
  render() {
    const { collapsed, onToggle } = this.props;
    return (
      <Header className={classnames(css.header)}>
        <Icon className={classnames(css.trigger, 'fl')} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={onToggle} />
        <div className={classnames(css.wrapper, 'fr')}>
          <HeadAvatar />
        </div>
      </Header>
    );
  }
}

AppHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default AppHeader;
