import React, { Component } from 'react';

import { Menu, Dropdown, Icon, Avatar } from 'antd';

import css from './avatar.module.less';

export default class HeadAvatar extends Component {
  doLogoutHandler = async e => {
    console.log(e);
  };

  render() {
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
          <Avatar icon="user" size="small" /> <span>管理员</span>
        </span>
      </Dropdown>
    );
  }
}
