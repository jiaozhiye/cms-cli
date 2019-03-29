'use strict';

const uuid = require('uuid/v4');

const Service = require('egg').Service;

class PowerService extends Service {
  async getPower(options) {
    const ctx = this.ctx;
    // 角色名
    const name = options.name ? ` AND t1.name LIKE ${ctx.helper.escape(`%${options.name}%`)}` : '';

    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.name,
        t2.name AS user,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time 
      FROM
        role t1 
        LEFT JOIN user t2 
          ON t1.id = t2.role_id 
      WHERE
        t1.deleted = ? ${name}
      ORDER BY 
        t1.sort ASC 
    `,
      ['0']
    );

    const ids = [...new Set(rows.map(item => item.id))];
    const res = ids.map(id => {
      const users = [];
      const record = rows.find(item => item.id === id) || {};
      for (let i = 0; i < rows.length; i++) {
        if (id === rows[i].id) {
          users.push(rows[i].user || '');
          rows.splice(i--, 1);
        }
      }
      return {
        ...record,
        user: users
      };
    });

    // console.log(res);

    return res;
  }
  async savePower(form) {
    const ctx = this.ctx;
    const { id: role_id, keys: checkedKeys } = form;
    const user_id = ctx.session.user_id;

    // 1. 查找所有菜单的 id 数组
    const rows = await this.app.mysql.query(
      `
      SELECT t1.id FROM menu t1 WHERE t1.deleted=?
    `,
      ['0']
    );
    const menuKeys = rows.map(item => item.id);

    // 2. 删除该角色对应的所有权限记录
    await this.app.mysql.query(
      `
      DELETE FROM role_menu WHERE role_id=?
    `,
      [role_id]
    );

    // 3. 插入该角色对应的权限记录
    let sqls = [];
    let values = [];
    menuKeys.forEach(menuId => {
      // 判断该菜单是否有权限
      let access = checkedKeys.find(key => key === menuId) ? '1' : '0';
      sqls.push(`(?, ?, ?, ?, ?, ?, ?)`);
      values = values.concat([uuid(), menuId, role_id, access, user_id, null, null]);
    });
    const res = await this.app.mysql.query(
      `
      INSERT INTO role_menu VALUES ${sqls.join(',')}
    `,
      values
    );

    return res.affectedRows;
  }
  async getList(id) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.menu_id 
      FROM
        role_menu t1 
      WHERE t1.role_id = ? 
        AND t1.access = ? 
    `,
      [id, '1']
    );
    return rows;
  }
}

module.exports = PowerService;
