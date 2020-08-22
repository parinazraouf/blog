const path = require('path');
const glob = require('glob');
const Router = require('koa-router');
const compose = require('koa-compose');

const apiRouter = new Router({
  prefix: '/api'
});

// load routers
glob.sync(path.join('api', '{**/,}*.js'), { cwd: __dirname, ignore: '**/*.test.js' }).forEach(i => require(`./${i}`)(apiRouter));

// const blogApi = require('./api');

// blogApi(apiRouter);

// export route middleware
exports.middleware = () => compose([
  apiRouter.routes(),
  apiRouter.allowedMethods()
]);
