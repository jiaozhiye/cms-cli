import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import Logo from '@/components/Logo';
import css from './index.module.less';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@connect(
  state => ({
    menuList: state.app.menus
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class Sidebar extends Component {
  state = {
    menuTreeList: null,
    selectedKeys: [],
    openKeys: []
  };

  // 递归算法
  renderMenu = arr => {
    if (!arr.length) return null;
    return arr.map(item => {
      if (Array.isArray(item.children) && item.children.length) {
        // 说明有二级分类
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={{ pathname: item.key, state: { title: item.title } }}>
            {!item.icon ? null : <Icon type={item.icon} />}
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      );
    });
  };

  setLocationKey = location => {
    if (!location) return;
    const { pathname: key } = location;
    const selectedKeys = [key];
    const openKeys = [key.substring(0, key.lastIndexOf('/'))];
    this.setState({ selectedKeys, openKeys });
  };

  async componentDidMount() {
    const { location } = this.props;
    this.setLocationKey(location);
    // 获取侧栏导航
    await this.props.actions.createSideMenu();
    this.setState({ menuTreeList: this.renderMenu(this.props.menuList) });
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    this.setLocationKey(location);
  }

  render() {
    const { menuTreeList, selectedKeys, openKeys } = this.state;
    const { collapsed } = this.props;
    const menuNode = menuTreeList ? (
      <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} selectedKeys={selectedKeys}>
        {menuTreeList}
      </Menu>
    ) : null;
    return (
      <Sider className={css['layout-sider']} collapsible collapsed={collapsed} trigger={null}>
        <Logo collapsed={collapsed} title="Ant Design Pro" />
        {menuNode}
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired
};

export default Sidebar;
