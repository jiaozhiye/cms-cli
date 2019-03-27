import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import utils from '@/utils';
import { getMenuList } from '@/api';

import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import DemoPanel from '@/components/DemoPanel';

import css from './index.module.less';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message } from 'antd';

@connect(
  state => ({}),
  dispatch => ({})
)
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getMenuList, // table 数据接口
      columns: this.createColumns()
    };
  }

  // table 数据列
  createColumns = () => {
    return [
      {
        title: '菜单名称',
        dataIndex: 'name'
      },
      {
        title: 'URL地址',
        dataIndex: 'url'
      },
      {
        title: '图标',
        dataIndex: 'icon'
      },
      {
        title: '排序',
        dataIndex: 'sort'
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
    console.log(type, formDate);
    if (type === 'add') {
      // 新增
    }
    if (type === 'edit') {
      // 更新
    }
    message.success('保存成功！');
    this.closeDrawer();
    this.reloadHandler();
  };

  // 删除
  deleteHandler = async id => {
    message.success('删除成功！');
    this.reloadHandler();
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
      formPanel.title = '新增员工';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.title = '编辑员工';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.title = '查看员工';
      formPanel.uid = id;
    }
    this.setState({ visible: true, formPanel });
  };

  // 关闭抽屉面板
  closeDrawer = () => {
    this.setState({ visible: false });
  };

  render() {
    const { params, fetchApiFunc, columns, visible, formPanel } = this.state;
    return (
      <>
        <Card size="small" className={css['card-bor']} bordered={false}>
          <div className="fr">
            <ColumnFilter columns={columns} onChange={this.onColumnsChange} />
            <Button type="primary" onClick={() => this.showDrawer('add')} style={{ marginLeft: 15 }}>
              <Icon type="plus" /> 新增
            </Button>
          </div>
        </Card>
        <FilterTable columns={columns} params={params} fetch={fetchApiFunc} pagination={false} onTableChange={val => {}} />
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={600} onClose={this.closeDrawer}>
          <DemoPanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default Demo;
