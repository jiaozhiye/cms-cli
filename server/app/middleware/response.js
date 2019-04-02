'use strict';

/**
 * 响应处理中间件
 */
module.exports = (options, app) => {
  return async (ctx, next) => {
    try {
      await next();
      // 处理响应结果
      // 如果直接写入在 body 中，则不作处理
      // 如果写在 ctx.body 为空，则使用 state 作为响应
      ctx.body = ctx.body
        ? ctx.body
        : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            message: ctx.state.message !== undefined ? ctx.state.message : 'not found',
            data: ctx.state.data !== undefined ? ctx.state.data : {}
          };
    } catch (e) {
      console.log('Catch Error: %o', e);

      // 设置状态码为 200 - 服务端错误
      ctx.status = 200;

      // 输出详细的错误信息
      ctx.body = {
        code: -1,
        message: e && e.message ? e.message : e.toString()
      };
    }
  };
};
