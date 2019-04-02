import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BraftEditor from '@/components/BraftEditor';
import Upload from '@/components/Upload';
import config from '@/assets/js/config';
import { getArticleRecord, articleImgUploadUrl } from '@/api';
import css from './index.module.less';

import { Form, Button, Input, InputNumber, TreeSelect, Card } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;
const { TreeNode } = TreeSelect;

@connect(
  state => ({
    btnState: state.app.btnLoading,
    classes: state.app.dict.classes || []
  }),
  dispatch => ({})
)
class DemoPanel extends Component {
  state = {
    fileList: []
  };

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
    const res = await getArticleRecord({ id: this.props.uid });
    if (res.code === 1) {
      this.setState({ data: res.data });
      let { img_path } = res.data;
      if (img_path !== '') {
        const fileList = img_path.split(',').map((path, key) => ({
          uid: -1 * (key + 1) + '',
          name: path.slice(path.lastIndexOf('/') + 1),
          status: 'done',
          url: `${config.serverUrl}/${path}`
        }));
        this.setState({ fileList });
      }
    }
  };

  editorChangeHandler = html => {
    this.props.form.setFieldsValue({ content: html });
  };

  uploadChangeHandler = fileList => {
    // console.log(fileList);
    this.setState({ fileList });
    // 设置 form 表单字段的值
    const img_path = fileList.map(file => file.path).join(',');
    this.props.form.setFieldsValue({ img_path });
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
    const clist = classes.length && classes[0].id === '0' ? classes[0].children : classes;

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
            ? data.cname
            : getFieldDecorator('cid', {
                initialValue: data.cid,
                rules: [{ required: true, message: '请选择分类!' }]
              })(
                <TreeSelect showSearch style={{ width: 240 }} dropdownStyle={{ maxHeight: 240, overflow: 'auto' }} placeholder="请选择分类" treeDefaultExpandAll>
                  {this.createMenuTree(clist)}
                </TreeSelect>
              )}
        </FormItem>
        <FormItem label="标题" {...formItemLayout}>
          {isShowItem
            ? data.title
            : getFieldDecorator('title', {
                initialValue: data.title,
                rules: [{ required: true, message: '请输入标题!' }]
              })(<Input placeholder="标题" />)}
        </FormItem>
        <FormItem label="简介" {...formItemLayout}>
          {isShowItem ? data.desc : getFieldDecorator('desc')(<TextArea rows={3} placeholder="简介" />)}
        </FormItem>
        <FormItem label="内容" {...formItemLayout}>
          {isShowItem
            ? data.content
            : getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入正文内容!' }]
              })(<BraftEditor inputHTML={data.content} placeholder="请输入正文内容" onEditorChange={this.editorChangeHandler} />)}
        </FormItem>
        <FormItem label="封面图" {...formItemLayout} extra="图片尺寸：320*360">
          {isShowItem ? <Card style={{ width: 120 }} bodyStyle={{ padding: 0 }} cover={<img src={`${config.serverUrl}/${data.img_path}`} alt="" />} /> : getFieldDecorator('img_path')(<Upload action={articleImgUploadUrl} fileList={this.state.fileList} onUploadChange={this.uploadChangeHandler} />)}
        </FormItem>
        <FormItem label="视频地址" {...formItemLayout}>
          {isShowItem
            ? data.video_url
            : getFieldDecorator('video_url', {
                initialValue: data.video_url,
                rules: [{ type: 'url', message: '视频URL格式不正确!' }]
              })(<Input placeholder="视频地址" />)}
        </FormItem>
        <FormItem label="排序" {...formItemLayout}>
          {isShowItem
            ? data.sort
            : getFieldDecorator('sort', {
                initialValue: data.sort || 1,
                rules: [{ required: true, message: '请输入排序值!' }]
              })(<InputNumber min={1} max={10000} />)}
        </FormItem>
        <FormItem label="浏览量" {...formItemLayout}>
          {isShowItem
            ? data.views
            : getFieldDecorator('views', {
                initialValue: data.sort || 1
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
              textAlign: 'right',
              zIndex: 9
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
