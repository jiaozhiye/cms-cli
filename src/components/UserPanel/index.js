import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserRecord } from '@/api';
import css from './index.module.less';

import { Form, Button, Input, Select, Radio, InputNumber } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;

@connect(
  state => ({
    btnState: state.app.btnLoading,
    sex: state.app.dict.sex || [],
    roles: state.app.dict.roles || []
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
    const res = await getUserRecord({ id: this.props.uid });
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
    const { type, sex, roles } = this.props;
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
        <FormItem label="登陆名" {...formItemLayout}>
          {isShowItem
            ? data.username
            : getFieldDecorator('username', {
                initialValue: data.username,
                rules: [{ required: true, message: '请输入登陆名!' }]
              })(<Input placeholder="登陆名" />)}
        </FormItem>
        <FormItem label="登陆密码" {...formItemLayout}>
          {isShowItem ? '******' : getFieldDecorator('password')(<Input placeholder="默认 123456" />)}
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {isShowItem
            ? data.name
            : getFieldDecorator('name', {
                initialValue: data.name,
                rules: [{ required: true, message: '请输入昵称!' }]
              })(<Input placeholder="昵称" />)}
        </FormItem>
        <FormItem label="所属角色" {...formItemLayout}>
          {isShowItem
            ? data.role_name
            : getFieldDecorator('role_id', {
                initialValue: data.role_id,
                rules: [{ required: true, message: '请选择角色!' }]
              })(
                <Select placeholder="选择角色">
                  {roles.map(item => (
                    <Option key={item.value} value={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {isShowItem
            ? data.sex_name
            : getFieldDecorator('sex', {
                initialValue: data.sex,
                rules: [{ required: true, message: '请选择性别!' }]
              })(
                <Radio.Group>
                  {sex.map(item => (
                    <Radio key={item.value} value={item.value}>
                      {item.name}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
        </FormItem>
        <FormItem label="手机号" {...formItemLayout}>
          {isShowItem
            ? data.phone
            : getFieldDecorator('phone', {
                initialValue: data.phone,
                rules: [{ required: true, message: '请输入手机号!' }]
              })(<Input placeholder="手机号" />)}
        </FormItem>
        <FormItem label="邮箱" {...formItemLayout}>
          {isShowItem
            ? data.email
            : getFieldDecorator('email', {
                initialValue: data.email,
                rules: [{ type: 'email', message: '邮箱格式不正确!' }]
              })(<Input placeholder="邮箱" />)}
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
