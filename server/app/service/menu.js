'use strict';

const uuid = require('uuid/v4');

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
  async getone(id) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.pid,
        t1.name,
        (SELECT 
            t2.name 
        FROM
            menu t2 
        WHERE t2.id = t1.pid) AS pname,
        t1.desc,
        t1.url,
        t1.icon,
        t1.sort 
      FROM
        menu t1 
      WHERE t1.id = ? 
        AND t1.deleted = ? 
    `,
      [id, '0']
    );
    if (!rows.length) {
      return false;
    }
    return rows[0];
  }
  async insert(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { pid, name, desc = '', url, icon = '', sort } = form;
    const rows = await this.app.mysql.query(
      `
      INSERT INTO menu VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), pid, name, desc, url, icon, sort, null, null, user_id, '0']
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { pid, name, desc = '', url, icon = '', sort, id } = form;
    const rows = await this.app.mysql.query(
      `
      UPDATE 
        menu t1
      SET
        t1.pid = ?,
        t1.name = ?,
        t1.desc = ?,
        t1.url = ?,
        t1.icon = ?,
        t1.sort = ?,
        t1.creator = ? 
      WHERE t1.id = ?
    `,
      [pid, name, desc, url, icon, sort, user_id, id]
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async delete(id) {
    // 先判断该分类下是否还有子分类
    const [{ total }] = await this.app.mysql.query(
      `
      SELECT 
        COUNT(*) AS total 
      FROM
        menu t1 
      WHERE t1.pid = ? 
        AND t1.deleted = ? 
    `,
      [id, '0']
    );

    // 有子分类不允许删除
    if (total > 0) {
      return '删除该分类前，请先删除其子分类！';
    }

    const rows = await this.app.mysql.query(
      `
      UPDATE menu t1 SET t1.deleted = ? WHERE t1.id = ?
    `,
      ['1', id]
    );
    return rows.affectedRows;
  }
}

module.exports = MenuService;
