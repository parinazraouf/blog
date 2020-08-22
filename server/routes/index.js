const Router = require('koa-router');
const compose = require('koa-compose');

const apiRouter = new Router({
  prefix: '/api'
});

const blogApi = require('./api');

blogApi(apiRouter);

// export route middleware
exports.middleware = () => compose([
  apiRouter.routes(),
  apiRouter.allowedMethods()
]);
