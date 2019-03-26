'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async doLogin() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;

    const res = await this.service.login.getUser(username, password);

    if (!res) {
      ctx.body = {
        code: 0,
        message: '登录失败!'
      };
    } else {
      ctx.body = {
        code: 1,
        message: '登录成功!',
        data: res
      };
    }
  }
}

module.exports = LoginController;
