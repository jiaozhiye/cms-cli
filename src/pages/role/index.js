import React, { Component } from 'react';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import RolePanel from '@/components/RolePanel';

import css from './index.module.less';
import { getRoleInfo, addRoleRecord, modRoleRecord, delRoleRecord } from '@/api';

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
        label: '搜索',
        fieldName: 'name',
        placeholder: '请输入角色名称...',
        style: { width: 200 }
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
        dataIndex: 'modify_time'
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

  // 保存/更新
  saveHandler = async formDate => {
    const { type } = this.state.formPanel;
    let res;
    if (type === 'add') {
      res = await addRoleRecord(formDate);
    }
    if (type === 'edit') {
      res = await modRoleRecord(formDate);
    }
    if (res.code === 1) {
      message.success(res.message);
      this.closeDrawer();
      this.reloadHandler();
    }
  };

  // 删除
  deleteHandler = async id => {
    const res = await delRoleRecord({ id });
    if (res.code === 1) {
      message.success(res.message);
      this.reloadHandler();
    }
  };

  // 头部搜索方法
  searchHandler = params => {
    this.setState({ params });
  };

  // 重新加载数据
  reloadHandler = () => {
    const params = { ...this.state.params, _: Date.now() };
    this.setState({ params });
  };

  // 选择列
  onColumnsChange = cols => {
    this.setState({ columns: cols });
  };

  // 弹出抽屉面板
  showDrawer = (type, id) => {
    const formPanel = { type };
    if (type === 'add') {
      // 新增
      formPanel.title = '新增角色';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.title = '编辑角色';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.title = '查看角色';
      formPanel.uid = id;
    }
    this.setState({ visible: true, formPanel });
  };

  // 关闭抽屉面板
  closeDrawer = () => {
    this.setState({ visible: false });
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
            <Button type="primary" onClick={() => this.showDrawer('add')} style={{ marginLeft: 15 }}>
              <Icon type="plus" /> 新增
            </Button>
          </div>
        </Card>
        <FilterTable columns={columns} params={params} fetch={fetchApiFunc} onTableChange={val => {}} />
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={600} onClose={this.closeDrawer}>
          <RolePanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default Role;
