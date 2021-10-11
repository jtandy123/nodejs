const http = require('http');
const fs = require('fs');
const path = require('path');

// console.log(process.cwd());
// console.log(path.resolve('./'));
// console.log(path.join('./'));

http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, './titles.json'), (err, data) => {
      if (err) {
        console.error(err);
        res.end('Server Error');
      } else {
        const titles = JSON.parse(data.toString());
        fs.readFile(path.join(__dirname, './template.html'), (err, data) => {
          if (err) {
            console.error(err);
            res.end('Server Error');
          } else {
            const tmpl = data.toString();
            const html = tmpl.replace('%', titles.join('</li><li>'));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          }
        });
      }
    });
  }
}).listen(8000, '127.0.0.1');