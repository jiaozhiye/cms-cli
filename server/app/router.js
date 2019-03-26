'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login/do', controller.login.doLogin);
  require('./router/api')(app);
};
