'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async getRole(name) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.name,
        t1.desc,
        t1.modify_time 
      FROM
        role t1 
      WHERE t1.name LIKE ?
        AND deleted = ? 
      ORDER BY t1.sort ASC 
    `,
      [`%${name}%`, '0']
    );
    return rows;
  }
}

module.exports = RoleService;
