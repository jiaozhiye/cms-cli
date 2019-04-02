import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import utils from '@/utils';
import config from '@/assets/js/config';
import { getArticleList, addArticleRecord, modArticleRecord, delArticleRecord } from '@/api';

import TopFilter from '@/components/TopFilter';
import ColumnFilter from '@/components/ColumnFilter';
import FilterTable from '@/components/Table/filterTable';
import ArticlePanel from '@/components/ArticlePanel';

import css from './index.module.less';

import { Card, Drawer, Button, Icon, Divider, Popconfirm, message, Modal } from 'antd';

@connect(
  state => ({
    classes: state.app.dict.classes || []
  }),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, // 是否显示抽屉
      formPanel: {}, // 新增/编辑 表单面板
      params: {}, // Toper 搜索参数
      fetchApiFunc: getArticleList, // table 数据接口
      previewVisible: false,
      previewImage: '',
      topFilterList: this.createTopFilters(this.props),
      columns: this.createColumns(this.props)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.classes.length) {
      this.setState({
        topFilterList: this.createTopFilters(nextProps),
        columns: this.createColumns(nextProps)
      });
    }
  }

  // 头部筛选条件
  createTopFilters = props => {
    const { classes } = props;
    const classifyList = classes.length && classes[0].id === '0' ? classes[0].children : classes;
    return [
      {
        type: 'TREE_SELECT',
        label: '所属分类',
        fieldName: 'cid',
        placeholder: '所属分类',
        style: { width: 180 },
        list: utils.createFilterList(classifyList)
      },
      {
        type: 'RANGE_DATE',
        label: '日期',
        fieldName: 'dates',
        style: { width: 220 }
      },
      {
        type: 'INPUT',
        label: '搜索条件',
        fieldName: 'title',
        placeholder: '请输入标题名称/拼音头...',
        style: { width: 220 }
      }
    ];
  };

  // table 数据列
  createColumns = props => {
    const { classes } = props;
    const classifyList = classes.length && classes[0].id === '0' ? classes[0].children : classes;
    return [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '所属分类',
        dataIndex: 'claname',
        filter: true,
        filterKey: 'cid',
        filterType: 'checkbox',
        filterItems: utils.createFilterList(classifyList)
      },
      {
        title: '封面图',
        dataIndex: 'img_path',
        render: text => (
          <Card
            hoverable
            style={{ width: 100 }}
            bodyStyle={{ padding: 0 }}
            onClick={e => {
              e.preventDefault();
              this.handlePreview(text);
            }}
            cover={<img src={`${config.serverUrl}/${text}`} alt="" />}
          />
        )
      },
      {
        title: '排序',
        dataIndex: 'sort',
        sorter: true
      },
      {
        title: '作者',
        dataIndex: 'author'
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

  // 图片预览
  handlePreview = path => {
    this.setState({
      previewImage: `${config.serverUrl}/${path}`,
      previewVisible: true
    });
  };

  // 保存/更新
  saveHandler = async formDate => {
    const { type } = this.state.formPanel;
    let res;
    if (type === 'add') {
      res = await addArticleRecord(formDate);
    }
    if (type === 'edit') {
      res = await modArticleRecord(formDate);
    }
    if (res.code === 1) {
      message.success(res.message);
      this.closeDrawer();
      this.reloadHandler();
    }
  };

  // 删除
  deleteHandler = async id => {
    const res = await delArticleRecord({ id });
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
      formPanel.title = '新增文章';
    }
    if (type === 'edit') {
      // 编辑
      formPanel.title = '编辑文章';
      formPanel.uid = id;
    }
    if (type === 'show') {
      // 查看
      formPanel.title = '查看文章';
      formPanel.uid = id;
    }
    this.setState({ visible: true, formPanel });
  };

  // 关闭抽屉面板
  closeDrawer = () => {
    this.setState({ visible: false });
  };

  render() {
    const { topFilterList, params, fetchApiFunc, columns, visible, formPanel, previewVisible, previewImage } = this.state;
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
        <Drawer visible={visible} destroyOnClose title={formPanel.title} width={800} onClose={this.closeDrawer}>
          <ArticlePanel {...formPanel} onSave={formDate => this.saveHandler(formDate)} />
        </Drawer>
        <Modal visible={previewVisible} bodyStyle={{ padding: 10 }} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img style={{ width: '100%' }} src={previewImage} alt="" />
        </Modal>
      </>
    );
  }
}

export default Article;