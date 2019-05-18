import React, { Component } from 'react';
import PropTypes from 'prop-types';
import addEventListener from 'add-dom-event-listener';

import PageTable from './pageTable';
import css from './editTable.module.less';

import { Input, InputNumber, Form } from 'antd';
const FormItem = Form.Item;

@Form.create({
  onValuesChange: (props, changedValues) => {
    // props.onCellValChange(changedValues);
  }
})
class EditTable extends Component {
  state = {
    prevhandle: { dataIndex: '', record: null }
  };

  componentDidMount() {
    this.documentEvent = addEventListener(document, 'click', e => {
      this.cancelPreviousHandle();
    });
  }

  componentWillUnmount() {
    this.documentEvent.remove();
  }

  getPropertyKey = (id, dataIndex) => {
    return `${id}|${dataIndex}`;
  };

  createEditableColumns = () => {
    const editableColumns = this.props.columns.map(column => {
      if (!column.editable) return column;
      const editableProps = this.getColumnEditProps(column.editType, column);
      return { ...column, ...editableProps };
    });
    return editableColumns;
  };

  cancelPreviousHandle = (dataIndex = '', record = null) => {
    const { getFieldValue } = this.props.form;
    const { prevhandle } = this.state;
    // 单击的是同一个单元格
    if (record === prevhandle.record && dataIndex === prevhandle.dataIndex) return;
    // 上一次操作的单元格存在
    if (prevhandle.record) {
      prevhandle.record[`${prevhandle.dataIndex}Editable`] = false;
      // 获取 form 表单数据
      const property = this.getPropertyKey(prevhandle.record.id, prevhandle.dataIndex);
      const newValue = getFieldValue(property);
      const preValue = prevhandle.record[prevhandle.dataIndex];
      if (preValue !== newValue) {
        prevhandle.record[prevhandle.dataIndex] = newValue;
        this.props.onCellValChange({ [`${prevhandle.record.id}|${prevhandle.dataIndex}`]: newValue });
      }
    }
    // 改变 prevhandle 状态
    this.setState({ prevhandle: { dataIndex, record } });
  };

  getColumnEditProps = (type, column) => {
    const { getFieldDecorator } = this.props.form;
    const { dataIndex, editRules = [] } = column;
    column.onCell = (record, rowIndex) => {
      return {
        onClick: event => {
          // 阻止向 document 冒泡
          event.nativeEvent.stopImmediatePropagation();
          // 设置该单元格可编辑
          record[`${dataIndex}Editable`] = true;
          // 取消上一次单元格的选中状态
          this.cancelPreviousHandle(dataIndex, record);
        }
      };
    };
    if (type === 'input') {
      column.render = (text, record) => {
        const { id } = record;
        return !record[`${dataIndex}Editable`] ? (
          <span>{text}</span>
        ) : (
          <FormItem className={css.editableCell}>
            {getFieldDecorator(this.getPropertyKey(id, dataIndex), {
              initialValue: record[dataIndex],
              rules: editRules
            })(typeof record[dataIndex] === 'string' ? <Input /> : <InputNumber />)}
          </FormItem>
        );
      };
    }
    return column;
  };

  render() {
    return <PageTable {...this.props} columns={this.createEditableColumns()} />;
  }
}

EditTable.propTypes = {
  columns: PropTypes.array.isRequired,
  onCellValChange: PropTypes.func.isRequired
};

export default EditTable;
