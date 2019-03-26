'use strict';

const uuid = require('uuid/v4');
const Service = require('egg').Service;

class RoleService extends Service {
  async getRole(name) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.name,
        t1.desc,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
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
  async getRoleById(id) {
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
    const role_id = this.ctx.session.role_id;
    const rows = await this.app.mysql.query(
      `
      INSERT INTO role VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), form.name, form.desc, form.sort, null, null, role_id, '0']
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const role_id = this.ctx.session.role_id;
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
      [form.name, form.desc, form.sort, role_id, form.id]
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async delete(id) {
    console.log(id);
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
