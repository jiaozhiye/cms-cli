import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from './index.module.less';

import { Tabs, Breadcrumb } from 'antd';
const TabPane = Tabs.TabPane;

@connect(
  state => ({
    menuList: state.app.menus
  }),
  dispatch => ({})
)
class MultiTab extends Component {
  state = {
    activeKey: '',
    panes: [],
    breadList: []
  };

  onChange = activeKey => {
    const { panes } = this.state;
    const { title } = panes.find(item => item.key === activeKey);
    this.setState({ activeKey });
    // 路由跳转
    this.props.history.push({ pathname: activeKey, state: { title } });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  // 递归
  createBreadcrumb = (arr, key) => {
    let res = null;
    (function func(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].children) && arr[i].children.length > 0) {
          func(arr[i].children, key);
        }
        if (arr[i].key === key) {
          res = arr[i];
        }
      }
    })(arr, key);
    // =========================
    let res2 = [];
    (function func2(obj) {
      if (!obj) return;
      if (obj.parent) {
        func2(obj.parent);
      }
      res2.push({ title: obj.title, key: obj.key });
    })(res);

    return res2;
  };

  add = props => {
    const { panes } = this.state;
    const {
      location: { pathname: key },
      menuList
    } = props;
    if (!menuList.length) return;
    const breadList = this.createBreadcrumb(menuList, key);
    this.setState({ activeKey: key, breadList });
    if (panes.findIndex(item => item.key === key) === -1) {
      // 不存在
      const title = breadList[breadList.length - 1].title;
      panes.push({ title, key });
      this.setState({ panes });
    }
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex, title;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
        title = pane.title;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
        title = panes[lastIndex].title;
      } else {
        activeKey = panes[0].key;
        title = panes[0].title;
      }
      // 路由跳转
      this.props.history.push({ pathname: activeKey, state: { title } });
    }
    this.setState({ panes, activeKey });
  };

  componentDidMount() {
    this.add(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.add(nextProps);
    }
    if (nextProps.menuList !== this.props.menuList) {
      this.add(nextProps);
    }
  }

  render() {
    const { panes, activeKey, breadList } = this.state;

    return (
      <Tabs type="editable-card" hideAdd onChange={this.onChange} activeKey={activeKey} onEdit={this.onEdit} tabBarStyle={{ margin: 0, paddingLeft: '15px', paddingTop: '10px', paddingRight: '15px' }}>
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={panes.length > 1} style={{ backgroundColor: '#FFF', padding: '10px 15px' }}>
            <Breadcrumb>
              {breadList.map(item => (
                <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

export default MultiTab;
