'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async getList() {
    const ctx = this.ctx;
    // console.log(ctx.queries.sex);
    const params = {
      pageNum: ctx.query.pageNum,
      pageSize: ctx.query.pageSize || 10,
      role_id: ctx.query.role_id || '',
      name: ctx.query.name || '',
      sex: ctx.queries.sex || []
    };
    const res = await this.service.user.getUser(params);
    ctx.body = {
      code: 1,
      ...res
    };
  }
  async getOne() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await this.service.user.getone(id);
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
    const res = await this.service.user.insert(form);
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
    const res = await this.service.user.update(form);
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
    const res = await this.service.user.delete(id);
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

module.exports = UserController;
