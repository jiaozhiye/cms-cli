import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 高阶组件：是一个函数，能够接收一个组件，并返回一个新的组件，
// 通过高阶组件，可以把通用的逻辑数据或方法注入到被其装饰的基础组件中
// 用途：重用组件逻辑，对参数组件进行包装和扩展，注入一些特定的功能
const HighOrderComponent = options => {
  // 处理 options
  // ...
  return WrappedComponent => {
    class HOC extends Component {
      // displayName -> 定义调试时的组件 name
      static displayName = `HOC(${WrappedComponent.displayName || WrappedComponent.name})`;

      // 业务逻辑...
      show = () => {
        console.log('这是一个demo高阶组件');
      };

      render() {
        return <WrappedComponent {...this.props} {...options} show={this.show} />;
      }
    }

    HOC.propTypes = {};

    HOC.defaultProps = {};

    return HOC;
  };
};

export default HighOrderComponent;
