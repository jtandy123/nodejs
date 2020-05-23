const http = require('http');

let responseData = '';

http.request({
  host: 'localhost',
  port: 3000,
  method: 'get',
  path: '/login?username=zhangsan&password=hello'
}, (response) => {
  response.on('data', (chunk) => {
    responseData += chunk;
  });

  response.on('end', () => {
    console.log(responseData);
  })
}).end();

