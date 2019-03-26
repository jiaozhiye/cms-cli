import React, { Component } from 'react';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';

import css from './index.module.less';
import { getRoleInfo } from '@/api';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message } from 'antd';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getRoleInfo, // table 数据接口
      topFilterList: this.createTopFilters(),
      columns: this.createColumns()
    };
  }

  // 头部筛选条件
  createTopFilters = () => {
    return [
      {
        type: 'INPUT',
        label: '搜索条件',
        fieldName: 'role_name',
        placeholder: '请输入...',
        style: { width: 220 }
      }
    ];
  };

  // table 数据列
  createColumns = () => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '简介',
        dataIndex: 'desc'
      },
      {
        title: '修改时间',
        dataIndex: 'modify_time',
        sorter: true
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 160,
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.showDrawer('show', record.id)}>
              查看
            </a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.showDrawer('edit', record.id)}>
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除吗？" onConfirm={() => this.deleteHandler(record.id)} okText="Yes" cancelText="No">
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];
  };

  // 头部搜索方法
  searchHandler = params => {
    this.setState({ params });
  };

  // 选择列
  onColumnsChange = cols => {
    this.setState({ columns: cols });
  };

  render() {
    const { topFilterList, params, fetchApiFunc, columns, visible, formPanel } = this.state;
    return (
      <>
        <Card size="small" className={css['card-bor']} bordered={false}>
          <TopFilter data={topFilterList} onSearch={this.searchHandler} />
        </Card>
        <Card size="small" className={css['card-bor']} bordered={false}>
          <div className="fr">
            <ColumnFilter columns={columns} onChange={this.onColumnsChange} />
            <Button type="primary" style={{ marginLeft: 15 }}>
              <Icon type="plus" /> 新增
            </Button>
          </div>
        </Card>
        <FilterTable
          columns={columns}
          params={params}
          fetch={fetchApiFunc}
          onTableChange={val => {
            console.log(val);
          }}
        />
      </>
    );
  }
}

export default Role;
