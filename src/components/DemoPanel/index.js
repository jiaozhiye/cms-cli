import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserRecord } from '@/api';
import css from './index.module.less';

import { Form, Button, Input, Select, Radio } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;

@connect(
  state => ({
    btnState: state.app.btnLoading,
    sex: state.app.dict.sex || [],
    rols: state.app.dict.rols || []
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
    if (res.err === 1) {
      this.setState({ data: res.info });
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
    const { type, sex, rols } = this.props;
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
        <FormItem label="帐号" {...formItemLayout}>
          {isShowItem
            ? data.username
            : getFieldDecorator('username', {
                initialValue: data.username,
                rules: [{ required: true, message: '请输入帐号!' }]
              })(<Input placeholder="帐号..." />)}
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
          {isShowItem
            ? ''
            : getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(<Input placeholder="密码..." />)}
        </FormItem>
        <FormItem label="姓名" {...formItemLayout}>
          {isShowItem
            ? data.name
            : getFieldDecorator('name', {
                initialValue: data.name,
                rules: [{ required: true, message: '请输入姓名!' }]
              })(<Input placeholder="姓名..." />)}
        </FormItem>
        <FormItem label="所属角色" {...formItemLayout}>
          {isShowItem
            ? data.role_name
            : getFieldDecorator('role_id', {
                initialValue: data.role_id,
                rules: [{ required: true, message: '请选择角色!' }]
              })(
                <Select placeholder="选择角色">
                  {rols.map(item => (
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
                initialValue: data.sex
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
                initialValue: data.phone
              })(<Input placeholder="手机号..." />)}
        </FormItem>
        <FormItem label="邮箱" {...formItemLayout}>
          {isShowItem
            ? data.email
            : getFieldDecorator('email', {
                initialValue: data.email,
                rules: [{ type: 'email', message: '邮箱格式不正确!' }]
              })(<Input placeholder="邮箱..." />)}
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
