const querystring = require('querystring');

const str = 'name=zhangsan&address=nanjing';

const obj = querystring.parse(str);

console.log(obj);
