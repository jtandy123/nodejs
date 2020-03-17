const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');
const express = require('express');

let playerWonCount = 0;

let playerLastAction = null;
let sameCount = 0;

const app = express();

app.get('/favicon.ico', function(request, response) {
  response.status(200);
  response.send();
  // response.writeHead(200);
  // response.end();
  return;
});

app.get('/game', 
  function(request, response, next) {
    if (playerWonCount >= 3 || sameCount === 9) {
      // response.writeHead(500);
      // response.end('我再也不和你玩了！');
      response.status(500);
      response.send('我再也不和你玩了！')
      return;
    }

    next();

    if (response.playWon) {
      playerWonCount++;
    }
  },
  function(request, response, next) {
  // const parsedUrl = url.parse(request.url);
  // const query = querystring.parse(parsedUrl.query);
    const query = request.query;
    const playerAction = query.action;

    if (playerLastAction && playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;

    if (sameCount >= 3) {
      // response.writeHead(400);
      // response.end('你作弊！');
      response.status(400);
      response.send('你作弊！');
      sameCount = 9;
      return;
    }

    response.playerAction = playerAction;
    next();

}, function(request, response) {
    const playerAction = response.playerAction;
    const gameResult = game(playerAction);

    setTimeout(function() {
      // response.writeHead(200);
      response.status(200);

      if (gameResult === 0) {
        // response.end('平局！');
        response.send('平局！');
      } else if (gameResult === 1) {
        response.send('你赢了！');
        response.playWon = true;
      } else {
        response.send('你输了！');
      }
    }, 500);
});

app.get('/', function(request, response) {
  // response.writeHead(200);
  // fs.createReadStream(__dirname + '/index.html').pipe(response);
  response.send(fs.readFileSync(__dirname + '/index.html', {encoding: 'utf-8'}));
});

app.listen(3000);

/*
http.createServer(function(request, response) {
  const parsedUrl = url.parse(request.url);

  if (parsedUrl.pathname === '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }

  if (parsedUrl.pathname === '/game') {
    const query = querystring.parse(parsedUrl.query);
    const playerAction = query.action;

    if (playerWon >= 3 || sameCount === 9) {
      response.writeHead(500);
      response.end('我再也不和你玩了！');
      return;
    }

    if (playerLastAction && playerAction === playerLastAction) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    playerLastAction = playerAction;

    if (sameCount >= 3) {
      response.writeHead(400);
      response.end('你作弊！');
      sameCount = 9;
      return;
    }

    const gameResult = game(playerAction);

    response.writeHead(200);

    if (gameResult === 0) {
      response.end('平局！');
    } else if (gameResult === 1) {
      response.end('你赢了！');
      playerWon++;
    } else {
      response.end('你输了！');
    }
  }

  if (parsedUrl.pathname === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  }
}).listen(3000);
*/