'use strict';

const Controller = require('egg').Controller;

class DictController extends Controller {
  async getAll() {
    const ctx = this.ctx;
    const res = await this.service.dict.getData();
    ctx.body = {
      code: 1,
      data: res
    };
  }
}

module.exports = DictController;
