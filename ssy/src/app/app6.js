const http = require('http');

let responseData = '';

const options = {
  host: 'localhost',
  port: 3000
};

const request = http.request(options);

request.on('response', (response) => {
  response.on('data', (chunk) => {
    responseData += chunk;
  });

  response.on('end', () => {
    console.log(responseData);
  })
});

request.end();