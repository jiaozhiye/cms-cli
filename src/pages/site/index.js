import React, { Component } from 'react';

import css from './index.module.less';

import { getSiteInfo, saveSiteInfo } from '@/api';

import { Card, Form, Input, Select, Button, Icon, message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class Site extends Component {
  state = {
    index: 0,
    keys: [0],
    form: {}
  };

  componentDidMount() {
    this.getRecords();
  }

  getRecords = async () => {
    const res = await getSiteInfo();
    if (res.code === 1) {
      this.setState({ form: res.data });
    }
  };

  saveRecords = async values => {
    const res = await saveSiteInfo(values);
    if (res.code === 1) {
      message.success(res.message);
    }
  };

  remove = k => {
    const { keys } = this.state;
    if (keys.length === 1) return;
    this.setState({ keys: keys.filter(key => key !== k) });
  };

  add = () => {
    const { keys } = this.state;
    let index = !keys.length ? 0 : keys[keys.length - 1] + 1;
    const nextKeys = keys.concat(index++);
    this.setState({ keys: nextKeys });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { form } = this.state;
        if (form.id) {
          values['id'] = form.id;
        }
        console.log(values);
        this.saveRecords(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { form, keys } = this.state;

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 20,
          offset: 4
        }
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    // == 动态表单 ==
    const formItems = keys.map((k, index) => (
      <FormItem {...(index === 0 ? formItemLayout : tailFormItemLayout)} label={index === 0 ? '联系电话' : ''} key={k}>
        {getFieldDecorator(`telephone[${k}]`)(<Input addonBefore={prefixSelector} placeholder="电话" style={{ width: '80%', marginRight: 10 }} />)}
        {keys.length > 1 ? <Icon className={css['dynamic-delete-button']} type="minus-circle-o" disabled={keys.length === 1} onClick={() => this.remove(k)} /> : null}
      </FormItem>
    ));
    // == 动态表单 END ==

    return (
      <Card title="站点信息" bordered={false} size="small">
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 600, marginTop: 10 }}>
          <FormItem label="站点名称">{getFieldDecorator('title', { initialValue: form.title })(<Input placeholder="站点名称" />)}</FormItem>
          <FormItem label="关键字">{getFieldDecorator('keywords', { initialValue: form.keywords })(<Input placeholder="关键字" />)}</FormItem>
          <FormItem label="关键字描述">{getFieldDecorator('description', { initialValue: form.description })(<TextArea rows={2} placeholder="描述" />)}</FormItem>
          <FormItem label="公司名称">{getFieldDecorator('copy', { initialValue: form.copy })(<Input placeholder="公司" />)}</FormItem>
          <FormItem label="公司地址">{getFieldDecorator('address', { initialValue: form.address })(<TextArea rows={3} placeholder="地址" />)}</FormItem>
          {formItems}
          <Form.Item {...tailFormItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: '50%' }}>
              <Icon type="plus" /> 添加电话
            </Button>
          </Form.Item>
          <FormItem label="企业邮箱">{getFieldDecorator('email', { initialValue: form.email })(<Input placeholder="邮箱" />)}</FormItem>
          <FormItem label="备案信息">{getFieldDecorator('records', { initialValue: form.records })(<TextArea rows={3} placeholder="备案信息" />)}</FormItem>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提 交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create({})(Site);
