'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const role_name = ctx.query.role_name || '';
    const res = await this.service.role.getRole(role_name);
    ctx.body = {
      code: 1,
      data: res
    };
  }
}

module.exports = RoleController;
