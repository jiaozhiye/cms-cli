'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async getUser(username, password) {
    const ctx = this.ctx;
    // 数据库 I/O
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id, t1.role_id, t1.name, t2.name roles
      FROM 
        user t1
      LEFT JOIN 
        role t2
      ON 
        t1.role_id=t2.id
      WHERE 
        t1.username=?
      AND 
        t1.password=?
      AND 
        t1.deleted='0'
      AND 
        t2.deleted='0'
      `,
      [username, ctx.helper.md5(password)]
    );

    // console.log(rows)
    if (rows.length) {
      const [userInfo] = rows;
      // 下发 token 信息
      const token = ctx.helper.signToken({ name: userInfo.name }, this.config.auth.secret);
      // role_id 存入 session
      ctx.session.role_id = userInfo.role_id;
      return {
        id: userInfo.id,
        name: userInfo.name,
        roles: [userInfo.roles],
        token
      };
    } else {
      return false;
    }
  }
}

module.exports = LoginService;
