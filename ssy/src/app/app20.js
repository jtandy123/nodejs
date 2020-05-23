const http = require('http');
const querystring = require('querystring');
const url = require('url');

const userService = require('./UserService');

const server = http.createServer((request, response) => {
  let data = '';

  request.on('data', (chunk) => {
    data += chunk;
  });

  request.on('end', () => {
    const requestUrl = request.url;
    const requestMethod = request.method;

    if (requestUrl.includes('login') && requestMethod === 'GET') {
      const requestParam = url.parse(requestUrl);
      const queryObject = querystring.parse(requestParam.query);

      const loginResult = userService.login(queryObject.username, queryObject.password); 
      if (loginResult) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`username: ${queryObject.username}, password: ${queryObject.password}`);
      } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('login error')
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
