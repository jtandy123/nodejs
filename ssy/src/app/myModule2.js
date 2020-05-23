const myModule2 = {
  myInfo: {
    name: 'zhangsan',
    age: 20
  },
  myFunction(inputNumber) {
    return inputNumber + 5;
  }
}

// exports.myModule2 = myModule2;
module.exports = myModule2;