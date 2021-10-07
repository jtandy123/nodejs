var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  console.log('throw test');
  yield 'b'; // console.log('b');
  yield console.log('c');
}

var g = gen();
g.next();
g.next();
// g.throw();