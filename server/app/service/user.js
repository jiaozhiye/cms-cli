'use strict';

const uuid = require('uuid/v4');

const Service = require('egg').Service;

class UserService extends Service {
  async getUser(options) {
    const ctx = this.ctx;
    // 分页
    const pagination = ctx.helper.createPagination(options.pageNum, options.pageSize);
    // 角色
    const role_id = options.role_id && options.role_id !== '0' ? ` AND t1.role_id = ${ctx.helper.escape(options.role_id)}` : '';
    // 用户名/拼音头
    const name = options.name ? ` AND (t1.name LIKE ${ctx.helper.escape(`%${options.name}%`)} OR t1.pinyin LIKE ${ctx.helper.escape(`%${options.name}%`)})` : '';
    // 性别
    const sex = options.sex.length ? ` AND t1.sex IN (${ctx.helper.escape(options.sex).join(',')})` : '';

    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.username,
        t1.name,
        t2.name AS role_name,
        t1.sex,
        t1.phone,
        t1.email,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
      FROM
        user t1 
        LEFT JOIN role t2 
          ON t1.role_id = t2.id 
      WHERE
        t1.deleted = ? ${role_id} ${name} ${sex}
      ${pagination}
    `,
      ['0']
    );

    const rows2 = await this.app.mysql.query(`SELECT COUNT(*) AS total FROM user`);

    return {
      data: rows,
      totalRow: rows2[0].total
    };
  }
  async getone(id) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.username,
        t1.name,
        t1.role_id,
        t2.name AS role_name,
        t1.sex,
        IF(t1.sex = '0', '男', '女') AS sex_name,
        t1.phone,
        t1.email,
        t1.sort
      FROM
        user t1 
        LEFT JOIN role t2 
          ON t1.role_id = t2.id 
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
    const rows = await this.app.mysql.query(
      `
      INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), form.username, ctx.helper.md5(form.password), form.name, ctx.helper.createPinyin(form.name), form.sex, form.phone, form.email, form.sort, form.role_id, null, null, '0']
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const ctx = this.ctx;
    const rows = await this.app.mysql.query(
      `
      UPDATE 
        user t1
      SET
        t1.username = ?,
        t1.password = ?,
        t1.name = ?,
        t1.pinyin = ?,
        t1.sex = ?,
        t1.phone = ?,
        t1.email = ?,
        t1.sort = ?,
        t1.role_id = ? 
      WHERE t1.id = ?
    `,
      [form.username, ctx.helper.md5(form.password), form.name, ctx.helper.createPinyin(form.name), form.sex, form.phone, form.email, form.sort, form.role_id, form.id]
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async delete(id) {
    const rows = await this.app.mysql.query(
      `
      UPDATE user t1 SET t1.deleted = ? WHERE t1.id = ?
    `,
      ['1', id]
    );
    return rows.affectedRows;
  }
}

module.exports = UserService;