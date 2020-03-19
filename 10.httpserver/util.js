const fs = require('fs');

exports.responseFile = (filepath, res) => {
  try {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(JSON.parse(data));
      }
    });
  } catch (e) {
    console.log(e);
    res.send(e)
  }
};