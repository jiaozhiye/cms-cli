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

  componentWillReceiveProps({ params }) {
    if (JSON.stringify(params) !== JSON.stringify(this.props.params)) {
      // toperFilter 条件变化时
      this.getRecords(params, true);
    }
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords = async (params = this.props.params, isTopSearch = false) => {
    this.setState({ loading: true });
    const { pagination, filters } = this.state;
    const res = await this.props.fetch({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...params,
      ...filters
    });
    if (res.code === 1) {
      const pager = { ...this.state.pagination };
      pager.total = res.totalRow;
      // 如果是头部条件(toperFilter)搜索，页码重置为 1
      if (isTopSearch) {
        pager.current = 1;
      }
      this.setState({ data: res.data, pagination: pager });
      // 执行回掉
      this.props.onTableChange && this.props.onTableChange(res);
    }
    this.setState({ loading: false });
  };

  onChange = (pagination, filters, sorter) => {
    // console.log(filters, sorter);
    const { columns } = this.props;
    // 处理排序字段
    let sort = sorter.field ? `${sorter.field}=${sorter.order.slice(0, -3)}` : undefined;
    // 处理筛选字段
    let filter = {};
    for (let key in filters) {
      const column = columns.find(item => item.dataIndex === key);
      const filterKey = column.filterKey ? column.filterKey : column.dataIndex;
      filter[filterKey] = filters[key];
    }
    // 分页
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({ pagination: pager, filters: { sort, ...filter } }, this.getRecords);
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
