'use strict';

const Service = require('egg').Service;

class DictService extends Service {
  async getData() {
    const _root_ = { id: '0', name: '根分类' };

    const roles = await this.service.role.getRole({});

    const menuTree = await this.service.menu.getTree();
    const menus = [{ ..._root_, children: menuTree }];

    const classifyTree = await this.service.classify.getList();
    const classes = [{ ..._root_, children: classifyTree }];

    return { roles, menus, classes };
  }
}

module.exports = DictService;
