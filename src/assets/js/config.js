export default (function(env) {
  let envObj = {};
  if (env === 'production') {
    // 使控制台 console 输出失效
    console.log = console.warn = console.error = console.info = function() {};
    envObj.env = '当前工程环境：production';
    envObj.serverUrl = '/';
  } else if (env === 'development') {
    envObj.env = '当前工程环境：development';
    envObj.serverUrl = 'http://127.0.0.1:7001';
  }
  return envObj;
})(process.env.NODE_ENV === 'production' ? 'production' : 'development');
