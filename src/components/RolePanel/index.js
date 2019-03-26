import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRoleById } from '@/api';
import css from './index.module.less';

import { Form, Button, Input, InputNumber } from 'antd';
const FormItem = Form.Item;

@connect(
  state => ({
    btnState: state.app.btnLoading
  }),
  dispatch => ({})
)
class DemoPanel extends Component {
  state = {};

  componentDidMount() {
    const { type } = this.props;
    if (type === 'add') return;
    this.getRecord();
  }

  getRecord = async () => {
    const res = await getRoleById({ id: this.props.uid });
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
    const { type } = this.props;
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
        <FormItem label="角色名称" {...formItemLayout}>
          {isShowItem
            ? data.name
            : getFieldDecorator('name', {
                initialValue: data.name,
                rules: [{ required: true, message: '请输入名称!' }]
              })(<Input placeholder="名称..." />)}
        </FormItem>
        <FormItem label="角色描述" {...formItemLayout}>
          {isShowItem
            ? data.desc
            : getFieldDecorator('desc', {
                initialValue: data.desc
              })(<Input placeholder="描述..." />)}
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

DemoPanel.propTypes = {
  type: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form.create({})(DemoPanel);
