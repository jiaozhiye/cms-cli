import React, { Component } from 'react';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import PowerPanel from '@/components/PowerPanel';

import css from './index.module.less';
import { getPowerList, setRolePower } from '@/api';

import { Card, Drawer, message } from 'antd';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getPowerList, // table 数据接口
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
        title: '用户',
        dataIndex: 'user',
        render: (text, record) => <span>{text.join(', ')}</span>
      },
      {
        title: '修改时间',
        dataIndex: 'modify_time'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.showDrawer('edit', record.id)}>
              设置权限
            </a>
          </span>
        )
      }
    ];
  };

  // 保存/更新
  saveHandler = async formDate => {
    const { type } = this.state.formPanel;
    let res;
    if (type === 'edit') {
      res = await setRolePower(formDate);
    }
    if (res.code === 1) {
      message.success(res.message);
      this.closeDrawer();
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
    if (type === 'edit') {
      // 编辑
      formPanel.title = '设置权限';
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
          </div>
        </Card>
        <FilterTable columns={columns} params={params} fetch={fetchApiFunc} onTableChange={val => {}} />
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={600} onClose={this.closeDrawer}>
          <PowerPanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default Role;
