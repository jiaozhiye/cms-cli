'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getList() {
    const ctx = this.ctx;
    const params = {
      pageNum: ctx.query.pageNum,
      pageSize: ctx.query.pageSize || 10,
      cids: ctx.queries.cid || [],
      startTime: ctx.query.startTime || '',
      endTime: ctx.query.endTime || '',
      title: ctx.query.title || '',
      sort: ctx.query.sort || ''
    };
    const res = await this.service.article.getList(params);
    ctx.body = {
      code: 1,
      data: res
    };
  }
  async getOne() {
    const ctx = this.ctx;
    const id = ctx.query.id;
    const res = await this.service.article.getone(id);
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
    const res = await this.service.article.insert(form);
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
    const res = await this.service.article.update(form);
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
    const res = await this.service.article.delete(id);
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

module.exports = ArticleController;
