import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '@/assets/js/auth';

import { Upload, Icon, Modal, message } from 'antd';

import css from './index.module.less';

class PanelUpload extends Component {
  state = {
    maxFileSize: 2, // 最大文件2M
    length: 1, // 上传数量
    previewVisible: false,
    previewImage: ''
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ fileList: nextProps.fileList });
  }

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  beforeUpload = file => {
    const { maxFileSize } = this.state;
    const isLtMax = file.size / 1024 / 1024 < maxFileSize;
    if (!isLtMax) {
      message.error(`文件大小超过${maxFileSize}M限制`);
    }
    return isLtMax;
  };

  handleChange = ({ fileList }) => {
    const { onUploadChange } = this.props;
    onUploadChange && onUploadChange(this.fileListFilter(fileList));
  };

  fileListFilter = fileList => {
    return fileList.map(file => {
      if (file.response) {
        if (file.response.code === 1) {
          return this.filter(file);
        }
      }
      return file;
    });
  };

  filter = file => {
    const {
      name,
      response: { data },
      thumbUrl,
      uid,
      status
    } = file;
    return { name, url: data.url, path: data.path, thumbUrl, uid, status };
  };

  render() {
    const { previewVisible, previewImage, length } = this.state;
    const { action, fileList } = this.props;
    const props = {
      action,
      fileList,
      data: {},
      headers: { 'x-access-token': getToken() || '' },
      accept: 'image/jpg,image/jpeg,image/png,image/bmp',
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      onPreview: this.handlePreview,
      listType: 'picture-card'
    };
    const uploadButton = (
      <div className={css['upload-text']}>
        <Icon type="plus" />
        <div className="text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload {...props}>{fileList.length >= length ? null : uploadButton}</Upload>
        <Modal visible={previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
          <img style={{ width: '100%' }} src={previewImage} alt="" />
        </Modal>
      </div>
    );
  }
}

PanelUpload.propTypes = {
  action: PropTypes.string.isRequired,
  fileList: PropTypes.array,
  onUploadChange: PropTypes.func
};

PanelUpload.defaultProps = {
  fileList: []
};

export default PanelUpload;
