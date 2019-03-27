'use strict';

const uuid = require('uuid/v4');
const Service = require('egg').Service;

class RoleService extends Service {
  async getRole(options) {
    const ctx = this.ctx;
    // 角色名
    const name = options.name ? ` AND t1.name LIKE ${ctx.helper.escape(`%${options.name}%`)}` : '';

    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.name,
        t1.desc,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
      FROM
        role t1 
      WHERE deleted = ? ${name}
      ORDER BY t1.sort ASC 
    `,
      ['0']
    );
    return rows;
  }
  async getone(id) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.name,
        t1.desc,
        t1.sort 
      FROM
        role t1 
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
    const rows = await this.app.mysql.query(
      `
      INSERT INTO role VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), form.name, form.desc, form.sort, null, null, user_id, '0']
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const rows = await this.app.mysql.query(
      `
      UPDATE 
        role t1
      SET
        t1.name = ?,
        t1.desc = ?,
        t1.sort = ?,
        t1.creator = ? 
      WHERE t1.id = ?
    `,
      [form.name, form.desc, form.sort, user_id, form.id]
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async delete(id) {
    const rows = await this.app.mysql.query(
      `
      UPDATE role t1 SET t1.deleted = ? WHERE t1.id = ?
    `,
      ['1', id]
    );
    return rows.affectedRows;
  }
}

module.exports = RoleService;
