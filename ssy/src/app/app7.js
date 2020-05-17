const url = require('url');

const urlString = 'http://www.example.com?orderId=12345';
const urlObject = url.parse(urlString);

console.log(urlObject);