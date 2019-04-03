import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import config from '@/config/globle';

class PageTable extends Component {
  state = {
    data: [],
    filters: {}, // table 上的筛选条件
    pagination: { current: config.table.pageNum, total: 0, pageSize: config.table.pageSize },
    loading: false
  };

  componentDidMount() {
    this.getRecords();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params)) {
      if (!nextProps.params._) {
        // toperFilter 条件变化
        this.paramsChange();
      } else {
        // 执行刷新
        delete nextProps.params._;
        this.getRecords();
      }
    }
  }

  componentWillUnmount() {
    this.setState = (state, cb) => {};
  }

  getRecords = async () => {
    this.setState({ loading: true });
    const { pagination, filters } = this.state;
    const { fetch, params, onTableChange } = this.props;
    const res = await fetch({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...params,
      ...filters
    });
    if (res.code === 1) {
      const pager = { ...pagination, ...{ total: res.totalRow } };
      this.setState({ data: res.data, pagination: pager });
      // 执行回掉
      onTableChange && onTableChange(res);
    }
    this.setState({ loading: false });
  };

  // toperFilter 条件变化时
  paramsChange = () => {
    const pagination = { ...this.state.pagination, ...{ current: 1 } };
    this.setState({ pagination }, this.getRecords);
  };

  onChange = (pagination, filters, sorter) => {
    // console.log(filters, sorter);
    const { columns } = this.props;
    // 处理排序字段
    let orderBy = sorter.field ? { sort: `${sorter.field}=${sorter.order.slice(0, -3)}` } : {};
    // 处理筛选字段
    let filter = {};
    for (let key in filters) {
      const column = columns.find(item => item.dataIndex === key);
      const filterKey = column.filterKey ? column.filterKey : column.dataIndex;
      if (filters[key].length) {
        filter[filterKey] = filters[key];
      }
    }
    // 分页
    const pager = { ...this.state.pagination, ...{ current: pagination.current } };
    this.setState({ pagination: pager, filters: { ...orderBy, ...filter } }, this.getRecords);
  };

  render() {
    const { data, loading, pagination } = this.state;
    const { columns } = this.props;
    return <Table pagination={pagination} {...this.props} columns={columns} dataSource={data} rowKey={record => record.id} loading={loading} onChange={this.onChange} />;
  }
}

PageTable.propTypes = {
  columns: PropTypes.array.isRequired,
  fetch: PropTypes.func.isRequired,
  params: PropTypes.object,
  onTableChange: PropTypes.func
};

PageTable.defaultProps = {
  params: {}
};

export default PageTable;
