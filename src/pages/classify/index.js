import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import { getClassifyList, addClassifyRecord, modClassifyRecord, delClassifyRecord } from '@/api';

import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import ClassifyPanel from '@/components/ClassifyPanel';

import css from './index.module.less';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message } from 'antd';

@connect(
  state => ({}),
  dispatch => ({})
)
class Classify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getClassifyList, // table 数据接口
      columns: this.createColumns(),
      expandedRowKeys: [] // 展开的行
    };
  }

  // 设置展开行的 key -> rowKey
  setExpandedRowKeys = rows => {
    let tmp = [];
    (function fn(arr) {
      arr.forEach(item => {
        if (Array.isArray(item.children) && item.children.length) {
          fn(item.children);
        }
        tmp.push(item.id);
      });
    })(rows);
    this.setState({ expandedRowKeys: tmp });
  };

  // table 数据列
  createColumns = () => {
    return [
      {
        title: '分类名称',
        dataIndex: 'name'
      },
      {
        title: 'URL地址',
        dataIndex: 'url'
      },
      {
        title: '封面图尺寸',
        dataIndex: 'img_size'
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
    let res;
    if (type === 'add') {
      res = await addClassifyRecord(formDate);
    }
    if (type === 'edit') {
      res = await modClassifyRecord(formDate);
    }
    if (res.code === 1) {
      message.success(res.message);
      this.closeDrawer();
      this.reloadHandler();
    }
  };

  // 删除
  deleteHandler = async id => {
    const res = await delClassifyRecord({ id });
    if (res.code === 1) {
      message.success(res.message);
      this.reloadHandler();
    }
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
      formPanel.title = '新增分类';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.title = '编辑分类';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.title = '查看分类';
      formPanel.uid = id;
    }
    this.setState({ visible: true, formPanel });
  };

  // 关闭抽屉面板
  closeDrawer = () => {
    this.setState({ visible: false });
  };

  render() {
    const { params, fetchApiFunc, columns, visible, formPanel, expandedRowKeys } = this.state;
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
        <FilterTable
          columns={columns}
          params={params}
          fetch={fetchApiFunc}
          pagination={false}
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={expandedRows => {
            this.setState({ expandedRowKeys: expandedRows });
          }}
          onTableChange={val => {
            this.setExpandedRowKeys(val);
          }}
        />
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={600} onClose={this.closeDrawer}>
          <ClassifyPanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default Classify;
