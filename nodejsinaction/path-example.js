const path = require('path');

console.log(__dirname);
console.log(__filename);

console.log('--------------------');

console.log(path.resolve(__dirname, 'dist'));
console.log(path.resolve(__dirname, './dist'));
console.log(path.resolve(__dirname, './dist/..'));
console.log(path.resolve(__dirname, '../dist'));
console.log(path.resolve(__dirname, '/dist'));

console.log('--------------------');

console.log(path.join(__dirname, 'dist'));
console.log(path.join(__dirname, './dist'));
console.log(path.join(__dirname, './dist/..'));
console.log(path.join(__dirname, '../dist'));
console.log(path.join(__dirname, '/dist'));