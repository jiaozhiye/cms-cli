'use strict';

/**
 * 登陆验证中间件
 */
module.exports = (options, app) => {
  return async (ctx, next) => {
    if (options.blackList.some(item => ctx.path.startsWith(`/${item}`))) {
      const token = ctx.headers['x-access-token'] || (ctx.request.body && ctx.request.body.token) || ctx.query.token;
      const res = ctx.helper.verifyToken(token, options.secret);
      if (!res.name && res.message) {
        return (ctx.body = {
          code: -2, // 需要重新登录的 code
          message: res.message
        });
      }
    }
    await next();
  };
};
