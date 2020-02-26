const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(next); // [Function: bound dispatch]
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log('%s %s - %s ms', ctx.method, ctx.url, ms);
});

app.use((ctx) => {
  ctx.body = 'Hello World';
});

/*
// 生成器的中间件已不推荐使用，推荐使用async/await
app.use(function* (next) {
  console.log(next); // Object [Generator] {}
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});


app.use(function* () {
  this.body = 'Hello World';
});
*/

app.listen(3000);