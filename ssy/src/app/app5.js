const http = require('http');

let responseData = '';

http.get({
  host: 'localhost',
  port: 3000
}, (response) => {
  response.on('data', (chunk) => {
    responseData += chunk;
  });

  response.on('end', () => {
    console.log(responseData);
  })
}).end();

