const querystring = require('querystring');

const obj = {
  name: 'zhangsan',
  address: 'nanjing'
};

console.log(querystring.stringify(obj));