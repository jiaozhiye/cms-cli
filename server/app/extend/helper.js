'use strict';

const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = {
  md5(str) {
    return md5(md5(str));
  },
  signToken(payload, secret) {
    // 下发 token
    return jwt.sign(payload, secret, { expiresIn: '24h' });
  },
  verifyToken(token, secret) {
    // 验证 token
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      const message = 'TokenExpiredError' === e.name ? 'token 已过期, 请重新登录！' : 'token 验证失败, 请重新登录！';
      return { message };
    }
  },
  createMenuTree(arr) {
    let _root_ = { id: '0', children: [] };
    (function fn(target) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].pid == target.id) {
          // 递归调用
          fn(arr[i]);
          // =======
          !Array.isArray(target.children) && (target.children = []);
          target.children.push(arr[i]);
          arr.splice(i--, 1);
        }
      }
    })(_root_);
    return _root_.children;
  }
};
