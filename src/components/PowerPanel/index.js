import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getMenuList, getRolePower } from '@/api';

import css from './index.module.less';

import { Form, Tree, Button, Alert } from 'antd';
const { TreeNode } = Tree;

@connect(
  state => ({
    btnState: state.app.btnLoading
  }),
  dispatch => ({})
)
class PowerPanel extends Component {
  state = {
    menus: [],
    checkedKeys: []
  };

  componentDidMount() {
    this.getRecords();
    this.getPowerList();
  }

  getRecords = async () => {
    const res = await getMenuList();
    if (res.code === 1) {
      this.setState({ menus: res.data });
    }
  };

  getPowerList = async () => {
    const res = await getRolePower({ id: this.props.uid });
    if (res.code === 1) {
      this.setState({ checkedKeys: res.data.map(item => item.menu_id) });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { uid: id, onSave } = this.props;
    onSave({ id, keys: this.state.checkedKeys.checked });
  };

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} />;
    });
  };

  onCheck = (checkedKeys, info) => {
    // console.log(checkedKeys, info);
    this.setState({ checkedKeys });
  };

  render() {
    const { menus, checkedKeys } = this.state;
    const treeNodes = menus.length ? (
      <Tree checkable checkStrictly defaultExpandAll autoExpandParent onCheck={this.onCheck} checkedKeys={checkedKeys}>
        {this.renderTreeNodes(menus)}
      </Tree>
    ) : (
      'loading tree'
    );

    return (
      <div style={{ paddingBottom: 30 }}>
        <Alert message="如果所有子菜单都无权限，那么其父级菜单请不要选中！" type="info" showIcon />
        {treeNodes}
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right'
          }}
        >
          <Button type="primary" onClick={this.handleSubmit} loading={this.props.btnState}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

PowerPanel.propTypes = {
  type: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form.create({})(PowerPanel);
