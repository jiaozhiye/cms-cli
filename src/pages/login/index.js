import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '@/store/actions';

import css from './index.module.less';

import { Layout, Row, Col, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

@connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })
)
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await this.props.actions.createLogin(values);
        // from -> 从哪个页面跳转来登录的
        const { from } = this.props.location.state || { from: { pathname: '/home' } };
        if (res.code === 1) {
          this.props.history.push(from.pathname);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout style={{ height: '100%' }}>
        <Row>
          <Col span={6} offset={9}>
            <h2 className={css['welcome-title']}>欢迎使用</h2>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' }]
                  })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }]
                  })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />)}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    登 录
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Form.create()(Login);
