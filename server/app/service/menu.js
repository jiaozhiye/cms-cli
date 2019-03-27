'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async getMenu() {
    const ctx = this.ctx;
    const role_id = ctx.session.role_id || 1;
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.pid,
        t1.name AS title,
        t1.url AS \`key\`,
        t1.icon AS icon 
      FROM
        menu t1 
      WHERE t1.id IN 
        (SELECT 
          t2.menu_id 
        FROM
          role_menu t2 
        WHERE t2.role_id = ? 
          AND t2.access = ?) 
        AND t1.deleted = ? 
      ORDER BY t1.sort ASC 
    `,
      [role_id, '1', '0']
    );
    return ctx.helper.createMenuTree(rows);
  }
  async getTree() {
    const ctx = this.ctx;
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.pid,
        t1.name,
        t1.url,
        t1.icon,
        t1.sort,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
      FROM
        menu t1 
      WHERE t1.deleted = ? 
      ORDER BY t1.sort ASC 
    `,
      ['0']
    );
    return ctx.helper.createMenuTree(rows);
  }
}

module.exports = MenuService;
