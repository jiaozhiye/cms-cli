import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import utils from '@/utils';
import { getUserList } from '@/api';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import DemoPanel from '@/components/DemoPanel';

import css from './index.module.less';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message } from 'antd';

@connect(
  state => ({
    rols: state.app.dict.rols || [],
    sex: state.app.dict.sex || []
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class Demo extends Component {
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
    if (nextProps.rols.length || nextProps.sex.length) {
      this.setState({
        topFilterList: this.createTopFilters(nextProps),
        columns: this.createColumns(nextProps)
      });
    }
  }

  // 头部筛选条件
  createTopFilters = props => {
    const { rols } = props;
    return [
      {
        type: 'SELECT',
        label: '角色',
        fieldName: 'role',
        placeholder: '全部',
        style: { width: 100 },
        list: rols
      },
      {
        type: 'RANGE_DATE',
        label: '订单周期',
        fieldName: 'range_date',
        style: { width: 240 }
      },
      {
        type: 'INPUT',
        label: '搜索',
        fieldName: 'input',
        placeholder: '请输入...',
        style: { width: 200 }
      }
    ];
  };

  // table 数据列
  createColumns = props => {
    const { sex } = props;
    return [
      {
        title: '名称',
        dataIndex: 'name',
        filter: true,
        filterKey: 'name_1',
        filterType: 'input',
        sorter: true
      },
      {
        title: '性别',
        dataIndex: 'sex',
        filter: true,
        filterKey: 'sex_1',
        filterType: 'checkbox',
        filterItems: utils.createFilterList(sex),
        sorter: true
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        filter: true,
        filterKey: 'phone_1',
        filterType: 'daterange'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
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
    // console.log(params);
    this.setState({ params });
  };

  // 保存/更新
  saveHandler = formDate => {
    const { type } = this.state.formPanel;
    console.log(type, formDate);
    if (type === 'add') {
      // 新增
    }
    if (type === 'edit') {
      // 更新
    }
    this.getRecords();
    message.success('保存成功！');
    this.closeDrawer();
  };

  // 删除
  deleteHandler = async id => {
    message.success('删除成功！');
    this.getRecords();
  };

  // 选择列
  onColumnsChange = cols => {
    this.setState({ columns: cols });
  };

  // 弹出抽屉面板
  showDrawer = (type, id) => {
    let formPanel = {};
    if (type === 'add') {
      // 新增
      formPanel.type = type;
      formPanel.title = '新增员工';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.type = type;
      formPanel.title = '编辑员工';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.type = type;
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
        <FilterTable
          columns={columns}
          params={params}
          fetch={fetchApiFunc}
          onTableChange={val => {
            console.log(val);
          }}
        />
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={600} onClose={this.closeDrawer}>
          <DemoPanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
      </>
    );
  }
}

export default Demo;
