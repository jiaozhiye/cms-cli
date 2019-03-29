'use strict';

const uuid = require('uuid/v4');

const Service = require('egg').Service;

class ClassifyService extends Service {
  async getList() {
    const ctx = this.ctx;
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.pid,
        t1.name,
        t1.desc,
        t1.url,
        t1.img_size,
        t1.sort,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
      FROM
        classify t1 
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
          classify t2 
        WHERE t2.id = t1.pid) AS pname,
        t1.desc,
        t1.url,
        t1.img_size,
        t1.sort 
      FROM
        classify t1 
      WHERE t1.id = ? 
        AND t1.deleted = ? 
    `,
      [id, '0']
    );
    return rows[0];
  }
  async insert(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { pid, name, desc = '', url, img_size = '', sort } = form;
    const rows = await this.app.mysql.query(
      `
      INSERT INTO classify VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), pid, name, desc, url, img_size, sort, null, null, user_id, '0']
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { pid, name, desc = '', url, img_size = '', sort, id } = form;
    const rows = await this.app.mysql.query(
      `
      UPDATE 
        classify t1
      SET
        t1.pid = ?,
        t1.name = ?,
        t1.desc = ?,
        t1.url = ?,
        t1.img_size = ?,
        t1.sort = ?,
        t1.creator = ? 
      WHERE t1.id = ?
    `,
      [pid, name, desc, url, img_size, sort, user_id, id]
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
        classify t1 
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
      UPDATE classify t1 SET t1.deleted = ? WHERE t1.id = ?
    `,
      ['1', id]
    );
    return rows.affectedRows;
  }
}

module.exports = ClassifyService;
