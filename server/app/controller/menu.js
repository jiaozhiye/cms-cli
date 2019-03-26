'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const res = await this.service.menu.getMenu();
    ctx.body = {
      code: 1,
      data: res
    };
  }
}

module.exports = MenuController;
