import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import utils from '@/utils';
import { getUserList, addUserRecord, modUserRecord, delUserRecord } from '@/api';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import UserPanel from '@/components/UserPanel';

import css from './index.module.less';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message } from 'antd';

@connect(
  state => ({
    roles: state.app.dict.roles || [],
    sex: state.app.dict.sex || []
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getUserList, // table 数据接口
      topFilterList: this.createTopFilters(this.props),
      columns: this.createColumns(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roles.length || nextProps.sex.length) {
      this.setState({
        topFilterList: this.createTopFilters(nextProps),
        columns: this.createColumns(nextProps)
      });
    }
  }

  // 头部筛选条件
  createTopFilters = props => {
    const { roles } = props;
    return [
      {
        type: 'SELECT',
        label: '所属角色',
        fieldName: 'role_id',
        placeholder: '全部',
        style: { width: 180 },
        list: utils.createFilterList(roles)
      },
      {
        type: 'INPUT',
        label: '搜索',
        fieldName: 'name',
        placeholder: '请输入用户名/拼音头...',
        style: { width: 200 }
      }
    ];
  };

  // table 数据列
  createColumns = props => {
    const { sex } = props;
    return [
      {
        title: '登录名',
        dataIndex: 'username'
      },
      {
        title: '昵称',
        dataIndex: 'name'
      },
      {
        title: '角色',
        dataIndex: 'role_name'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        filter: true,
        filterKey: 'sex',
        filterType: 'checkbox',
        filterItems: utils.createFilterList(sex),
        render: (text, record) => <span>{sex.find(item => item.value === text).name}</span>
      },
      {
        title: '手机号',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
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

  // 保存/更新
  saveHandler = async formDate => {
    const { type } = this.state.formPanel;
    console.log(type, formDate);
    let res;
    if (type === 'add') {
      res = await addUserRecord(formDate);
    }
    if (type === 'edit') {
      res = await modUserRecord(formDate);
    }
    if (res.code === 1) {
      message.success(res.message);
      this.closeDrawer();
      this.reloadHandler();
    }
  };

  // 删除
  deleteHandler = async id => {
    const res = await delUserRecord({ id });
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
    const params = { ...this.state.params };
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
      formPanel.title = '新增用户';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.title = '编辑用户';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.title = '查看用户';
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
          <UserPanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default User;
