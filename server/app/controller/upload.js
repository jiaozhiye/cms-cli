'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async article() {
    const { ctx, config } = this;
    await this.service.upload.doUpload(ctx.request.files, config.uploadDir.article);
  }
  async editor() {
    const { ctx, config } = this;
    await this.service.upload.doUpload(ctx.request.files, config.uploadDir.editor);
  }
}

module.exports = UploadController;
