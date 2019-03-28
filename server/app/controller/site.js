'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {
  async getOne() {
    const ctx = this.ctx;
    const res = await this.service.site.getOne();
    const data = res ? res : {};
    ctx.body = {
      code: 1,
      data
    };
  }
  async saveOne() {
    const ctx = this.ctx;
    const form = ctx.request.body || {};
    const res = await this.service.site.save(form);
    if (!res) {
      ctx.body = {
        code: 0,
        message: '保存失败！'
      };
    } else {
      ctx.body = {
        code: 1,
        message: '保存成功！'
      };
    }
  }
}

module.exports = SiteController;
