import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon, Dropdown, Tree } from 'antd';
import css from './index.module.less';
const { TreeNode } = Tree;

class ColumnFilter extends Component {
  state = {
    treeData: this.props.columns,
    checkedKeys: this.props.columns.map(item => item.dataIndex),
    popVisible: false,
    width: this.props.width ? this.props.width : 120
  };

  onVisibleChange = popVisible => {
    this.setState({ popVisible });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
    const newColumns = this.state.treeData.map(column => {
      if (checkedKeys.includes(column.dataIndex)) {
        column.hidden = false;
      } else {
        column.hidden = true;
      }
      return column;
    });
    this.props.onChange && this.props.onChange(newColumns);
  };

  onDrop = info => {
    // console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // console.log(dragKey, dropKey, dropPosition);

    const data = [...this.state.treeData];
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.dataIndex === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      return;
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({ treeData: data });
    this.props.onChange && this.props.onChange(data);
  };

  createTreeItems = () => {
    return this.props.columns.map(column => {
      if (Array.isArray(column.children) && column.children.length) {
        return (
          <TreeNode key={column.dataIndex} title={column.title}>
            {this.createTreeItems(column.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={column.dataIndex} title={column.title} />;
    });
  };

  popup = () => (
    <div className={classnames(css.select_cols_popup)}>
      <Tree className={classnames(css['draggable-tree'])} defaultExpandAll blockNode checkable draggable checkedKeys={this.state.checkedKeys} onCheck={this.onCheck} onDrop={this.onDrop}>
        {this.createTreeItems()}
      </Tree>
    </div>
  );

  render() {
    const { width, popVisible } = this.state;
    return (
      <Dropdown overlay={this.popup()} overlayStyle={{ minWidth: width }} visible={popVisible} trigger={['click']} onVisibleChange={this.onVisibleChange}>
        <span className={classnames(css.down)}>
          <Icon className={classnames(css.icon)} type="filter" />
          <span>排选数据列</span>
        </span>
      </Dropdown>
    );
  }
}

ColumnFilter.propTypes = {
  columns: PropTypes.array.isRequired,
  width: PropTypes.number,
  onChange: PropTypes.func
};

export default ColumnFilter;
