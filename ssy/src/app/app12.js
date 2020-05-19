const util = require('util');

const obj = {
  name: 'zhangsan',
  address: 'nanjing',
  age: 25,
  married: false,
  getAge() {
    return this.age;
  }
};

const str = util.inspect(obj, {
  colors: true
}); // 将对象转换为字符串形式

console.log(str);