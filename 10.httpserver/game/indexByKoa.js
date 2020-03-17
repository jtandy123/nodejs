const fs = require('fs');

const game = require('./game');
const Koa = require('koa');
const mount = require('koa-mount');

let playerWonCount = 0;

let playerLastAction = null;
let sameCount = 0;

const app = new Koa();

app.use(
  mount('/favicon.ico', function (ctx) {
    ctx.status = 200;
    ctx.body = '';
  })
);

const gameKoa = new Koa();

app.use(
  mount('/game', gameKoa)
);

gameKoa.use(
  async function(ctx, next) {
    if (playerWonCount >= 3) {
      ctx.status = 500;
      ctx.body = '我再也不和你玩了！';
      return;
    }

    await next();

    if (ctx.playWon) {
      playerWonCount++;
    }
  }
);

gameKoa.use(
  async function(ctx, next) {
    const query = ctx.query;
    const playerAction = query.action;

    if (!playerAction) {
      ctx.status = 400;
      return;
    }

    if (sameCount === 9) {
      ctx.status = 500;
      ctx.body = '我再也不和你玩了！';
      return;
    }

    if (playerLastAction && playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    if (sameCount >= 3) {
      ctx.status = 400;
      ctx.body = '你作弊！';
      sameCount = 9;
      return;
    }

    playerLastAction = playerAction;
    ctx.playerAction = playerAction;
    await next();
  }
);

gameKoa.use(
  async function(ctx, next) {
    const playerAction = ctx.playerAction;
    const gameResult = game(playerAction);

    await new Promise(resolve => {
      setTimeout(function() {
        ctx.status = 200;
  
        if (gameResult === 0) {
          ctx.body = '平局！';
        } else if (gameResult === 1) {
          ctx.body = '你赢了！';
          ctx.playWon = true;
        } else {
          ctx.body = '你输了！';
        }
        resolve();
      }, 500);
    });
  }
);

app.use(
  mount('/', function(ctx) {
    ctx.status = 200;
    ctx.body = fs.readFileSync(__dirname + '/index.html', {encoding: 'utf-8'});
    return;
  })
);

app.listen(3000);
