const Koa = require('koa');
const body = require('koa-body');
const qs = require('koa-qs');

const app = exports.app = new Koa();

const PORT = 8080;
const HOST = '127.0.0.1';

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
