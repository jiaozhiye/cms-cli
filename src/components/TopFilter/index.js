import React, { Component } from 'react';
import PropTypes from 'prop-types';
import util from '@/utils';

import css from './index.module.less';

import { Form, Row, Col, Icon, Input, Button, Select, DatePicker, TreeSelect } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;

class TopFilter extends Component {
  state = {
    expand: false
  };

  createTreeSelect = arr => {
    return arr.map(item => {
      if (Array.isArray(item.children) && item.children.length) {
        return (
          <TreeNode value={item.value} title={item.name} key={item.value}>
            {this.createTreeSelect(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode value={item.value} title={item.name} key={item.value} />;
    });
  };

  INPUT = option => {
    const { getFieldDecorator } = this.props.form;
    const { label, fieldName, initialValue, style = {}, placeholder } = option;
    return (
      <FormItem label={label} key={fieldName}>
        {getFieldDecorator(fieldName, {
          initialValue: initialValue
        })(<Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ ...style }} placeholder={placeholder} />)}
      </FormItem>
    );
  };

  SELECT = option => {
    const { getFieldDecorator } = this.props.form;
    const { mode, label, fieldName, initialValue, style = {}, placeholder, list } = option;
    const isMultiple = mode === 'MULTIPLE' ? { mode: 'multiple' } : {};
    return (
      <FormItem label={label} key={fieldName}>
        {getFieldDecorator(fieldName, {
          initialValue: initialValue
        })(
          <Select {...isMultiple} placeholder={placeholder} style={{ ...style }}>
            <Option key="0" value="0">
              全部
            </Option>
            {list.map(item => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
    );
  };

  TREE_SELECT = option => {
    const { getFieldDecorator } = this.props.form;
    const { label, fieldName, initialValue, style = {}, placeholder, list } = option;
    return (
      <FormItem label={label} key={fieldName}>
        {getFieldDecorator(fieldName, {
          initialValue: initialValue
        })(
          <TreeSelect showSearch allowClear style={{ ...style }} placeholder={placeholder} treeDefaultExpandAll>
            {this.createTreeSelect(list)}
          </TreeSelect>
        )}
      </FormItem>
    );
  };

  DATE = option => {
    const { getFieldDecorator } = this.props.form;
    const { label, fieldName, initialValue, style = {}, placeholder } = option;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <FormItem label={label} key={fieldName}>
        {getFieldDecorator(fieldName, {
          initialValue: initialValue ? util.dateToMoment(initialValue) : initialValue
        })(<DatePicker placeholder={placeholder} style={{ ...style }} format={dateFormat} />)}
      </FormItem>
    );
  };

  RANGE_DATE = option => {
    const { getFieldDecorator } = this.props.form;
    const { label, fieldName, initialValue, style = {} } = option;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <FormItem label={label} key={fieldName}>
        {getFieldDecorator(fieldName, {
          initialValue: initialValue ? [util.dateToMoment(initialValue[0]), util.dateToMoment(initialValue[1])] : initialValue
        })(<RangePicker style={{ ...style }} format={dateFormat} />)}
      </FormItem>
    );
  };

  createFormItem = () => {
    return this.props.data.map(item => {
      return !this[item.type] ? null : this[item.type](item);
    });
  };

  createFormLayout = () => {
    const { expand } = this.state;
    const buttonNode = (
      <Col span={6} key="-">
        <FormItem>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={this.handleReset}>
            重置
          </Button>
          <a style={{ marginLeft: 10, fontSize: 12 }} onClick={this.toggle}>
            {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
          </a>
        </FormItem>
      </Col>
    );
    const formItems = this.createFormItem().filter(item => item !== null);
    const count = expand ? formItems.length : 3;
    const colFormItems = formItems.map((Node, i) => (
      <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
        {Node}
      </Col>
    ));
    return [...colFormItems, buttonNode];
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { data, onSearch } = this.props;
        data.forEach(item => {
          const val = values[item.fieldName];
          if (item.type === 'DATE') {
            values[item.fieldName] = this.isTure(val) ? util.dateFormat(val) : undefined;
          } else if (item.type === 'RANGE_DATE') {
            values[item.fieldName] = this.isTure(val) ? val.map(date => util.dateFormat(date)) : [];
            let field_names = item.fieldName.split('|');
            values[field_names[0]] = values[item.fieldName][0];
            values[field_names[1]] = values[item.fieldName][1];
            delete values[item.fieldName];
          } else {
            values[item.fieldName] = this.isTure(val) ? val : undefined;
          }
        });
        onSearch(values);
      }
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  isTure = val => {
    if (Array.isArray(val)) {
      return Boolean(val.length);
    }
    return Boolean(val);
  };

  render() {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row>{this.createFormLayout()}</Row>
      </Form>
    );
  }
}

TopFilter.propTypes = {
  data: PropTypes.array.isRequired,
  onSearch: PropTypes.func
};

export default Form.create({})(TopFilter);
