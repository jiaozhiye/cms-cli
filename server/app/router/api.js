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
};
