import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import util from '@/utils';
import { Input, DatePicker, Button, Row, Col } from 'antd';

import EditTable from './editTable';
import PageTable from './pageTable';

import css from './filterTable.module.less';

const { RangePicker } = DatePicker;

class FilterTable extends Component {
  state = {
    isEditable: this.props.columns.some(column => column.editable)
  };

  // 创建筛选列
  createFilterColumns = () => {
    const filterColumns = this.props.columns.map(column => {
      // 没有开启筛选, 就没有筛选
      if (!column.filter) return column;
      // 合并对象
      const filterProps = this.getColumnSearchProps(column.filterType, column);
      return { ...column, ...filterProps };
    });
    // 筛选 展示/隐藏 字段
    return filterColumns.filter(column => !column.hidden);
  };

  // 获取筛选列属性
  getColumnSearchProps = (type, column) => {
    if (type === 'checkbox') {
      return { filters: column.filterItems };
    }
    if (type === 'input') {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          return (
            <div style={{ padding: 8, width: 184 }}>
              <Input
                ref={node => {
                  this.searchInput = node;
                }}
                placeholder={`Search ${column.dataIndex}`}
                value={selectedKeys}
                onChange={e => setSelectedKeys(e.target.value ? e.target.value : '')}
              />
              {this.getColumnSearchButtons(type, { confirm, clearFilters })}
            </div>
          );
        },
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        }
      };
    }
    if (type === 'daterange') {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          if (selectedKeys.length > 0) {
            if (selectedKeys.every(str => str === '')) {
              selectedKeys = [];
            } else {
              selectedKeys = selectedKeys.map(dateStr => util.dateToMoment(dateStr));
            }
          }
          return (
            <div style={{ padding: 8, width: 240 }}>
              <RangePicker
                value={selectedKeys}
                onChange={(dates, dateStrings) => {
                  setSelectedKeys(dateStrings);
                }}
              />
              {this.getColumnSearchButtons(type, { confirm, clearFilters })}
            </div>
          );
        }
      };
    }
    return {};
  };

  // 获取筛选按钮
  getColumnSearchButtons = (type, { confirm, clearFilters }) => (
    <Row className={classnames(css.btns)} gutter={8}>
      <Col span={12}>
        <Button
          type="primary"
          onClick={() => {
            this.onSubmit(type, confirm);
          }}
          size="small"
          style={{ width: '100%' }}
        >
          <span>确定</span>
        </Button>
      </Col>
      <Col span={12}>
        <Button
          onClick={() => {
            this.onReset(type, clearFilters);
          }}
          size="small"
          type="primary"
          style={{ width: '100%' }}
        >
          <span>清除</span>
        </Button>
      </Col>
    </Row>
  );

  // 确定筛选
  onSubmit = (type, confirm) => {
    confirm();
  };

  // 清除筛选
  onReset = (type, clearFilters) => {
    clearFilters();
  };

  render() {
    return this.state.isEditable ? <EditTable {...this.props} columns={this.createFilterColumns()} /> : <PageTable {...this.props} columns={this.createFilterColumns()} />;
  }
}

FilterTable.propTypes = {
  columns: PropTypes.array.isRequired
};

export default FilterTable;
