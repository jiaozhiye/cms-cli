module.exports = {
  // extends: 'react-app',
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    // 箭头函数样式
    'arrow-body-style': 0,
    // 强制使用jsx文件
    'react/jsx-filename-extension': 0,
    // 换行样式
    'linebreak-style': 0,
    // 数组或者对象最后一个要加逗号
    'comma-dangle': 0,
    // 箭头函数必须用括号
    'arrow-parens': 0,
    // 强制使用const
    'prefer-const': 0,
    // 使用解构
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    // 行长度限制
    'max-len': 0,
    // 没有用过的变量
    'no-unused-vars': 0,
    // 全局 require
    'global-require': 0,
    'operator-assignment': 0,
    // 解构不换行
    'object-curly-newline': 0,
    // props 必须有默认
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': 0,
    // 循环遍历对象 for in 将包含通过原型链继承的属性
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'react/jsx-one-expression-per-line': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/prefer-stateless-function': 0,
    // 注释前空格
    'spaced-comment': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    // bool 值为 true 必须省略
    'react/jsx-boolean-value': 0,
    'lines-between-class-members': 0
  },
  globals: {
    window: true,
    console: true
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']]
      }
    }
  },
  plugins: ['react']
};
