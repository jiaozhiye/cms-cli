'use strict';

const path = require('path');
const fs = require('mz/fs');

const Service = require('egg').Service;

class UploadService extends Service {
  async doUpload(files, dirname) {
    const { ctx } = this;
    for (const file of files) {
      // console.log(file);
      const filepath = `upload/${dirname}/${path.basename(file.filepath)}`;
      try {
        // 文件移动
        await fs.rename(file.filepath, path.join(__dirname, '..', filepath));
        ctx.body = {
          code: 1,
          data: {
            path: filepath,
            url: `http://${ctx.header.host}/${filepath}`
          }
        };
      } catch (e) {
        // 文件移动出错，删除临时文件
        await fs.unlink(file.filepath);
        ctx.body = {
          code: 0,
          message: e && e.message ? e.message : e.toString()
        };
      }
    }
  }
}

module.exports = UploadService;
