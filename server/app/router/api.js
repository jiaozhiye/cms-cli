'use strict';

/**
 * ajax api 接口路由模块
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/menu', controller.menu.getList);
  router.get('/api/role', controller.role.getList);
};
