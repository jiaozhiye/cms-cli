import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getClassifyRecord } from '@/api';
import css from './index.module.less';

import { Form, Button, Input, TreeSelect, InputNumber } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const { TreeNode } = TreeSelect;

@connect(
  state => ({
    btnState: state.app.btnLoading,
    classes: state.app.dict.classes
  }),
  dispatch => ({})
)
class ClassifyPanel extends Component {
  state = {};

  componentDidMount() {
    const { type } = this.props;
    if (type === 'add') return;
    this.getRecord();
  }

  createMenuTree = arr => {
    return arr.map(item => {
      if (Array.isArray(item.children) && item.children.length) {
        return (
          <TreeNode value={item.id} title={item.name} key={item.id}>
            {this.createMenuTree(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.id} title={item.name} key={item.id} />;
    });
  };

  getRecord = async () => {
    const res = await getClassifyRecord({ id: this.props.uid });
    if (res.code === 1) {
      this.setState({ data: res.data });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { type } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (type !== 'add') {
          values = { id: this.props.uid, ...values };
        }
        this.props.onSave(values);
      }
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { type, classes } = this.props;
    const isShowItem = type === 'show';
    const data = this.state.data || {};

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    return (
      <Form onSubmit={this.handleSubmit} style={{ paddingBottom: 30 }}>
        <FormItem label="所属分类" {...formItemLayout}>
          {isShowItem
            ? data.pname || '根分类'
            : getFieldDecorator('pid', {
                initialValue: data.pid,
                rules: [{ required: true, message: '请选择分类!' }]
              })(
                <TreeSelect showSearch style={{ width: 300 }} dropdownStyle={{ maxHeight: 300, overflow: 'auto' }} placeholder="请选择分类" treeDefaultExpandAll>
                  {this.createMenuTree(classes)}
                </TreeSelect>
              )}
        </FormItem>
        <FormItem label="菜单名称" {...formItemLayout}>
          {isShowItem
            ? data.name
            : getFieldDecorator('name', {
                initialValue: data.name,
                rules: [{ required: true, message: '请输入菜单名称!' }]
              })(<Input placeholder="名称" />)}
        </FormItem>
        <FormItem label="简介" {...formItemLayout}>
          {isShowItem
            ? data.desc
            : getFieldDecorator('desc', {
                initialValue: data.desc
              })(<TextArea rows={3} placeholder="简介..." />)}
        </FormItem>
        <FormItem label="URL地址" {...formItemLayout}>
          {isShowItem
            ? data.url
            : getFieldDecorator('url', {
                initialValue: data.url,
                rules: [{ required: true, message: '请输入URL!' }]
              })(<Input placeholder="URL地址" />)}
        </FormItem>
        <FormItem label="封面图尺寸" {...formItemLayout}>
          {isShowItem
            ? data.img_size
            : getFieldDecorator('img_size', {
                initialValue: data.img_size
              })(<Input placeholder="格式 300*200" />)}
        </FormItem>
        <FormItem label="排序" {...formItemLayout}>
          {isShowItem
            ? data.sort
            : getFieldDecorator('sort', {
                initialValue: data.sort || 1,
                rules: [{ required: true, message: '请输入排序值!' }]
              })(<InputNumber min={1} max={10000} />)}
        </FormItem>
        {isShowItem ? null : (
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right'
            }}
          >
            <Button onClick={this.handleReset} style={{ marginRight: 8 }}>
              重置
            </Button>
            <Button type="primary" htmlType="submit" loading={this.props.btnState}>
              保存
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

ClassifyPanel.propTypes = {
  type: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form.create({})(ClassifyPanel);
