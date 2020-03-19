const {responseFile} = require('./util');
const express = require('express');
const app = express();
const path = require('path');

console.log(responseFile);

app.get('/test', function(req, res, next) {
  let filePath = path.join(__dirname, '/test.json');
  responseFile(filePath, res);
});

app.listen(5000);

