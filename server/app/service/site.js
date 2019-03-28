'use strict';

const uuid = require('uuid/v4');

const Service = require('egg').Service;

class SiteService extends Service {
  async getOne() {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        id,
        title,
        keywords,
        description,
        copy,
        address,
        telephone,
        email,
        records 
      FROM
        site_config 
      WHERE deleted = ? 
      LIMIT 0, 1 
    `,
      ['0']
    );

    const res = !rows.length ? null : rows[0];

    return res;
  }
  async save(form) {
    let rows;
    if (form.id) {
      // 更新
      rows = await this.app.mysql.query(
        `
        UPDATE 
          site_config 
        SET
          title = ?,
          keywords = ?,
          description = ?,
          copy = ?,
          address = ?,
          telephone = ?,
          email = ?,
          records = ? 
        WHERE id = ? 
      `,
        [form.title, form.keywords, form.description, form.copy, form.address, form.telephone, form.email, form.records, form.id]
      );
    } else {
      // 新增
      const user_id = ctx.session.user_id;
      rows = await this.app.mysql.query(
        `
        INSERT INTO site_config VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [uuid(), '', form.title, form.keywords, form.description, form.copy, form.address, form.telephone, form.email, form.records, null, null, user_id, '0']
      );
    }
    return rows.affectedRows;
  }
}

module.exports = SiteService;
