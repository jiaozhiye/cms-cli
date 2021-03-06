'use strict';

/**
 * ajax api 接口路由模块
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/menu/getList', controller.menu.getList);
  router.get('/api/dict/all', controller.dict.getAll);
  router.get('/api/role/getList', controller.role.getList);
  router.get('/api/role/getOne', controller.role.getOne);
  router.post('/api/role/insert', controller.role.addOne);
  router.post('/api/role/update', controller.role.modOne);
  router.get('/api/role/delete', controller.role.delOne);
  router.get('/api/user/getList', controller.user.getList);
  router.get('/api/user/getOne', controller.user.getOne);
  router.post('/api/user/insert', controller.user.addOne);
  router.post('/api/user/update', controller.user.modOne);
  router.get('/api/user/delete', controller.user.delOne);
  router.get('/api/menu/getTree', controller.menu.getMenuTree);
  router.get('/api/menu/getOne', controller.menu.getOne);
  router.post('/api/menu/insert', controller.menu.addOne);
  router.post('/api/menu/update', controller.menu.modOne);
  router.get('/api/menu/delete', controller.menu.delOne);
  router.get('/api/site/getOne', controller.site.getOne);
  router.post('/api/site/update', controller.site.saveOne);
  router.get('/api/power/getList', controller.power.getList);
  router.post('/api/power/update', controller.power.setPower);
  router.get('/api/power/getOne', controller.power.getOne);
  router.get('/api/classify/getList', controller.classify.getList);
  router.get('/api/classify/getOne', controller.classify.getOne);
  router.post('/api/classify/insert', controller.classify.addOne);
  router.post('/api/classify/update', controller.classify.modOne);
  router.get('/api/classify/delete', controller.classify.delOne);
  router.get('/api/article/getList', controller.article.getList);
  router.get('/api/article/getOne', controller.article.getOne);
  router.post('/api/article/insert', controller.article.addOne);
  router.post('/api/article/update', controller.article.modOne);
  router.get('/api/article/delete', controller.article.delOne);
  router.post('/api/upload/articleImg', controller.upload.article);
  router.post('/api/upload/editorFile', controller.upload.editor);
};
