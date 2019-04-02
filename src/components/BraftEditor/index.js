import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getToken } from '@/assets/js/auth';
import BraftEditor from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import { ContentUtils } from 'braft-utils';
import { Upload, Icon } from 'antd';

import { editorUploadUrl } from '@/api';

import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import css from './index.module.less';

class Editor extends Component {
  state = {
    headers: { 'x-access-token': getToken() || '' },
    editorState: null,
    outputHTML: '<p></p>'
  };

  constructor(props) {
    super(props);
    // 表格扩展
    BraftEditor.use(
      Table({
        includeEditors: ['editor-with-table'],
        defaultColumns: 5,
        defaultRows: 3
      })
    );
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.inputHTML !== this.props.inputHTML) {
      this.setEditerHTML(nextProps.inputHTML);
    }
    return true;
  }

  componentDidMount() {
    this.setEditerHTML(this.props.inputHTML);
  }

  setEditerHTML = strHtml => {
    // 将 html 字符串转换为编辑器需要的 editorState 数据
    this.setState({ editorState: BraftEditor.createEditorState(strHtml) });
  };

  handleEditorChange = editorState => {
    const { onEditorChange } = this.props;
    const outputHTML = editorState.toHTML();
    this.setState({ editorState, outputHTML });
    onEditorChange && onEditorChange(outputHTML);
  };

  changeHandler = ({ file }) => {
    const { response } = file;
    if (response && response.code === 1) {
      this.setState({
        editorState: ContentUtils.insertMedias(this.state.editorState, [
          {
            type: 'IMAGE',
            url: response.data.url
          }
        ])
      });
    }
  };

  preview = () => {
    if (window.previewWindow) window.previewWindow.close();
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();
  };

  buildPreviewHtml() {
    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.outputHTML}</div>
        </body>
      </html>
    `;
  }

  render() {
    const { editorState, headers } = this.state;
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        className: 'fl',
        component: (
          <Upload action={editorUploadUrl} accept="image/*" headers={headers} showUploadList={false} onChange={this.changeHandler}>
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      },
      'separator',
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ];

    return <BraftEditor id="editor-with-table" {...this.props} className={css['editor-wrapper']} value={editorState} extendControls={extendControls} onChange={this.handleEditorChange} />;
  }
}

Editor.propTypes = {
  inputHTML: PropTypes.string,
  onEditorChange: PropTypes.func
};

Editor.defaultProps = {
  inputHTML: '<p></p>'
};

export default Editor;
