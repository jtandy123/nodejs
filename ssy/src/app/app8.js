const url = require('url');

const urlObject = {
  host: 'www.example.com',
  port: 80,
  protocol: 'http',
  search: '?orderId=12345',
  query: 'orderId=123456',
  path: '/'
};

let realUrl = url.format(urlObject);

console.log(realUrl);