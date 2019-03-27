'use strict';

const Service = require('egg').Service;

class DictService extends Service {
  async getData() {
    const roles = await this.app.mysql.query(`
      SELECT t1.name, t1.id AS value FROM role t1
    `);

    return { roles };
  }
}

module.exports = DictService;
