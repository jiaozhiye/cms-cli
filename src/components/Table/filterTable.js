import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { dateToMoment } from '@/assets/js/util';
import { Input, DatePicker, Button, Row, Col } from 'antd';
import PageTable from './pageTable';

import css from './filterTable.module.less';

const { RangePicker } = DatePicker;

class FilterTable extends Component {
  // 创建筛选列
  createFilterColumns = columns => {
    const filterColumns = columns.map(item => {
      // 没有开启筛选, 就没有筛选
      if (!item.filter) {
        return item;
      }
      // 合并对象
      const filterProps = this.getColumnSearchProps(item.filterType, item);
      return { ...item, ...filterProps };
    });
    // 筛选 展示/隐藏 字段
    return filterColumns.filter(item => !item.hidden);
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
          // console.log(selectedKeys);
          if (selectedKeys.length > 0) {
            if (selectedKeys.every(str => str === '')) {
              selectedKeys = [];
            } else {
              selectedKeys = selectedKeys.map(dateStr => dateToMoment(dateStr));
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
    return <PageTable {...this.props} columns={this.createFilterColumns(this.props.columns)} />;
  }
}

FilterTable.propTypes = {
  columns: PropTypes.array.isRequired
};

export default FilterTable;
