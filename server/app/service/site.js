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

    if (rows.length) {
      rows.forEach(item => {
        for (let attr in item) {
          if (attr === 'telephone') {
            item[attr] = item[attr].split(',');
          }
        }
      });
      return rows[0];
    }
    return null;
  }
  async save(form) {
    const ctx = this.ctx;
    const { title = '', keywords = '', description = '', copy = '', address = '', email = '', records = '' } = form;
    const telephone = Array.isArray(form.telephone) ? form.telephone.join(',') : '';
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
        [title, keywords, description, copy, address, telephone, email, records, form.id]
      );
    } else {
      // 新增
      const user_id = ctx.session.user_id;
      rows = await this.app.mysql.query(
        `
        INSERT INTO site_config VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [uuid(), '', title, keywords, description, copy, address, telephone, email, records, null, null, user_id, '0']
      );
    }
    return rows.affectedRows;
  }
}

module.exports = SiteService;
