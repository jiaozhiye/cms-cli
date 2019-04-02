'use strict';

const path = require('path');
const fs = require('mz/fs');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async article() {
    const { ctx, config } = this;
    for (const file of ctx.request.files) {
      // console.log(file);
      const filepath = `upload/${config.uploadDir.article}/${path.basename(file.filepath)}`;
      try {
        // 文件移动
        fs.renameSync(file.filepath, path.join(__dirname, '..', filepath));
        return (ctx.body = {
          code: 1,
          data: {
            path: filepath,
            url: `http://${ctx.header.host}/${filepath}`
          }
        });
      } catch (e) {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
        ctx.state.code = 0;
        ctx.state.message = e && e.message ? e.message : e.toString();
      }
    }
  }
}

module.exports = UploadController;
