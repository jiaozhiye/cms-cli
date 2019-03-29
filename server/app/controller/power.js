'use strict';

const Controller = require('egg').Controller;

class PowerController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const params = {
      name: ctx.query.name || ''
    };
    const res = await this.service.power.getPower(params);
    ctx.body = {
      code: 1,
      data: res
    };
  }
  async setPower() {
    const ctx = this.ctx;
    const form = ctx.request.body || {};
    const res = await this.service.power.savePower(form);
    if (!res) {
      ctx.body = {
        code: 0,
        message: '权限设置失败！'
      };
    } else {
      ctx.body = {
        code: 1,
        message: '权限设置成功！'
      };
    }
  }
  async getOne() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await this.service.power.getList(id);
    ctx.body = {
      code: 1,
      data: res
    };
  }
}

module.exports = PowerController;
