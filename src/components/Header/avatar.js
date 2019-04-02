import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getUser } from '@/assets/js/auth';
import { doLogout } from '@/api';
import { removeToken, removeUser } from '@/assets/js/auth';
import { Menu, Dropdown, Icon, Avatar, message } from 'antd';

import css from './avatar.module.less';

class HeadAvatar extends Component {
  state = {
    username: ''
  };

  componentDidMount() {
    this.setState({ username: getUser() });
  }

  doLogoutHandler = async () => {
    const res = await doLogout();
    if (res.code === 1) {
      // 删除 cookie
      removeToken();
      removeUser();
      this.props.history.push('/');
      message.success(res.message);
    }
  };

  render() {
    const { username } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Icon type="user" /> 个人中心
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="setting" /> 设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.doLogoutHandler}>
          <Icon type="poweroff" /> 退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <span className={css['dropdown-trigger']}>
          <Avatar icon="user" size="small" />
          <span className={css.user}>{username}</span>
        </span>
      </Dropdown>
    );
  }
}

export default withRouter(HeadAvatar);
