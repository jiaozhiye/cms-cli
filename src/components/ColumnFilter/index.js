import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon, Dropdown, Checkbox } from 'antd';

import css from './index.module.less';

class ColumnFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width ? this.props.width : 150,
      popVisible: false,
      columnNames: this.props.columns.map(item => item.dataIndex)
    };
  }

  onVisibleChange = popVisible => {
    this.setState({ popVisible });
  };

  onColumnsChange = checkedValue => {
    const { columns, onChange } = this.props;
    this.setState({ columnNames: checkedValue });
    const newColnums = columns.map(item => {
      if (!checkedValue.find(val => val === item.dataIndex)) {
        item.hidden = true;
      } else {
        item.hidden = false;
      }
      return item;
    });
    if (onChange) {
      onChange(newColnums);
    }
  };

  createPopupItems = () => {
    return this.props.columns.map(item => {
      return (
        <div key={item.dataIndex} className={classnames(css.select_cols_item)}>
          <Checkbox className={classnames(css.label)} value={item.dataIndex}>
            {item.title}
          </Checkbox>
        </div>
      );
    });
  };

  popup = () => (
    <div className={classnames(css.select_cols_popup)}>
      <Checkbox.Group onChange={this.onColumnsChange} value={this.state.columnNames}>
        {this.createPopupItems()}
      </Checkbox.Group>
    </div>
  );

  render() {
    const { width, popVisible } = this.state;
    return (
      <Dropdown overlay={this.popup()} style={{ width }} visible={popVisible} trigger={['click']} onVisibleChange={this.onVisibleChange}>
        <span className={classnames(css.down)}>
          <Icon className={classnames(css.icon)} type="filter" />
          <span>选择数据项</span>
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
