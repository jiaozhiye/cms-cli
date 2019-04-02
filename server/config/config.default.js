'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = (exports = {});

  // 设置 cookie / session 的签名，用于加密
  config.keys = appInfo.name + '_1546937243528';

  // 安全配置
  config.security = {
    csrf: false, // 关闭 csrf 防范
    ignoreJSON: true
  };

  // 文件上传启用 file 模式
  config.multipart = {
    mode: 'file'
  };

  // 静态资源配置
  config.static = {
    dir: [{ prefix: '/', dir: path.join(appInfo.baseDir, 'app/public') }, { prefix: '/upload', dir: path.join(appInfo.baseDir, 'app/upload') }]
  };

  // 文件上传路径
  config.uploadDir = {
    article: 'article'
  };

  // 跨域请求白名单
  config.cors = {
    credentials: true,
    origin: 'http://localhost:8080'
  };

  // 权限验证
  config.auth = {
    secret: 'admin-token',
    blackList: ['api'] // 请求的黑名单前缀
  };

  // 配置中间件
  config.middleware = ['response', 'loginVerify'];

  // 中间件载荷
  config.loginVerify = config.auth;

  // Mysql 配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'app_cms'
    }
  };

  return config;
};
