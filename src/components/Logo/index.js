import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import css from './index.module.less';

class Logo extends Component {
  render() {
    const { collapsed, title } = this.props;
    return (
      <div className={css.logo}>
        <Link to={{ pathname: '/home', state: { title: '首页' } }}>
          <img className={css.img} src={require('@/assets/img/logo.svg')} alt="logo" />
          {!collapsed ? <h2 className={css.text}>{title}</h2> : null}
        </Link>
      </div>
    );
  }
}

Logo.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  title: PropTypes.string
};

Logo.defaultProps = {
  title: '管理系统'
};

export default Logo;
