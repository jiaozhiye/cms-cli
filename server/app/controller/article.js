'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getList() {
    const ctx = this.ctx;
  }
}

module.exports = ArticleController;
