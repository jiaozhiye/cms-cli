import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import AppSidebar from '@/components/Sidebar';
import AppHeader from '@/components/Header';
import AppMultiTab from '@/components/MultiTab';

import css from './index.module.less';

import { Layout } from 'antd';
const { Content } = Layout;

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class AppLayout extends Component {
  state = {
    collapsed: false
  };

  // 登录后，获取所有的数据字典值
  componentDidMount() {
    this.props.actions.createDictData();
  }

  toggleHandler = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className={css.app}>
        <AppSidebar {...this.props} collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} onToggle={this.toggleHandler} />
          <Content className={css['view-wrapper']}>
            <AppMultiTab {...this.props} />
            {/* props.children -> 二级路由的出口 */}
            <main className={css.main}>{this.props.children}</main>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
