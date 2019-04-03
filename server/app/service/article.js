'use strict';

const uuid = require('uuid/v4');

const Service = require('egg').Service;

class ArticleService extends Service {
  async getList(options) {
    const ctx = this.ctx;
    // 分页
    const pagination = ctx.helper.createPagination(options.pageNum, options.pageSize);
    // 所属分离
    const cids = options.cids.length ? ` AND t1.cid IN (${ctx.helper.escape(options.cids).join(',')})` : '';
    // 日期区间
    const range_date = options.startTime && options.endTime ? ` AND (t1.modify_time > ${ctx.helper.escape(options.startTime)} AND t1.modify_time < ${ctx.helper.escape(options.endTime)})` : '';
    // 标题/拼音头
    const title = options.title ? ` AND (t1.title LIKE ${ctx.helper.escape(`%${options.title}%`)} OR t1.pinyin LIKE ${ctx.helper.escape(`%${options.title}%`)})` : '';
    // 排序
    const sort = options.sort && options.sort.includes('=') ? ` ORDER BY t1.sort ${options.sort.split('=')[1]}` : ' ORDER BY t1.sort ASC';

    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.title,
        t3.name AS claname,
        t2.content,
        t1.img_path,
        t1.sort,
        t4.name AS author,
        FROM_UNIXTIME(UNIX_TIMESTAMP(t1.modify_time), '%Y-%m-%d %H:%i:%s') AS modify_time
      FROM
        article t1, content t2, classify t3, user t4
      WHERE 
        t1.content_id=t2.id AND t1.cid=t3.id AND t1.creator=t4.id AND t1.deleted = ? ${cids} ${range_date} ${title}
      ${sort} 
      ${pagination}
    `,
      ['0']
    );

    const [{ total }] = await this.app.mysql.query(
      `
      SELECT
        COUNT(*) AS total
      FROM
        article t1
      WHERE
        t1.deleted = ? ${cids} ${range_date} ${title}
    `,
      ['0']
    );

    return {
      data: rows,
      totalRow: total
    };
  }
  async getone(id) {
    const rows = await this.app.mysql.query(
      `
      SELECT 
        t1.id,
        t1.cid,
        t1.title,
        t3.name AS cname,
        t1.desc,
        t2.content,
        t1.img_path,
        t1.video_url,
        t1.sort,
        t1.views 
      FROM
        article t1,
        content t2,
        classify t3 
      WHERE t1.content_id = t2.id 
        AND t1.cid = t3.id 
        AND t1.id = ? 
        AND t1.deleted = ?
    `,
      [id, '0']
    );
    return rows[0];
  }
  async insert(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { cid, title, desc = '', content, img_path = '', video_url = '', sort, views = 1 } = form;
    const uid = uuid();
    // 插入 content 记录
    await this.app.mysql.query(`INSERT INTO content VALUES (?, ?, ?)`, [uid, content, '0']);
    // 插入 article 记录
    const rows = await this.app.mysql.query(
      `
      INSERT INTO article VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [uuid(), cid, title, ctx.helper.createPinyin(title), desc, uid, img_path, video_url, sort, views, null, null, user_id, '0']
    );

    // console.log(rows);
    return rows.affectedRows;
  }
  async update(form) {
    const ctx = this.ctx;
    const user_id = ctx.session.user_id;
    const { id, cid, title, desc = '', content, img_path = '', video_url = '', sort, views = 1 } = form;
    // 获取 content_id
    const [{ content_id }] = await this.app.mysql.query(`SELECT t1.content_id FROM article t1 WHERE t1.id = ?`, [id]);
    // 更新 content 表
    await this.app.mysql.query(`UPDATE content t1 SET t1.content = ? WHERE t1.id = ?`, [content, content_id]);
    // 更新 article 表
    const rows = await this.app.mysql.query(
      `
      UPDATE 
        article t1
      SET 
        t1.cid = ?,
        t1.title = ?,
        t1.pinyin = ?,
        t1.desc = ?,
        t1.img_path = ?,
        t1.video_url = ?,
        t1.sort = ?,
        t1.views = ?,
        t1.creator = ?
      WHERE t1.id = ?
    `,
      [cid, title, ctx.helper.createPinyin(title), desc, img_path, video_url, sort, views, user_id, id]
    );
    // console.log(rows);
    return rows.affectedRows;
  }
  async delete(id) {
    // 获取 content_id
    const [{ content_id }] = await this.app.mysql.query(`SELECT t1.content_id FROM article t1 WHERE t1.id = ?`, [id]);
    await this.app.mysql.query(`UPDATE article t1 SET t1.deleted = ? WHERE t1.id = ?`, ['1', id]);
    const rows = await this.app.mysql.query(`UPDATE content t1 SET t1.deleted = ? WHERE t1.id = ?`, ['1', content_id]);
    return rows.affectedRows;
  }
}

module.exports = ArticleService;
