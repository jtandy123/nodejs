const Koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const koa_static = require('koa-static');

const app = new Koa();

app.use(
  koa_static(__dirname + '/source/')
);

app.use(
    mount('/', async (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
    })
);


app.listen(4000);
module.exports = app;