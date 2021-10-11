function asyncFunction(callback) {
  setTimeout(callback, 200);
}

let color = 'blue';

(colour => {
  asyncFunction(() => {
    console.log('The color is', colour);
  });
})(color);

color = 'green';
