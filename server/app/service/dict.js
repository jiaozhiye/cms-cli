'use strict';

const Service = require('egg').Service;

class DictService extends Service {
  async getData() {
    const roles = await this.app.mysql.query(`
      SELECT t1.name, t1.id AS value FROM role t1
    `);

    const menuTree = await this.service.menu.getTree();
    const menus = [{ id: '0', name: '根分类', children: menuTree }];

    const classifyTree = await this.service.classify.getList();
    const classes = [{ id: '0', name: '根分类', children: classifyTree }];

    return { roles, menus, classes };
  }
}

module.exports = DictService;
