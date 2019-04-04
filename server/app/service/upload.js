'use strict';

const path = require('path');
const fs = require('mz/fs');

const Service = require('egg').Service;

class UploadService extends Service {
  async doUpload(files, dirname) {
    const { ctx } = this;
    const dirpath = path.join(__dirname, '..', `upload/${dirname}`);
    for (const file of files) {
      // 文件名
      const filename = path.basename(file.filepath);
      // 文件静态访问路径
      const file_static_path = `upload/${dirname}/${filename}`;
      try {
        // 如果目标文件夹不存在，创建之
        if (!fs.existsSync(dirpath)) {
          fs.mkdirSync(dirpath);
        }
        // 文件从 TEMP 临时文件夹移动到目标文件夹
        await fs.rename(file.filepath, path.join(dirpath, filename));
        ctx.body = {
          code: 1,
          data: {
            path: file_static_path,
            url: `http://${ctx.header.host}/${file_static_path}`
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
