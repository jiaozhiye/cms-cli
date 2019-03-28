'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const params = {
      name: ctx.query.name || ''
    };
    const res = await this.service.role.getRole(params);
    ctx.body = {
      code: 1,
      data: res
    };
  }
  async getOne() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await this.service.role.getone(id);
    if (!res) {
      ctx.state.code = 0;
    } else {
      ctx.body = {
        code: 1,
        data: res
      };
    }
  }
  async addOne() {
    const ctx = this.ctx;
    const form = ctx.request.body || {};
    const res = await this.service.role.insert(form);
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
  async modOne() {
    const ctx = this.ctx;
    const form = ctx.request.body || {};
    const res = await this.service.role.update(form);
    if (!res) {
      ctx.body = {
        code: 0,
        message: '更新失败！'
      };
    } else {
      ctx.body = {
        code: 1,
        message: '更新成功！'
      };
    }
  }
  async delOne() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await this.service.role.delete(id);
    if (typeof res === 'string' && res !== '') {
      return (ctx.body = {
        code: 0,
        message: res
      });
    }
    if (!res) {
      ctx.body = {
        code: 0,
        message: '删除失败！'
      };
    } else {
      ctx.body = {
        code: 1,
        message: '删除成功！'
      };
    }
  }
}

module.exports = RoleController;
